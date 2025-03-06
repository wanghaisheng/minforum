import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Pageview } from 'components/api/model';
import { asyncForEach, withAuth } from 'components/api/utils';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      r.table('pageviews')
        .group(req.query.slug)
        .count()
        .ungroup()
        .orderBy(r.desc('reduction'))
        .limit(10)
        .then(async (data: any) => {
          let pageviews = [];
          // data = data.filter((item: any) => item.group !== null);

          asyncForEach(data, async (item: any) => {
            if (req.query.slug === 'city') {
              let country = await Pageview.filter({ city: item.group });
              country = country[0].country;
              item.country = country;
            }
            item.country = item.country || 'Unknown';
            item.city = item.city || 'Unknown';

            pageviews.push(item);
          }).finally(() => {
            res
              .status(200)
              .json({ success: true, data: pageviews, count: data.length });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default index;

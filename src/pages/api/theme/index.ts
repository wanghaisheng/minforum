import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Theme, Discussion } from 'components/api/model';
import { asyncForEach, withAuth } from 'components/api/utils';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let offset = 0;
      let { page, limit }: any = req.query;
      page = Number(page);
      limit = Number(limit);

      if (page > 1) {
        offset = limit * page;
        offset = offset - limit;
      }

      await Theme.orderBy(r.asc('createdAt'))
        .then(async (data: any) => {
          let Theme: any = [];
          await asyncForEach(data, async (item: any) => {
            await Discussion.orderBy(r.asc('createdAt'))
              .filter({ ThemeId: item.slug })
              .then((m: any) => {
                item = {
                  ...item,
                  discussion: m.length
                };
                Theme.push(item);
              });
          }).finally(() => {
            res
              .status(200)
              .json({ success: true, data: Theme, count: Theme.length });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default index;

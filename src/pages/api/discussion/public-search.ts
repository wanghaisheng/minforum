import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Discussion, Category } from 'components/api/model';
import { asyncForEach, withAuth } from 'components/api/utils';
import { discussionProp } from 'interfaces/discussion';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let { search } = req.query;

      await Discussion.orderBy(r.desc('createdAt'))
        .filter((profile: any) =>
          profile('status')
            .ne('banned')
            .and(
              profile('title')
                .match('(?i)' + search)
                .or(profile('content').match('(?i)' + search))
            )
        )
        .getJoin()
        .then(async (data: any) => {
          let discussions = [];

          asyncForEach(data, async (item: discussionProp) => {
            let category = await Category.filter({ slug: item.categoryId });
            item.category = category[0];
            discussions.push(item);
          }).finally(() => {
            res
              .status(200)
              .json({ success: true, data: discussions, count: data.length });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default search;

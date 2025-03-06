import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Discussion, Comment, Category } from 'components/api/model';
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

      await Discussion.orderBy(r.desc('timestamp'))
        .getJoin()
        .skip(offset)
        .limit(limit)
        .then(async (data: any) => {
          let total = await r.table('discussions').count();

          let discussions: any = [];
          await asyncForEach(data, async (item: any) => {
            await Comment.filter({ discussionId: item.id }).then(
              async (comment: any) => {
                await Category.filter({ slug: item.categoryId }).then(
                  (category: any) => {
                    item = {
                      ...item,
                      comment: comment.length,
                      category: category[0]
                    };
                    discussions.push(item);
                  }
                );
              }
            );
          }).finally(() => {
            res
              .status(200)
              .json({ success: true, data: discussions, count: total });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default index;

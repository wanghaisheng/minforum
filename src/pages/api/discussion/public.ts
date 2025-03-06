import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Discussion, Comment, Category, User } from 'components/api/model';
import { asyncForEach, withAuth, makeUnique } from 'components/api/utils';

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

      let posts = [];
      const pinnedPosts = await Discussion.orderBy(r.asc('timestamp'))
        .filter((post: any) =>
          post('status').ne('banned').and(post('isPinned').eq(true))
        )
        .getJoin();

      await asyncForEach(pinnedPosts, async (item) => {
        await Comment.filter({ discussionId: item.id }).then(
          async (comment: any) => {
            await Category.filter({ slug: item.categoryId }).then(
              (category: any) => {
                item = {
                  ...item,
                  comment: comment.length,
                  category: category[0]
                };

                posts.push(item);
              }
            );
          }
        );
      });

      await Discussion.orderBy(r.desc('timestamp'))
        .filter((post: any) =>
          post('isPinned').eq(false).and(post('isPinned').eq(false))
        )
        .getJoin()
        .skip(offset)
        .limit(limit)
        .then(async (data: any) => {
          let total = await r
            .table('discussions')
            .filter((post: any) =>
              post('status').ne('banned').and(post('isPinned').eq(false))
            )
            .count();

          let discussions: any = [];
          await asyncForEach(data, async (item: any) => {
            let user = await User.get(item.userId);
            user.password = undefined;

            await Comment.filter({ discussionId: item.id })
              .getJoin()
              .then(async (comment: any) => {
                await Category.filter({ slug: item.categoryId }).then(
                  (category: any) => {
                    comment = comment.length ? comment : [];

                    comment = comment
                      .map((item: any) => item.author)
                      .map((item: any) => ({
                        name: item.name,
                        username: item.username,
                        photo: item.photo,
                        role: item.role,
                        id: item.id
                      }));

                    let activeUsers = [...[user], ...comment];
                    activeUsers = makeUnique(activeUsers, 'id');

                    item = {
                      ...item,
                      activeUsers: activeUsers,
                      comment: comment.length,
                      category: category[0]
                    };

                    discussions.push(item);
                  }
                );
              });
          }).finally(() => {
            const data = page === 1 ? [...posts, ...discussions] : discussions;
            res.status(200).json({
              success: true,
              data: data,
              count: total
            });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default index;

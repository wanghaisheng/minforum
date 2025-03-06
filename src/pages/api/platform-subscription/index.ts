import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, PlatformSubscription, User } from 'components/api/model';
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

      let total = await r.table('platform-subscriptions').count();
      await PlatformSubscription.orderBy(r.asc('createdAt'))
        .then(async (data: any) => {
          let subscriptions: any = [];
          await asyncForEach(data, async (item: any) => {
            let user = await User.get(item.userId);
            let { name, email } = user;
            item.user = { email, name };
            subscriptions.push(item);
          }).finally(() => {
            res.status(200).json({
              success: true,
              data: subscriptions,
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

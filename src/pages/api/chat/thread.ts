import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Chat } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const getThreads = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let offset = 0;
      let { page, limit, channel, userId }: any = req.query;
      page = page ? Number(page) : 1;
      limit = limit ? Number(limit) : 20;

      if (page > 1) {
        offset = limit * page;
        offset = offset - limit;
      }

      let count = await Chat.filter({ channel });

      Chat.orderBy(r.desc('createdAt'))
        .filter({ channel })
        .skip(offset)
        .limit(limit)
        .then(async (data: any) => {
          await Chat.filter((chat: any) =>
            chat('channel')
              .match(channel)
              .and(chat('receiver').match(userId))
              .and(chat('read').eq(false))
          ).update({ read: true });
          res.send({ success: true, data, total: count.length });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default getThreads;

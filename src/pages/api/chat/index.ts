import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Chat, User } from 'components/api/model';
import { asyncForEach, withAuth } from 'components/api/utils';

const getChats = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let offset = 0;
      let { page, limit, userId }: any = req.query;
      page = page ? Number(page) : 1;
      limit = limit ? Number(limit) : 50;

      if (page > 1) {
        offset = limit * page;
        offset = offset - limit;
      }

      let count = await Chat.filter((chat: any) =>
        chat('sender').match(userId).or(chat('receiver').match(userId))
      )
        .group('channel')
        .distinct();

      await Chat.filter((chat: any) =>
        chat('sender').match(userId).or(chat('receiver').match(userId))
      )
        .group('channel')
        .distinct()
        .skip(offset)
        .limit(limit)
        .then((data: any) => {
          let messages = [];
          asyncForEach(data, async (item: any) => {
            if (item.reduction.length) {
              let channel = item.reduction[0].channel;

              item = await Chat.orderBy(r.desc('timestamp'))
                .filter({
                  channel: item.reduction[0].channel,
                  deleted: false
                })
                .limit(1);
              item = item[0];

              let profile =
                item.receiver !== userId ? item.receiver : item.sender;
              profile = profile ? await User.get(profile) : {};

              let read = await Chat.filter((chat: any) =>
                chat('channel')
                  .match(channel)
                  .and(chat('sender').match(userId))
                  .and(chat('read').eq(false))
                  .or(
                    chat('channel')
                      .match(channel)
                      .and(chat('receiver').match(userId))
                      .and(chat('read').eq(false))
                  )
              );

              messages.push({
                ...item,
                read: item.receiver === userId ? read.length : 0,
                profile: {
                  id: profile?.id,
                  name: profile?.name,
                  username: profile?.username,
                  photo: profile?.photo
                }
              });
            }
          }).finally(() => {
            messages = messages
              .filter((item) => item.receiver !== undefined)
              .sort((a, b) => b.timestamp - a.timestamp);
            res.json({ success: true, data: messages, total: count.length });
          });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default getChats;

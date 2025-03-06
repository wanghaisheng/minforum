import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Chat, User } from 'components/api/model';
import { withAuth, slug } from 'components/api/utils';

const newChat = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const { sender, receiver } = req.body;

      let channel = await Chat.filter((chat) =>
        chat('sender')
          .match(sender)
          .and(chat('receiver').match(receiver))
          .or(
            chat('sender').match(receiver).and(chat('receiver').match(sender))
          )
      );

      if (channel.length === 0) {
        req.body.channel = slug();
      } else {
        channel = channel[0];
        req.body.channel = channel.channel;
      }

      req.body.timestamp = Date.now();

      let chat = new Chat(req.body);
      await chat
        .save()
        .then(async (data) => {
          if (data.id) {
            let profile = await User.get(receiver);
            profile.password = undefined;
            profile.pin = undefined;

            data.profile = profile;

            let user = await User.get(data.sender);
            const message = {
              to: profile?.notifyId,
              sound: 'default',
              title: 'RUS',
              body: `You have a new message from ${user.name}`,
              data: {
                url: 'Chat',
                meta: {
                  id: data.id,
                  action: data.channel,
                  channel: data.channel,
                  type: 'message',
                  route: 'Chat',
                  profile
                }
              }
            };

            res.send({ success: true, data });
          } else {
            res.send({
              success: false,
              message: 'Failed. Please try again later.'
            });
          }
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default newChat;

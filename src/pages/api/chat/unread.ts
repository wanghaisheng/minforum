import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Chat } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const updateChat = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let { userId } = req.query;
      let count = await Chat.filter((chat: any) =>
        chat('receiver').match(userId).and(chat('read').eq(false))
      )
        .group('channel')
        .distinct()
        .catch((err: any) => signale.fatal(err));

      res.json({ success: true, total: count.length });
    } else {
      res.send(auth);
    }
  });
};

export default updateChat;

import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Chat } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const updateChat = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      if (
        (req.body.createdAt && req.body.updatedAt) ||
        req.body.createdAt ||
        req.body.updatedAt
      ) {
        delete req.body.createdAt;
        delete req.body.updatedAt;
      }

      await Chat.get(req.body.id)
        .update(req.body)
        .then(() => {
          res.status(200).json({ success: true, data: 'Updated' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default updateChat;

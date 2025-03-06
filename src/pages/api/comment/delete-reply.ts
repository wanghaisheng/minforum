import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Reply } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const deleteReply = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let reply = await Reply.get(req.body.id);
      await Reply.get(req.body.id)
        .delete()
        .then(() => {
          res.status(200).json({ success: true, data: reply.slug });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default deleteReply;

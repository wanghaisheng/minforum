import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment, Reply } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Comment.get(req.body.id)
        .delete()
        .then(async () => {
          await Reply.filter({ replyId: req.body.id }).delete();
          res.status(200).json({ success: true, data: 'Updated' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default deleteComment;

import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  r,
  Discussion,
  Notification,
  User,
  Settings,
  Comment
} from 'components/api/model';
import { withAuth } from 'components/api/utils';

const getSettings = async () => {
  return await Settings.orderBy(r.asc('createdAt'))
    .then((config: any) => {
      config = config[0];
      return config;
    })
    .catch((err: any) => signale.fatal(err));
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Discussion.get(req.body.id)
        .update(req.body)
        .then(async () => {
          if (req.body.bestAnswer) {
            let config = await getSettings();
            let comment = await Comment.get(req.body.bestAnswer);
            let user = await User.get(comment.userId);

            let awarded = await Discussion.filter({
              bestAnswer: req.body.bestAnswer,
              lastAwarded: user.id
            });

            if (awarded.length === 0) {
              let point = Number(user.point) + Number(config.point?.bestAnswer);
              await Discussion.get(req.body.id).update({
                lastAwarded: user.id
              });
              await User.get(comment.userId).update({ point });
            }
          }

          if (req.body.status === 'banned') {
            //Send notifications

            await Discussion.get(req.body.id)
              .getJoin()
              .then(async (data: any) => {
                const notify = new Notification({
                  type: 'post',
                  sender: 'admin',
                  filterType: 'post-violation',
                  receiver: data.userId,
                  message: `Your post has been banned by a moderator due to a privacy violation.`,
                  tag: data.title,
                  action: `${data.slug}`
                });
                await notify.save().then(() => {});
              });
          }

          res.status(200).json({ success: true, data: 'Updated' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default update;

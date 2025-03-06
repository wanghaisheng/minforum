import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  r,
  Reply,
  Settings,
  User,
  Discussion,
  Notification
} from 'components/api/model';
import { withAuth, asyncForEach, slug } from 'components/api/utils';
import { settingsProp } from 'interfaces/settings';

const getSettings = async () => {
  return await Settings.orderBy(r.asc('createdAt'))
    .then((config: any) => {
      config = config[0];
      return config;
    })
    .catch((err: any) => signale.fatal(err));
};

const notifyMentionedUser = (discussion, userId, postId) => {
  const usernameRegex = /@(\w+)/g;

  const matches = discussion.match(usernameRegex);
  if (matches) {
    asyncForEach(matches, async (item) => {
      let username = item.replace('@', '');
      let user = await User.filter({ username });
      user = user[0] || {};
      if (user.id !== userId) {
        new Notification({
          receiver: user.id,
          filterType: 'mentioned',
          type: 'post',
          sender: userId,
          message: 'mentioned you in their reply',
          action: postId,
          read: false
        }).save();
      }
    });
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      req.body.slug = slug();
      let comment = new Reply(req.body);
      await comment
        .save()
        .then(async (data: any) => {
          if (data.id) {
            let config: settingsProp = await getSettings();
            await User.get(data.userId).then(async (p: any) => {
              await User.get(data.userId)
                .update({
                  point: Number(p.point + config.point?.comment)
                })
                .then(async () => {
                  await Discussion.get(req.body.discussionId)
                    .getJoin()
                    .then(async (d: any) => {
                      notifyMentionedUser(
                        d.content,
                        data.userId,
                        `${d.slug}#${data.slug}`
                      );
                      if (d.userId !== data.userId) {
                        const notify = new Notification({
                          sender: data.userId,
                          receiver: d.userId,
                          name: p.name,
                          filterType: 'reply-comment',
                          action: `${d.slug}#${data.slug}`
                        });
                        await notify.save().then(() => {});
                      }
                    });
                  res.send({ success: true, data });
                });
            });
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

export default create;

import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Block, User } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const blockAction = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const body = { ...req.body };
      let { profileId, userId }: any = body;

      await Block.filter((block) =>
        block('userId').match(userId).and(block('profileId').match(profileId))
      )
        .then(async (status: any) => {
          if (status.length) {
            await Block.filter(body)
              .delete()
              .then(async () => {
                let blocked = await Block.filter((block) =>
                  block('userId')
                    .match(userId)
                    .and(block('profileId').match(profileId))
                );

                let blockedYou = await Block.filter((block) =>
                  block('profileId')
                    .match(userId)
                    .and(block('userId').match(profileId))
                );

                res.send({
                  success: true,
                  data: {
                    blocked: blocked.length > 0,
                    blockedYou: blockedYou.length > 0
                  }
                });
              });
          } else {
            let block = new Block(body);
            await block.save().then(async (data: any) => {
              if (data.id) {
                let blocked = await Block.filter((block) =>
                  block('userId')
                    .match(userId)
                    .and(block('profileId').match(profileId))
                );

                let blockedYou = await Block.filter((block) =>
                  block('profileId')
                    .match(userId)
                    .and(block('userId').match(profileId))
                );

                res.send({
                  success: true,
                  data: {
                    blocked: blocked.length > 0,
                    blockedYou: blockedYou.length > 0
                  }
                });
              } else {
                res.send({
                  success: false,
                  message: 'Failed. Please try again later.'
                });
              }
            });
          }
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default blockAction;

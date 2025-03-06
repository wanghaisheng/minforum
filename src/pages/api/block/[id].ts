import type { NextApiRequest, NextApiResponse } from 'next';
import { Block } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const blocked = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let { profileId, id }: any = req.query;
      let blocked = await Block.filter((block) =>
        block('userId').match(id).and(block('profileId').match(profileId))
      );

      let blockedYou = await Block.filter((block) =>
        block('profileId').match(id).and(block('userId').match(profileId))
      );

      res.send({
        success: true,
        data: { blocked: blocked.length > 0, blockedYou: blockedYou.length > 0 }
      });
    } else {
      res.send(auth);
    }
  });
};

export default blocked;

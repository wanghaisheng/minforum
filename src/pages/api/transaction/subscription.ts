import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Transaction, PlatformSubscription } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const subscription = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const { referenceId, amount, userId, narration, provider } = req.body;

      let transaction = new Transaction({
        referenceId,
        amount,
        userId,
        narration,
        provider,
        type: 'subscription',
        status: 'success'
      });
      await transaction
        .save()
        .then(async (data: any) => {
          if (data.id) {
            let subscription = new PlatformSubscription({
              amount,
              userId,
              active: true,
              updatedAt: r.now()
            });

            await subscription.save();

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

export default subscription;

import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Transaction, UserSubscription } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const {
        referenceId,
        beneficiary,
        amount,
        userId,
        plan,
        narration,
        provider
      } = req.body;

      let transaction = new Transaction({
        referenceId,
        beneficiary,
        amount,
        userId,
        narration,
        provider,
        type: 'user-subscription',
        status: 'success'
      });
      await transaction
        .save()
        .then(async (data: any) => {
          if (data.id) {
            let subscription = new UserSubscription({
              plan,
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

export default user;

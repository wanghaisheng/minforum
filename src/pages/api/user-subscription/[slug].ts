import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserSubscription } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const subscription = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    const { slug, userId } = req.query;
    if (auth.success) {
      await UserSubscription.filter({
        plan: slug,
        userId: userId,
        active: true
      })
        .then(async (data: any) => {
          data = data.length ? data[0] : {};
          data.id
            ? res.status(200).json({ success: true, data })
            : res
                .status(200)
                .json({ success: false, message: 'Subscription not found' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default subscription;

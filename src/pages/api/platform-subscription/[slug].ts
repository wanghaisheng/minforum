import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PlatformSubscription } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const Subscription = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await PlatformSubscription.filter({ slug: req.query.slug })
        .then(async (data: any) => {
          data = data.length === 1 ? data[0] : {};
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

export default Subscription;

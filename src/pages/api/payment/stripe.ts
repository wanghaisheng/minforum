import signale from 'signale';
import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Settings } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const { amount } = req.body;

      let settings = await Settings.orderBy('desc');
      settings = settings[0];

      const stripe = new Stripe(
        'sk_test_51MiZOKCq2U8KGNxTeLH7hY5yMMnot8PWsErMEmtmzSmNc94VfOFzok4uPaOBPNGiHsTNMTjoVSM9LMl1R5Y2xL9900HsKiGvJM'
      );

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd'
      });

      console.log(paymentIntent);

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } else {
      res.send(auth);
    }
  });
};

export default create;

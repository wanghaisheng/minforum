import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Theme } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      //Check if there is active theme
      const active = await Theme.filter({ active: true });

      //Disabled all themes
      req.body.active === true && (await Theme.update({ active: false }));

      //Only update this status to a
      await Theme.get(req.body.id)
        .update(req.body)
        .then(() => {
          res.status(200).json({ success: true, data: 'Updated' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default update;

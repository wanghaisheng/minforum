import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Extension } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const extension = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Extension.filter({ slug: req.query.slug })
        .then(async (data: any) => {
          data = data.length === 1 ? data[0] : {};
          data.id
            ? res.status(200).json({ success: true, data })
            : res
                .status(200)
                .json({ success: false, message: 'Extension not found' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default extension;

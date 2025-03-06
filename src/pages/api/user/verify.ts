import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'components/api/model';
import { withAuth, code, enc } from 'components/api/utils';
import { verifyTemplate } from 'components/api/mail-template';

const verify = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await User.filter({ email: req.body.email })
        .then(async (data: any) => {
          if (data.length === 1) {
            data = data[0];
            const _code = code();
            let token = JSON.stringify({
              id: data.id,
              code: _code
            });
            token = enc(token);

            await verifyTemplate(data.email, data.name, _code);
            res.send({ success: true, token: token });
          } else {
            res.send({
              success: false,
              message: 'Email does not exists in our record.'
            });
          }
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default verify;

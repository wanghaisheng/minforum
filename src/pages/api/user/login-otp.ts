import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'components/api/model';
import { withAuth, validateEmail, enc, code } from 'components/api/utils';
import bcrypt from 'bcryptjs';
import { verifyTemplate } from 'components/api/mail-template';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      if (req.body.email) {
        req.body.email = req?.body?.email?.toLowerCase();
      }

      let access = validateEmail(req.body.email)
        ? { email: req.body.email }
        : { username: req.body.email };
      await User.filter(access)
        .then(async (data: any) => {
          data = data.length ? data[0] : { password: '' };
          const match = bcrypt.compareSync(req.body.password, data.password);

          if (match) {
            delete data.password;

            const _code = code();
            let token = JSON.stringify({
              id: data.id,
              code: _code
            });
            token = enc(token);

            data.status === 'active' &&
              (await verifyTemplate(data.email, data.name, _code));

            data.status === 'suspended'
              ? res.send({
                  success: false,
                  status: 'suspended',
                  message:
                    'Account is suspended. Please contact the community admin.'
                })
              : data.status === 'banned'
                ? res.send({
                    success: false,
                    status: 'banned',
                    message:
                      'Account is banned. Please contact the community admin.'
                  })
                : data.status === 'pending'
                  ? res.send({
                      success: false,
                      status: 'inactive',
                      message: 'Account is inactive. Please verify account.'
                    })
                  : res.send({ success: true, token: token });
          } else {
            res.send({
              success: false,
              message: 'Incorrect email/username or password!'
            });
          }
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default login;

import signale from 'signale';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'components/api/model';
import { withAuth, code, guid, enc } from 'components/api/utils';
import { signupTemplate } from 'components/api/mail-template';
import dayjs from 'dayjs';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      req.body.email = req?.body?.email?.toLowerCase();

      await User.filter({ email: req.body.email }).then(async (email: any) => {
        if (email.length === 0) {
          const salt = bcrypt.genSaltSync(10);

          const password = bcrypt.hashSync(req.body.password, salt);
          req.body.password = password;
          req.body.id = guid();
          req.body.timestamp = dayjs().valueOf();

          let user = new User(req.body);
          await user
            .save()
            .then(async (data: any) => {
              if (data.id) {
                const _code = code();
                let token = JSON.stringify({
                  id: data.id,
                  code: _code
                });
                token = enc(token);

                console.log(_code);

                await signupTemplate(data.email, data.name, _code);
                res.send({ success: true, token: token });
              } else {
                res.send({
                  success: false,
                  message: 'Failed. Please try again later.'
                });
              }
            })
            .catch((err: any) => signale.fatal(err));
        } else {
          res.send({
            success: false,
            message:
              'Email already exist! Please try password reset or verify your account.'
          });
        }
      });
    } else {
      res.send(auth);
    }
  });
};

export default create;

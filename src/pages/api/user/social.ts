import signale from 'signale';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'components/api/model';
import { withAuth, code, guid } from 'components/api/utils';
import { socialTemplate } from 'components/api/mail-template';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  /*
    #swagger.tags = ["users"]
    #swagger.description = 'New user'
     #swagger.security = [{
               "apikey": []
        }]
        #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                      $name: "string",
                      $email: "string",
                      $platform: "string",
                }
          }
  */

  const { name, email } = req.body;

  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      if (req.body.email) {
        req.body.email = req?.body?.email?.toLowerCase();
      }

      await User.filter({ email: email }).then(async (user: any) => {
        if (user.length === 0) {
          let username =
            name.toLowerCase().replace(/\s/, '') +
            Math.floor(Math.random() * 100) +
            1;
          req.body.id = guid();
          req.body.username = username;
          req.body.role = 'member';

          res.send({ success: true, data: req.body });

          let user = new User(req.body);
          await user
            .save()
            .then(async (data: any) => {
              if (data.id) {
                await socialTemplate(data.email, data.name);
                data.password = undefined;
                data.status = 'new';

                res.send({ success: true, data });
              } else {
                res.send({
                  success: false,
                  message: 'Error.'
                });
              }
            })
            .catch((err: any) => signale.fatal(err));
        } else {
          user = user[0];
          user.password = undefined;

          res.send({
            success: true,
            data: user
          });
        }
      });
    } else {
      res.send(auth);
    }
  });
};

export default create;

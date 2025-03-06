import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Settings } from 'components/api/model';
import { withAuth, slug, enc } from 'components/api/utils';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      let settings = req.body;
      let variables: any = settings.extensionVariables || [];
      let emailSettings = settings.email;
      let social = settings.socialAccount;

      let { email, password, host } = emailSettings;
      emailSettings.password = enc(password);
      emailSettings.host = enc(host);
      emailSettings.email = enc(email);

      settings.email = emailSettings;
      settings.cloudflarePublicKey = enc(settings.cloudflarePublicKey);
      settings.cloudflareSecretKey = enc(settings.cloudflareSecretKey);

      if (variables.length) {
        variables.forEach((variable: any) => {
          variable.value = enc(variable.value);
        });
        settings.extensionVariables = variables;
      }

      if (social) {
        social.facebook = enc(social.facebook);
        social.github = enc(social.github);
        social.google = enc(social.google);
        settings.socialAccount = social;
      }

      settings.slug = slug();
      settings.language = settings.language || 'en';

      let _settings = new Settings(settings);
      await _settings
        .save()
        .then((data: any) => {
          if (data.id) {
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

export default create;

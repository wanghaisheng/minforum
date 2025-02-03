import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Settings } from 'components/api/model';
import { withAuth, enc } from 'components/api/utils';
import { settingsProp } from 'interfaces/settings';

const getSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Settings.orderBy(r.asc('createdAt'))
        .then((data: any) => {
          let settings: settingsProp = data.length ? data[0] : {};
          let variables: any = settings.extensionVariables || [];
          let emailSettings = settings?.email;
          let social = settings?.socialAccount || {};

          social.facebook = social?.facebook ? enc(social?.facebook) : '';
          social.github = social?.github ? enc(social?.github) : '';
          social.google = social?.google ? enc(social?.google) : '';

          if (
            emailSettings.email &&
            emailSettings.email &&
            emailSettings.password
          ) {
            const { email, password, host } = emailSettings;
            emailSettings.password = enc(password);
            emailSettings.host = enc(host);
            emailSettings.email = enc(email);
            settings.email = emailSettings;
          }

          settings.cloudflarePublicKey = enc(settings.cloudflarePublicKey);
          settings.cloudflareSecretKey = enc(settings.cloudflareSecretKey);

          variables?.forEach((variable: any) => {
            variable.value = enc(variable?.value);
          });

          settings.extensionVariables = variables;
          settings.socialAccount = social;

          res.status(200).json({ success: true, data: settings });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default getSettings;

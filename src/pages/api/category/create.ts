import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Category } from 'components/api/model';
import { withAuth } from 'components/api/utils';
import slugify from 'slugify';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      req.body.slug = slugify(req.body.title, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()?_&%^'"!:@#]/g, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: 'vi' // language code of the locale to use
      });

      let category = new Category(req.body);
      await category
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

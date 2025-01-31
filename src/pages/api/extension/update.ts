import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Extension } from 'components/api/model';
import { withAuth } from 'components/api/utils';
import fs from 'fs';

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Extension.get(req.body.id)
        .update(req.body)
        .then(async () => {
          let extension = await Extension.get(req.body.id);
          let pathname = `./src/extensions/registry.json`;

          let registry: any = await fs.promises.readFile(pathname, 'utf8');
          registry = JSON.parse(registry);
          let extensions = registry.extensions.filter(
            (item: any) => item.path !== extension.slug
          );

          extensions = [
            ...extensions,
            {
              name: extension.title,
              path: extension.slug,
              active: req.body.active
            }
          ];

          registry.extensions = extensions;

          fs.writeFileSync(pathname, JSON.stringify(registry), 'utf8');

          res.status(200).json({ success: true, data: 'Updated' });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default update;

'use strict';

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import signale from 'signale';
import unzipper from 'unzipper';
import slugify from 'slugify';
import { exec } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Extension } from 'components/api/model';
import { getEXT } from 'components/api/utils';
import { extensionProp } from 'interfaces/extension';

const uploadFile = (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req);

  let newFile = Date.now().toString();

  form.on('fileBegin', async function (_: never, file: any) {
    let type = getEXT(file.originalFilename);

    if (type === 'zip') {
      newFile = `${newFile}.${type}`;
      file.filepath = path.resolve('./src/extensions', newFile);
    } else {
      res.send({
        success: false,
        message: 'Please upload valid zip file'
      });
    }
  });

  form.on('file', async function (_: never, file: any) {
    const name: any = req.query.name;

    let slug = slugify(name, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.()'"!&$:_@#]/g, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi' // language code of the locale to use
    });

    let pathname = `./src/extensions`;
    let _pathname = `./src/extensions/${slug}`;
    const packageName = `./src/extensions/${slug}/package.json`;

    const extension = await Extension.filter({ slug: slug });

    if (extension.length === 0 && fs.existsSync(_pathname) === false) {
      const directory = await unzipper.Open.file(file.filepath);
      await directory.extract({
        path: path.resolve(pathname)
      });

      fs.unlinkSync(file.filepath);

      let _package: any = await fs.promises.readFile(packageName, 'utf8');
      _package = JSON.parse(_package);
      _package.path = `./${slug}`;
      _package.slug = slug;

      fs.writeFileSync(packageName, JSON.stringify(_package), 'utf8');

      //Update registry
      let registry: any = await fs.promises.readFile(
        pathname + '/registry.json',
        'utf8'
      );
      registry = JSON.parse(registry);
      let extensions = registry.extensions;
      extensions = [...extensions, { name: slug, path: slug, active: false }];
      registry.extensions = extensions;

      fs.writeFileSync(
        pathname + '/registry.json',
        JSON.stringify(registry),
        'utf8'
      );
      // fs.renameSync(_pathname, _pathname);

      let data: extensionProp = {
        title: _package.name,
        slug: slug,
        version: _package.version,
        author: _package.author,
        contact: _package.contact
      };

      let requiredPackages = _package.requiredPackages.join(' ');

      exec(`yarn add ${requiredPackages}`, (error) => {
        if (error) {
          data.error = `${error}`;
          console.error(`${error}`);

          return;
        }
      });

      let upload = new Extension(data);

      upload
        .save()
        .then((f: any) => {
          res.send({ success: true });
        })
        .catch((err: any) => {
          res.send({
            success: false,
            message:
              'Error uploading extensions. Please check the extension documentation for support'
          });
          signale.fatal(err);
        });
    } else {
      fs.unlinkSync(file.filepath);
      res.send({
        success: false,
        message: 'Extension slug name exists. Please use another name.'
      });
    }
  });
};

export default uploadFile;

export const config = {
  api: {
    bodyParser: false
  }
};

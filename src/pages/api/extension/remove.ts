import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Extension } from 'components/api/model';
import { withAuth } from 'components/api/utils';
import fs from 'fs';

const deleteFileIfExists = async (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`File does not exist: ${filePath}. Skipping deletion.`);
    } else {
      throw error;
    }
  }
};

const extension = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      await Extension.get(req.body.id)
        .then(async (data: any) => {
          if (data.id) {
            deleteFileIfExists(`./src/extensions/${data.slug}`);

            await Extension.get(req.body.id).delete();
            res.status(200).json({ success: true, data: 'deleted' });
          } else {
            res
              .status(200)
              .json({ success: false, message: 'Extension not found' });
          }
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default extension;

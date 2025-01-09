import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { r, Chat } from 'components/api/model';
import { slug, withAuth } from 'components/api/utils';

const getChannel = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const { sender, receiver } = req.query;

      Chat.orderBy(r.desc('createdAt'))
        .filter((message) =>
          message('sender')
            .match(sender)
            .or(message('receiver').match(sender))
            .or(
              message('sender')
                .match(receiver)
                .or(message('receiver').match(receiver))
            )
        )
        .limit(1)
        .then(async (data: any) => {
          data = data.length ? data[0].channel : slug();
          res.send({ success: true, data });
        })
        .catch((err: any) => signale.fatal(err));
    } else {
      res.send(auth);
    }
  });
};

export default getChannel;

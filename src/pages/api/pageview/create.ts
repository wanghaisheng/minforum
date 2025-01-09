import signale from 'signale';
import type { NextApiRequest, NextApiResponse } from 'next';
import useragent from 'express-useragent';
import { Pageview } from 'components/api/model';
import { withAuth } from 'components/api/utils';

const geoData = async (ip) => {
  let url = `${process.env.GEO_URL}/${ip}.json`;
  let geo = await fetch(url);
  let data = await geo.json();

  data = data || { country: 'Unknown', city: 'Unknown' };

  return data;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await withAuth(req).then(async (auth) => {
    if (auth.success) {
      const ua = useragent.parse(req.headers['user-agent']);
      let device = ua.isSmartTV
        ? 'Smart TV'
        : ua.isDesktop
          ? 'Desktop'
          : ua.isTablet
            ? 'Tablet'
            : ua.isMobile
              ? 'Phone'
              : 'Unknown';
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      let geo = await geoData(ip);

      req.body.country = geo.country || 'Unknown';
      req.body.city = geo.city || 'Unknown';
      req.body.device = device;
      req.body.os = ua.os === 'OS X' ? 'macOS' : ua.os;
      req.body.browser = ua.browser;
      req.body.ipAddress =
        req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      req.body.referrer = req.headers.referer.includes(
        process.env.NEXT_PUBLIC_CLIENT_ORIGINS
      )
        ? 'Direct'
        : req.headers.referer;

      let pageview = new Pageview(req.body);
      await pageview
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
        .catch((err: any) => {
          signale.fatal(err);
        });
    } else {
      res.send(auth);
    }
  });
};

export default create;

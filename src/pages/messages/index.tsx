import { useEffect } from 'react';
import { Spacer, Loading } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/navbar';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Translation } from 'components/intl/translation';
import Auth from 'components/auth';
import useSettings from 'components/settings';

const Index = observer(() => {
  const router = useRouter();
  const cookie = parseCookies();
  const settings = useSettings();
  useEffect(() => {
    init();
  }, [router]);

  const init = async () => {
    let msg = cookie && cookie?._msg_init ? JSON.parse(cookie?._msg_init) : {};
    msg?.channel
      ? router.push(`/messages/${msg?.channel}`)
      : router.push('/messages/new');
  };

  const lang = settings.language;

  return (
    <Auth>
      <Navbar title={`Messages`} description={`Messages`} />
      <div className="page-container top-100">
        <Spacer h={10} />
        <Loading scale={1.2}>
          <Translation lang={lang} value={'Loading'} />
        </Loading>
      </div>
    </Auth>
  );
});

export default Index;

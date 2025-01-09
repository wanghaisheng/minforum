import { useEffect, useState } from 'react';
import { Spacer, Loading } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/Navbar';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import SettingsStore from 'stores/settings';
import { Translation } from 'components/intl/Translation';
import Auth from 'components/Auth';

const Index = observer(() => {
  const router = useRouter();
  const cookie = parseCookies();
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  useEffect(() => {
    init();
  }, [router]);

  const init = async () => {
    await getSettings();
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

import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import SettingsStore from 'stores/settings';

const SetupVerify = observer((props: any) => {
  const router = useRouter();
  const [{ settings, getSettings }] = React.useState(() => new SettingsStore());

  React.useEffect(() => {
    router.isReady
      ? getSettings().then((settings: any) => {
          let { data } = settings;
          data && data.status === 'completed' ? goTo('/') : '';
        })
      : null;
  }, [router]);

  const goTo = (value: string) => {
    router.push(value);
  };

  if (settings.siteName && settings.status === 'completed') {
    return <></>;
  } else {
    return <div>{props.children}</div>;
  }
});

export default SetupVerify;

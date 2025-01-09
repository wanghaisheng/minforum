import { useEffect, useState } from 'react';
import { Spacer, Text } from '@geist-ui/core';

import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';

import SettingsStore from 'stores/settings';
import { Translation, useTranslation } from 'components/intl/Translation';

const Privacy = observer(() => {
  const [{ settings, getSettings }] = useState(() => new SettingsStore());

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div>
      <Navbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Privacy policy'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Privacy policy'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3 className="capitalize">
            {useTranslation({
              lang: settings?.language,
              value: 'Privacy policy'
            })}
          </Text>
          <div dangerouslySetInnerHTML={{ __html: settings?.privacy }}></div>
          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Privacy;

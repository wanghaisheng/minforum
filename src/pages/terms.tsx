import { useEffect, useState } from 'react';
import { Spacer, Text } from '@geist-ui/core';

import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';

import SettingsStore from 'stores/settings';
import { useTranslation } from 'components/intl/Translation';

const Terms = observer(() => {
  const [{ settings, getSettings }] = useState(() => new SettingsStore());

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div>
      <Navbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Terms & conditions'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Terms & conditions'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3 className="capitalize">
            {useTranslation({
              lang: settings?.language,
              value: 'Terms & conditions'
            })}
          </Text>
          <div dangerouslySetInnerHTML={{ __html: settings?.terms }}></div>
          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Terms;

import { Spacer, Text } from '@geist-ui/core';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import { translation } from 'components/intl/translation';
import useSettings from 'components/settings';

const Privacy = observer(() => {
  const settings = useSettings();

  return (
    <div>
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Privacy policy'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Privacy policy'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3 className="capitalize">
            {translation({
              lang: settings?.language,
              value: 'Privacy policy'
            })}
          </Text>
          <div
            className="static-container"
            dangerouslySetInnerHTML={{ __html: settings?.privacy }}
          ></div>
          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Privacy;

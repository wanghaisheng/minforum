import { Spacer, Text } from '@geist-ui/core';
import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'components/intl/Translation';
import useSettings from 'components/settings';

const Terms = observer(() => {
  const settings = useSettings();

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
          <div
            className="static-container"
            dangerouslySetInnerHTML={{ __html: settings?.terms }}
          ></div>
          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Terms;

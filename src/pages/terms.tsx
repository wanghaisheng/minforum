import { Spacer, Text } from '@geist-ui/core';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import { translation } from 'components/intl/translation';
import useSettings from 'components/settings';

const Terms = observer(() => {
  const settings = useSettings();

  return (
    <div>
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Terms & conditions'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Terms & conditions'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3 className="capitalize">
            {translation({
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

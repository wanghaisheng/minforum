import { Spacer, Text, Button } from '@geist-ui/core';
import Navbar from 'components/navbar';
import Link from 'next/link';
import { Translation } from 'components/intl/translation';
import { ChevronLeft } from '@geist-ui/icons';
import { observer } from 'mobx-react-lite';
import useSettings from 'components/settings';

const PageNotFound = () => {
  const settings = useSettings();

  return (
    <div>
      <Navbar title="Page not found" description="Page not found" norobot />
      <div className="page-container top-100 center">
        <Spacer h={4} />
        <Text h3>
          <Translation
            lang={settings?.language}
            value="Oops! Page not found or has been deleted."
          />
        </Text>
        <Spacer h={2} />
        <Link href="/">
          <Button auto type="secondary" icon={<ChevronLeft />}>
            <Translation lang={settings?.language} value="Back to home" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default observer(PageNotFound);

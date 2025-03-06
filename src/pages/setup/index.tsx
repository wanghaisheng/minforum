import { useState, useEffect } from 'react';
import {
  Spacer,
  Text,
  Button,
  Input,
  Card,
  Select,
  Spinner,
  Loading
} from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { ChevronRight } from '@geist-ui/icons';
import Navbar from 'components/navbar';
import SettingsStore from 'stores/settings';
import toast, { Toaster } from 'react-hot-toast';
import { validateEmail } from 'components/api/utils';
import { setCookie, parseCookies } from 'nookies';
import SetupVerify from 'components/admin/setup-verify';
import { Translation, translation } from 'components/intl/translation';

const Setup = observer(() => {
  const cookie = parseCookies();
  const router = useRouter();
  const [store] = useState(() => new SettingsStore());
  const [loading, setLoading] = useState(true);
  const { admin, setAdmin, settings, setSettings, getSettings } = store;

  useEffect(() => {
    getSettings();
    setTimeout(() => {
      let setup =
        cookie && cookie._w_setup ? JSON.parse(cookie._w_setup) : null;
      setup ? (setAdmin(setup.admin), setSettings(setup.settings)) : null;
      setLoading(false);
    }, 3000);
  }, []);

  const handleSettings = (val: any) => {
    setSettings({ ...settings, ...val });
  };

  const lang = settings?.language ? settings?.language : 'en';

  const _next = async () => {
    const { name, email, password } = admin;

    if (!settings.language) {
      toast.error(
        translation({
          lang: lang,
          value: 'Please select a language'
        })
      );
    } else if (!name || name.length < 3) {
      toast.error(
        translation({
          lang: lang,
          value: 'Username is too short. Minimum character is three.'
        })
      );
    } else if (validateEmail(email) === false) {
      toast.error(
        translation({
          lang: lang,
          value: 'Invalid email address'
        })
      );
    } else if (!password || password.length < 6) {
      toast.error(
        translation({
          lang: lang,
          value: 'Password is too short. Minimum character is six.'
        })
      );
    } else {
      settings.language = settings.language || 'en';
      admin.name = admin.name;
      admin.username = admin.username;
      const setup = { settings, admin };
      setCookie(null, '_w_setup', JSON.stringify(setup), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      router.push('/setup/meta');
    }
  };

  return (
    <SetupVerify>
      <Navbar
        title="Welcome - Setup Minforum"
        description="Welcome - Setup Minforum"
        hide
        norobot
      />
      <Toaster />
      <div className="polkadot">
        {loading ? (
          <div className="center" style={{ width: 500, margin: '20% auto' }}>
            <img src="/images/logo-wordmark.svg" height={100} />
            <Loading scale={2}>Initializing</Loading>
          </div>
        ) : (
          <div className="page-container top-100">
            <div className="boxed">
              <div className="center">
                <img src="/images/logo-wordmark.svg" height={80} />
              </div>

              <Card shadow width="100%">
                <Text h3>
                  <Translation
                    lang={lang}
                    value="Welcome, Let's setup blazingly!"
                  />
                </Text>
                <Spacer h={2} />
                <Select
                  scale={4 / 3}
                  placeholder={translation({
                    lang: lang,
                    value: 'Select language'
                  })}
                  width="100%"
                  value={settings.language}
                  onChange={(val) => handleSettings({ language: val })}
                >
                  <Select.Option value="en">
                    <Translation lang={lang} value="English" />
                  </Select.Option>
                  <Select.Option value="fr">
                    <Translation lang={lang} value="French" />
                  </Select.Option>
                  <Select.Option value="es">
                    <Translation lang={lang} value="Spanish" />
                  </Select.Option>
                  <Select.Option value="de">
                    <Translation lang={lang} value="German" />
                  </Select.Option>
                  <Select.Option value="cn">
                    <Translation lang={lang} value="Chinese" />
                  </Select.Option>
                  <Select.Option value="ja">
                    <Translation lang={lang} value="Japanese" />
                  </Select.Option>
                  <Select.Option value="ko">
                    <Translation lang={lang} value="Korean" />
                  </Select.Option>
                  <Select.Option value="ru">
                    <Translation lang={lang} value="Russian" />
                  </Select.Option>
                </Select>
                <Spacer h={1.5} />
                <Input
                  placeholder={`${translation({
                    lang: lang,
                    value: 'Admin'
                  })} ${translation({
                    lang: lang,
                    value: 'Username'
                  })}`}
                  width="100%"
                  scale={4 / 3}
                  value={admin.name}
                  onChange={(e) =>
                    setAdmin({
                      ...admin,
                      name: e.target.value,
                      username: e.target.value.toLowerCase().replace(/\s/, '')
                    })
                  }
                />
                <Spacer h={1.5} />
                <Input
                  htmlType={'email'}
                  placeholder={`${translation({
                    lang: lang,
                    value: 'Admin'
                  })} ${translation({
                    lang: lang,
                    value: 'Email'
                  })}`}
                  width="100%"
                  scale={4 / 3}
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                />
                <Spacer h={1.5} />
                <Input.Password
                  placeholder={`${translation({
                    lang: lang,
                    value: 'Admin'
                  })} ${translation({
                    lang: lang,
                    value: 'Password'
                  })}`}
                  width="100%"
                  scale={4 / 3}
                  value={admin.password}
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                />
                <Spacer h={1.5} />
                <Button
                  shadow
                  type="secondary"
                  width="100%"
                  iconRight={<ChevronRight />}
                  onClick={_next}
                >
                  <Translation lang={lang} value="Continue" /> &nbsp;(2/3)
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </SetupVerify>
  );
});

export default Setup;

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Spacer, Text, Input, Card } from '@geist-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import AdminNavbar from 'components/admin/Navbar';
import Sidebar from 'components/admin/Sidebar';
import Auth from 'components/admin/Auth';
import ThemeStore from 'stores/theme';
import SettingsStore from 'stores/settings';
import { useTranslation, Translation } from 'components/intl/Translation';
import useToken from 'components/Token';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { InfoFill } from '@geist-ui/icons';

const CreateTheme = observer(() => {
  const token = useToken();
  const router = useRouter();
  const [showColor, toggleColor] = useState(false);
  const [code, setCode] = useState(`{
  palette: {
    accents_1: '#fafafa',
    accents_2: '#eaeaea',
    accents_3: '#999',
    accents_4: '#888',
    accents_5: '#666',
    accents_6: '#444',
    accents_7: '#333',
    accents_8: '#111',
    background: '#fff',
    foreground: '#000',
    selection: '#79ffe1',
    secondary: '#666',
    code: '#f81ce5',
    border: '#eaeaea',
    error: '#e00',
    errorLight: '#ff1a1a',
    errorLighter: '#f7d4d6',
    errorDark: '#c50000',
    success: '#0070f3',
    successLight: '#3291ff',
    successLighter: '#d3e5ff',
    successDark: '#0761d1',
    warning: '#f5a623',
    warningLight: '#f7b955',
    warningLighter: '#ffefcf',
    warningDark: '#ab570a',
    cyan: '#50e3c2',
    cyanLighter: '#aaffec',
    cyanLight: '#79ffe1',
    cyanDark: '#29bc9b',
    violet: '#7928ca',
    violetLighter: '#e3d7fc',
    violetLight: '#8a63d2',
    violetDark: '#4c2889',
    purple: '#f81ce5',
    alert: '#ff0080',
    magenta: '#eb367f',
    link: '#000'
  },
  expressiveness: {
    linkStyle: 'none',
    linkHoverStyle: 'none',
    dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
    scrollerStart: 'rgba(255, 255, 255, 1)',
    scrollerEnd: 'rgba(255, 255, 255, 0)',
    shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
    shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
    shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
    portalOpacity: 0.25
  },
  font: '"Inter", sans-serif'
}`);
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [{ loading, theme, setTheme, newTheme }] = useState(
    () => new ThemeStore()
  );
  const { title } = theme;

  useEffect(() => {
    getSettings();
  }, [token?.id]);

  const save = async () => {
    if (!title || title.length < 3) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Title is too short. Minimum of 3 characters.'
        })
      );
    } else if (!code) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Theme code cannot be empty!'
        })
      );
    } else {
      await newTheme({ ...theme, code }).then((res: any) => {
        if (res.success) {
          toast.success(
            useTranslation({
              lang: settings?.language,
              value: 'Theme created successfully!'
            })
          );
          router.push(`/admin/themes/${res.data.slug}`);
        } else {
          toast.error(
            useTranslation({
              lang: settings?.language,
              value: 'Unable to create theme. Please try again!'
            })
          );
        }
      });
    }
  };

  return (
    <Auth roles={['admin']}>
      <Toaster />
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Create theme'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Create theme'
        })}
      />

      <div className="page-container top-100">
        <Sidebar role={token?.role} active="themes" lang={settings?.language} />

        <main className="main for-admin">
          <div className="boxed large">
            <h3>
              <Translation lang={settings?.language} value="Create theme" />
            </h3>
            <Spacer />

            <Text>
              <Translation lang={settings?.language} value="Title" />
            </Text>
            <Input
              width={'100%'}
              value={title}
              onChange={(e) =>
                setTheme({ ...theme, ...{ title: e.target.value } })
              }
            />
            <Spacer />
            <div
              style={{
                width: '100%',
                height: '400px',
                border: '1px solid #ccc'
              }}
            >
              <CodeMirror
                value={code}
                height="395px"
                extensions={[javascript()]}
                onChange={(value) => {
                  setCode(value);
                  setTheme({ ...theme, code: value });
                }}
                theme="light"
                data-gramm="false"
              />
            </div>
            <Spacer />

            <Button
              loading={loading}
              type="secondary-light"
              width="100%"
              onClick={save}
            >
              <Translation lang={settings?.language} value="Save" />
            </Button>
          </div>
        </main>
      </div>
    </Auth>
  );
});

export default CreateTheme;

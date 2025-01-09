import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Spacer, Text, Input, Toggle } from '@geist-ui/core';
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
import { parseCookies, setCookie } from 'nookies';

const EditTheme = observer(() => {
  const cookie = parseCookies();
  const token = useToken();
  const router = useRouter();
  const { id }: any = router.query;
  const [{ settings, getSettings, update }] = useState(
    () => new SettingsStore()
  );
  const [
    { loading, theme, themes, setTheme, updateTheme, getTheme, getThemes }
  ] = useState(() => new ThemeStore());
  const { title, code, active } = theme;

  useEffect(() => {
    getSettings();
    getThemes();

    id && getTheme(id);
  }, [token?.id]);

  const handleStatus = async (value: boolean) => {
    const _theme = cookie && cookie._w_theme ? cookie._w_theme : null;
    let themeCount = themes.filter((item) => item.active === true);

    value === true &&
      setCookie(null, '_w_theme', theme.slug, {
        path: '/'
      });

    value === true && (await update({ ...settings, theme: theme.slug }));

    await updateTheme({ ...theme, active: value }).then((res: any) => {
      if (res.success) {
        setTheme({ ...theme, active: value });
        toast.success(
          useTranslation({
            lang: settings?.language,
            value: 'Theme updated successfully!'
          })
        );
        router.reload();
      } else {
        toast.error(
          useTranslation({
            lang: settings?.language,
            value: 'Unable to update theme. Please try again!'
          })
        );
      }
    });
  };

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
      await updateTheme({ ...theme, code }).then((res: any) => {
        if (res.success) {
          toast.success(
            useTranslation({
              lang: settings?.language,
              value: 'Theme updated successfully!'
            })
          );
          // router.push(`/admin/themes/${res.data.slug}`);
        } else {
          toast.error(
            useTranslation({
              lang: settings?.language,
              value: 'Unable to update theme. Please try again!'
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
          value: 'Edit theme'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Edit theme'
        })}
      />

      <div className="page-container top-100">
        <Sidebar role={token?.role} active="themes" lang={settings?.language} />

        <main className="main for-admin">
          <div className="boxed large">
            <h3>
              <Translation lang={settings?.language} value="Edit theme" />
            </h3>
            <Spacer />
            <Text>
              <Toggle
                scale={2}
                color="green"
                checked={active}
                onChange={() => handleStatus(!active)}
                mb={'5px'}
              />
              <Text
                small
                font={'18px'}
                style={{ position: 'relative', top: 3 }}
              >
                {' '}
                &nbsp;
                <Translation
                  lang={settings?.language}
                  value={active ? 'Active' : 'Inactive'}
                />
              </Text>
            </Text>
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
                onChange={(value) => setTheme({ ...theme, code: value })}
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

export default EditTheme;

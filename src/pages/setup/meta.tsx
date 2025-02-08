import { useState, useEffect } from 'react';
import {
  Spacer,
  Text,
  Button,
  Input,
  Card,
  Textarea,
  Image
} from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Image as Picture } from '@geist-ui/icons';
import Navbar from 'components/navbar';
import SetupVerify from 'components/admin/setup-verify';
import SettingsStore from 'stores/settings';
import { Translation, translation } from 'components/intl/translation';

const MetaSetup = observer(() => {
  const cookie = parseCookies();
  const router = useRouter();
  const [store] = useState(() => new SettingsStore());
  const { admin, setAdmin, settings, setSettings, getSettings, uploadImage } =
    store;

  useEffect(() => {
    let setup = cookie && cookie._w_setup ? JSON.parse(cookie._w_setup) : null;
    setup ? (setAdmin(setup.admin), setSettings(setup.settings)) : false;
  }, []);

  const lang = settings?.language ? settings?.language : 'en';

  const handleUpload = async () => {
    let t = toast.loading('Uploading image....');

    let upload: any = document.querySelector('.file-upload');

    let formData = new FormData();
    formData.append('file', upload.files[0]);

    await uploadImage('logo', formData)
      .then((res: any) => {
        if (res?.success) {
          setSettings({ ...settings, siteLogo: res.file });
          let _upload: any = document.querySelector('.file-upload');
          _upload.value = '';

          toast.dismiss(t);
          toast.success('Image uploaded successfully!');
        } else {
          let _upload: any = document.querySelector('.file-upload');
          _upload.value = '';

          toast.dismiss(t);
          toast.error(res.message, {
            duration: 3000
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSettings = (val: any) => {
    setSettings({ ...settings, ...val });
  };

  const _next = async () => {
    const { siteName, siteDescription } = settings;

    if (!siteName || siteName.length < 3) {
      toast.error('Site name is too short. Minimum character is three.');
    } else if (!siteDescription || siteDescription.length < 10) {
      toast.error('Description is too short! Minimum character is 10.');
    } else {
      const setup = { settings, admin };
      setCookie(null, '_w_setup', JSON.stringify(setup), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
      router.push('/setup/email');
    }
  };

  return (
    <SetupVerify>
      <Navbar
        title="Metadata - Setup Minforum"
        description="Metadata - Setup Minforum"
        hide
        norobot
      />
      <Toaster />
      <div className="polkadot">
        <div className="page-container top-100">
          <div className="boxed">
            <div className="center">
              <img src="/images/logo-wordmark.svg" height={80} />
            </div>

            <Card shadow width="100%">
              <Text h3>
                <Translation lang={lang} value="Site metadata" />
              </Text>
              <Spacer h={2} />
              <div className="discussion-container">
                <div>
                  <Button icon={<Picture />} auto>
                    <Translation lang={lang} value="Upload logo" />
                    <input
                      type="file"
                      className="file-upload"
                      onChange={handleUpload}
                    />
                  </Button>
                </div>
                <div>
                  {settings.siteLogo ? (
                    <Image
                      src={`/static/${settings.siteLogo}`}
                      style={{ width: 'auto', height: 30 }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <Spacer />

              <Spacer h={1.5} />
              <Input
                placeholder={translation({
                  lang: lang,
                  value: 'Site name'
                })}
                width="100%"
                scale={4 / 3}
                value={settings.siteName}
                onChange={(e) =>
                  handleSettings({
                    ...settings,
                    siteName: e.target.value
                  })
                }
              />
              <Spacer h={1.5} />
              <Textarea
                placeholder={translation({
                  lang: lang,
                  value: 'Site description'
                })}
                width="100%"
                scale={4 / 3}
                value={settings.siteDescription}
                onChange={(e) =>
                  handleSettings({
                    ...settings,
                    siteDescription: e.target.value
                  })
                }
              />
              <Spacer h={1.5} />
              <Button
                onClick={() => router.back()}
                width="48%"
                icon={<ChevronLeft />}
                style={{ backgroundColor: '#f9f9f9' }}
              >
                <Translation lang={lang} value="Back" />
              </Button>
              <Button
                shadow
                type="secondary"
                width="50%"
                ml={'5px'}
                iconRight={<ChevronRight />}
                onClick={_next}
              >
                <Translation lang={lang} value="Continue" /> &nbsp;(3 / 3)
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </SetupVerify>
  );
});

export default MetaSetup;

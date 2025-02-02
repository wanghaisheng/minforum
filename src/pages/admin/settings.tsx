import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Input,
  Text,
  Collapse,
  Button,
  Textarea,
  Tabs,
  Spacer,
  Image,
  Select,
  Divider
} from '@geist-ui/core';
import { setCookie, parseCookies } from 'nookies';
import { MinusCircle, Image as Picture, Plus } from '@geist-ui/icons';
import AdminNavbar from 'components/admin/navbar';
import Sidebar from 'components/admin/sidebar';
import SettingsStore from 'stores/settings';
import Auth from 'components/admin/auth';
import toast, { Toaster } from 'react-hot-toast';
import Editor from 'components/editor';
import { useTranslation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import { extensionVariable } from 'interfaces/settings';
import currencies from 'components/api/currency';
import { useRouter } from 'next/router';

const Settings = observer(() => {
  const token = useToken();
  const router = useRouter();
  const [store] = useState(() => new SettingsStore());
  const cookie = parseCookies();
  const { loading, settings, setSettings, getSettings, update, uploadImage } =
    store;
  const { point, email, advert, banWords, payment } = settings;

  useEffect(() => {
    getSettings();
  }, [token?.id, router]);

  const addVariable = () => {
    let variables: any = settings.extensionVariables || [];
    let variable = [{ key: '', value: '' }];
    variables = [...variables, ...variable];

    setSettings({ ...settings, extensionVariables: variables });
  };

  const updateVariable = (index: number, value: extensionVariable) => {
    let variables: any = settings?.extensionVariables || [];
    let currentVariable = variables[index];
    currentVariable = { ...currentVariable, ...value };
    variables[index] = currentVariable;

    setSettings({ ...settings, extensionVariables: variables });
  };

  const removeVariable = (index: number) => {
    let variables: any = settings?.extensionVariables || [];
    variables = variables.filter((_, key: number) => key !== index);

    setSettings({ ...settings, extensionVariables: variables });
  };

  const handleUpload = async (id: string) => {
    let t = toast.loading(
      useTranslation({
        lang: settings?.language,
        value: 'Uploading image....'
      })
    );

    let upload: any = document.querySelector(id);

    let formData = new FormData();
    formData.append('file', upload.files[0]);

    await uploadImage('logo', formData)
      .then((res: any) => {
        if (res?.success) {
          if (id === '#site-logo') {
            setSettings({ ...settings, siteLogo: res.file });
          } else if (id === '#site-favicon') {
            setSettings({ ...settings, siteFavicon: res.file });
          } else if (id === '#site-banner') {
            let homepage = settings?.homepage;
            homepage.image = res.file;
            setSettings({ ...settings, homepage });
          }

          let _upload: any = document.querySelector(id);
          _upload.value = '';

          toast.dismiss(t);
          toast.success(
            useTranslation({
              lang: settings?.language,
              value: 'Image uploaded successfully!'
            })
          );
        } else {
          let _upload: any = document.querySelector(id);
          _upload.value = '';

          toast.dismiss(t);
          toast.error(res.message, {
            duration: 3000
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const save = async () => {
    await update(settings).then((res: any) => {
      if (res.success) {
        toast.success(
          useTranslation({
            lang: settings?.language,
            value: 'Settings updated successfully'
          })
        );
      } else {
        toast.error(
          useTranslation({
            lang: settings?.language,
            value: 'Error updating settings! Please try again.'
          })
        );
      }
    });
  };

  const variables: any = settings?.extensionVariables || [
    { key: '', value: '' }
  ];

  const monies = useMemo(
    () =>
      currencies
        .map((item) => ({ title: `${item.name}`, value: item.cc }))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [currencies]
  );

  return (
    <Auth roles={['admin']}>
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Settings'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Settings'
        })}
      />
      <Toaster />
      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="settings"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <Collapse.Group width={'100%'} className="settings">
            <Text h3>
              <Translation lang={settings?.language} value="Settings" />
            </Text>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'General settings'
              })}
              initialVisible
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Site favicon"
                    />
                  </Text>
                </div>
                <div className="item">
                  <div className="discussion-container">
                    <div>
                      <Button auto icon={<Picture />} width="190px">
                        <Translation
                          lang={settings?.language}
                          value="Upload favicon"
                        />
                        <input
                          type="file"
                          className="file-upload"
                          id="site-favicon"
                          onChange={() => handleUpload('#site-favicon')}
                        />
                      </Button>
                    </div>
                    <div>
                      {settings.siteFavicon ? (
                        <Image
                          src={`/storage/${settings.siteFavicon}`}
                          style={{ width: 'auto', height: 30 }}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation lang={settings?.language} value="Site logo" />
                  </Text>
                </div>
                <div className="item">
                  <div className="discussion-container">
                    <div>
                      <Button auto icon={<Picture />} width="190px">
                        <Translation
                          lang={settings?.language}
                          value="Upload logo"
                        />
                        <input
                          type="file"
                          className="file-upload"
                          id="site-logo"
                          onChange={() => handleUpload('#site-logo')}
                        />
                      </Button>
                    </div>
                    <div>
                      {settings.siteLogo ? (
                        <Image
                          src={`/storage/${settings.siteLogo}`}
                          style={{ width: 'auto', height: 30 }}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <Spacer />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation lang={settings?.language} value="Site name" />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    width={'100%'}
                    value={settings.siteName}
                    onChange={(e: any) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Site description"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Textarea
                    width={'100%'}
                    value={settings.siteDescription}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        siteDescription: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <Spacer />
              <Divider />
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Sender name"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    width={'100%'}
                    value={settings.senderName}
                    placeholder="MinForum"
                    onChange={(e: any) =>
                      setSettings({ ...settings, senderName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Sender email"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    width={'100%'}
                    value={settings.senderEmail}
                    placeholder="no-reply@domain.com"
                    onChange={(e: any) =>
                      setSettings({ ...settings, senderEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Welcome email"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Textarea
                    width={'100%'}
                    value={settings.welcomeEmail}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        welcomeEmail: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Language'
              })}
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Site language"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Select
                    width={'100%'}
                    value={settings.language}
                    onChange={(value) =>
                      setSettings({ ...settings, language: value })
                    }
                  >
                    <Select.Option value="en">
                      <Translation lang={settings?.language} value="English" />
                    </Select.Option>
                    <Select.Option value="fr">
                      <Translation lang={settings?.language} value="French" />
                    </Select.Option>
                    <Select.Option value="es">
                      <Translation lang={settings?.language} value="Spanish" />
                    </Select.Option>
                    <Select.Option value="de">
                      <Translation lang={settings?.language} value="German" />
                    </Select.Option>
                    <Select.Option value="cn">
                      <Translation lang={settings?.language} value="Chinese" />
                    </Select.Option>
                    <Select.Option value="ja">
                      <Translation lang={settings?.language} value="Japanese" />
                    </Select.Option>
                    <Select.Option value="ko">
                      <Translation lang={settings?.language} value="Korean" />
                    </Select.Option>
                    <Select.Option value="ru">
                      <Translation lang={settings?.language} value="Russian" />
                    </Select.Option>
                  </Select>
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Social settings'
              })}
            >
              <Tabs initialValue="1">
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Facebook appId'
                  })}
                  value="1"
                >
                  <Input
                    width={'100%'}
                    value={settings?.socialAccount?.facebook}
                    onChange={(e: any) => {
                      let socialAccount = {
                        ...settings?.socialAccount,
                        facebook: e.target.value
                      };
                      setSettings({
                        ...settings,
                        ...{ socialAccount }
                      });
                    }}
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Google clientId'
                  })}
                  value="3"
                >
                  <Input
                    width={'100%'}
                    value={settings?.socialAccount?.google}
                    onChange={(e: any) => {
                      let socialAccount = {
                        ...settings?.socialAccount,
                        google: e.target.value
                      };
                      setSettings({
                        ...settings,
                        ...{ socialAccount }
                      });
                    }}
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
              </Tabs>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Announcement'
              })}
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Announcement text"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Textarea
                    width={'100%'}
                    rows={5}
                    value={settings.announcementText}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        announcementText: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Announcement link"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="url"
                    width={'100%'}
                    value={settings.announcementLink}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        announcementLink: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={() => {
                      if (settings?.announcementText) {
                        let c = Number(cookie?.isAnnounce) || '0';
                        c = Number(c) - 1;
                        setCookie(null, 'isAnnounce', `${c}`, {
                          path: '/'
                        });
                      }
                      save();
                    }}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Security settings'
              })}
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Cloudflare turnstile public key"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input.Password
                    width={'100%'}
                    value={settings.cloudflarePublicKey}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        cloudflarePublicKey: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Cloudflare turnstile secret key"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input.Password
                    width={'100%'}
                    value={settings.cloudflareSecretKey}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        cloudflareSecretKey: e.target.value
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Advert settings'
              })}
            >
              <Tabs initialValue="1">
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Top'
                  })}
                  value="1"
                >
                  <Textarea
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Advert code'
                    })}
                    width={'100%'}
                    height="150px"
                    value={advert?.top}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        advert: { ...advert, top: e.target.value }
                      })
                    }
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Left side'
                  })}
                  value="2"
                >
                  <Textarea
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Advert code'
                    })}
                    width={'100%'}
                    height="150px"
                    value={advert?.left}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        advert: { ...advert, left: e.target.value }
                      })
                    }
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Right side'
                  })}
                  value="3"
                >
                  <Textarea
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Advert code'
                    })}
                    width={'100%'}
                    height="150px"
                    value={advert?.right}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        advert: { ...advert, right: e.target.value }
                      })
                    }
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Inner'
                  })}
                  value="4"
                >
                  <Textarea
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Advert code'
                    })}
                    width={'100%'}
                    height="150px"
                    value={advert?.inner}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        advert: { ...advert, inner: e.target.value }
                      })
                    }
                  />
                  <Spacer />
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
              </Tabs>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Email settings'
              })}
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation lang={settings?.language} value="SMTP host" />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    width={'100%'}
                    value={email?.host}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        email: { ...email, host: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="SMTP user/email"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    width={'100%'}
                    value={email?.email}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        email: { ...email, email: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="SMTP password"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input.Password
                    width={'100%'}
                    value={email?.password}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        email: { ...email, password: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Reward settings'
              })}
            >
              <Text small>
                <Translation
                  lang={settings?.language}
                  value="Note: Changing the point value will affect users' current points."
                />
              </Text>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Login reward"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    value={`${point?.login}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        point: { ...point, login: Number(e.target.value) }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Discussion reward"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    value={`${point?.discussion}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        point: { ...point, discussion: Number(e.target.value) }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Comment reward"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    value={`${point?.comment}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        point: { ...point, comment: Number(e.target.value) }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Best answer reward"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    value={`${point?.bestAnswer}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        point: { ...point, bestAnswer: Number(e.target.value) }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse>
            {/* <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Payment settings'
              })}
            >
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation lang={settings?.language} value="Currency" />
                  </Text>
                </div>
                <div className="item">
                  <Select
                    width={'100%'}
                    value={payment?.currency}
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Choose one'
                    })}
                    onChange={(val: string) =>
                      setSettings({
                        ...settings,
                        payment: {
                          ...payment,
                          currency: val
                        }
                      })
                    }
                  >
                    {monies.map((item) => (
                      <Select.Option value={item.value} key={item.value}>
                        <span className="capitalize">{item.title}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="Premium access fee (monthly)"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    value={`${payment?.monthly}`}
                    placeholder={useTranslation({
                      lang: settings.language,
                      value: 'Leave empty or zero, if not applicable'
                    })}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        payment: {
                          ...payment,
                          monthly: Number(e.target.value)
                        }
                      })
                    }
                  />
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation
                      lang={settings?.language}
                      value="User subscription fee (monthly)"
                    />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: settings.language,
                      value: 'Leave empty or zero, if not applicable'
                    })}
                    value={`${payment?.subscription}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        payment: {
                          ...payment,
                          subscription: Number(e.target.value)
                        }
                      })
                    }
                  />
                  <small>
                    <Translation
                      lang={settings.language}
                      value="Note: Payment received by the user when others subscribe to their premium content"
                    />
                  </small>
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6>
                    <Translation lang={settings?.language} value="Percentage" />
                  </Text>
                </div>
                <div className="item">
                  <Input
                    htmlType="number"
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: settings.language,
                      value: 'Leave empty or zero, if not applicable'
                    })}
                    value={`${payment?.percentage}`}
                    onChange={(e: any) =>
                      setSettings({
                        ...settings,
                        payment: {
                          ...payment,
                          percentage: Number(e.target.value)
                        }
                      })
                    }
                  />
                  <small>
                    <Translation
                      lang={settings.language}
                      value="Percentage charged on user subscription fee"
                    />
                  </small>
                </div>
              </div>
              <div className="column">
                <div className="item">
                  <Text h6></Text>
                </div>
                <div className="item">
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </div>
              </div>
            </Collapse> */}
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Banned words'
              })}
            >
              <Textarea
                placeholder="Type words separate with comma"
                width="100%"
                value={banWords}
                onChange={(e: any) =>
                  setSettings({
                    ...settings,
                    ...{ banWords: e.target.value }
                  })
                }
              />
              <Spacer />
              <Button shadow type="secondary" loading={loading} onClick={save}>
                <Translation lang={settings?.language} value="Save" />
              </Button>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Legal settings'
              })}
            >
              <Tabs initialValue="1">
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Terms & conditions'
                  })}
                  value="1"
                >
                  {settings?.terms && (
                    <Editor
                      lang={settings?.language}
                      value={settings?.terms}
                      height="200px"
                      onChange={(val) =>
                        setSettings({
                          ...settings,
                          terms: val
                        })
                      }
                    />
                  )}
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
                <Tabs.Item
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Privacy policy'
                  })}
                  value="2"
                >
                  {settings?.privacy && (
                    <Editor
                      lang={settings?.language}
                      value={settings?.privacy}
                      height="200px"
                      onChange={(val) =>
                        setSettings({
                          ...settings,
                          privacy: val
                        })
                      }
                    />
                  )}
                  <Button
                    shadow
                    type="secondary"
                    loading={loading}
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value="Save" />
                  </Button>
                </Tabs.Item>
              </Tabs>
            </Collapse>
            <Collapse
              title={useTranslation({
                lang: settings?.language,
                value: 'Extension variables'
              })}
            >
              {variables.map((item: extensionVariable, index: number) => (
                <div key={index}>
                  <div className="variable-grid auto">
                    <div>
                      <Input
                        placeholder="VARIABLE_NAME"
                        width={'100%'}
                        value={item.key}
                        onChange={(e: any) =>
                          updateVariable(index, { key: e.target.value })
                        }
                      >
                        <Translation lang={settings.language} value="Key" />
                      </Input>
                    </div>
                    <div>
                      <Input.Password
                        width={'100%'}
                        value={item.value}
                        onChange={(e: any) =>
                          updateVariable(index, { value: e.target.value })
                        }
                      >
                        <Translation lang={settings.language} value="Value" />
                      </Input.Password>
                    </div>
                    <div>
                      <Spacer h={1.7} />
                      <Button
                        auto
                        type="error-light"
                        icon={<MinusCircle />}
                        scale={0.8}
                        onClick={() => removeVariable(index)}
                      />
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}

              <Spacer />
              <Button
                auto
                loading={loading}
                icon={<Plus />}
                onClick={addVariable}
              >
                <Translation lang={settings.language} value="Add" />
              </Button>
              <Spacer inline />
              <Button type="secondary-light" loading={loading} onClick={save}>
                <Translation lang={settings.language} value="Save" />
              </Button>
            </Collapse>
          </Collapse.Group>
        </main>
      </div>
    </Auth>
  );
});

export default Settings;

import { useEffect, useState } from 'react';
import { Spacer, Text, Button, Input, Card, Image } from '@geist-ui/core';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import Turnstile, { useTurnstile } from 'react-turnstile';
import { useRouter } from 'next/router';
import UserStore from 'stores/user';
import SettingsStore from 'stores/settings';
import { Translation, translation } from 'components/intl/translation';
import useSettings from 'components/settings';
import { dec, validateEmail } from 'components/api/utils';

const Verify = observer(() => {
  const settings = useSettings();
  const cookie = parseCookies();
  const router = useRouter();
  const turnstile = useTurnstile();
  const [{ verifyTurnstile }] = useState(() => new SettingsStore());
  const [code, setCode] = useState('');
  const [ask, setAsk] = useState(false);
  const [show, showButton] = useState(false);
  const [email, setEmail] = useState('');
  const [_code, _setCode] = useState<{ data?: string; code?: number }>({});

  const [{ loading, getUser, updateUser, verifyAccount }] = useState(
    () => new UserStore()
  );

  useEffect(() => {
    let _code: any = cookie && cookie._w_code ? cookie._w_code : null;
    _setCode(_code);
  }, []);

  const getCode = async () => {
    if (validateEmail(email) === false) {
      toast.error('Please use valid email address!');
    } else {
      await verifyAccount({ email }).then((res) => {
        if (res.success) {
          setCookie(null, '_w_code', res.token, {
            maxAge: 2 * 60 * 60,
            path: '/'
          });
          toast.success(
            translation({
              lang: settings?.language,
              value: 'Verification code sent to your email!'
            })
          );
          setCode('');
          setAsk(false);
        } else {
          toast.error(
            translation({ lang: settings?.language, value: res.message })
          );
        }
      });
    }
  };

  const verify = async () => {
    let token: any = _code;
    try {
      token = dec(token);
      token = JSON.parse(token);
      if (Number(code) !== Number(token?.code)) {
        toast.error(
          translation({
            lang: settings?.language,
            value: 'Code is incorrect or expired.'
          })
        );
      } else {
        await getUser(token?.id).then(async (res: any) => {
          if (res.success) {
            await updateUser({ id: token?.id, status: 'active' });
            destroyCookie({}, '_w_code');
            const { name, id, role, photo, username } = res.data;
            setCookie(
              null,
              '_w_auth',
              JSON.stringify({ name, id, role, photo, username }),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
              }
            );

            toast.success(
              translation({
                lang: settings?.language,
                value: 'Account verified successfully!'
              })
            );
            router.push('/');
          } else {
            toast.error(
              translation({
                lang: settings?.language,
                value: 'Unable to verify user. Please try again later.'
              })
            );
          }
        });
      }
    } catch (error) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Unable to verify user. Please try again later.'
        })
      );
    }
  };

  return (
    <div className="polkadot">
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Account verification'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Account verification'
        })}
        hide
      />
      <Toaster />
      <div>
        <div className="page-container top-100">
          <div className="boxed">
            <div className="logo-container center">
              {settings.siteLogo ? (
                <Image src={`/static/${settings.siteLogo}`} height={'65px'} />
              ) : (
                <Text h2 width={'100%'}>
                  {settings.siteName}
                </Text>
              )}
            </div>

            <Card shadow width="100%">
              <Text h3>
                <Translation
                  lang={settings?.language}
                  value="Account verification"
                />
              </Text>
              <Spacer h={2} />
              {ask ? (
                <div>
                  <Input
                    htmlType="email"
                    className="uppercase"
                    width="100%"
                    scale={4 / 3}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <Translation
                      lang={settings?.language}
                      value="Email address"
                    />
                  </Input>
                  <Spacer h={1.5} />
                  <div className="center">
                    <Turnstile
                      sitekey={settings?.cloudflarePublicKey}
                      onVerify={(token) => {
                        verifyTurnstile({ token }).then((res: any) => {
                          if (res.success) {
                            showButton(true);
                          } else {
                            turnstile.reset();
                          }
                        });
                      }}
                    />
                    <Spacer />
                  </div>
                  {show && (
                    <Button
                      scale={1.2}
                      shadow
                      type="secondary-light"
                      width="100%"
                      loading={loading}
                      onClick={() => {
                        email ? getCode() : null;
                      }}
                    >
                      <b>Get verification code</b>
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Input
                    className="uppercase"
                    width="100%"
                    scale={4 / 3}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  >
                    <Translation
                      lang={settings?.language}
                      value="Enter code sent to your email"
                    />
                  </Input>
                  <Spacer h={1.5} />
                  <Button shadow type="secondary" width="100%" onClick={verify}>
                    <Translation lang={settings?.language} value="Continue" />{' '}
                    &nbsp;&rarr;
                  </Button>
                  <Text>
                    Expired code?{' '}
                    <b className="pointer" onClick={() => setAsk(true)}>
                      Get a new code
                    </b>
                  </Text>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Verify;

import { useState, useEffect } from 'react';
import {
  Spacer,
  Text,
  Link,
  Button,
  Input,
  Card,
  Loading,
  Image,
  Tooltip,
  Divider
} from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { setCookie } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { CheckInCircle, CheckInCircleFill, XCircleFill } from '@geist-ui/icons';
import Turnstile, { useTurnstile } from 'react-turnstile';
import Navbar from 'components/Navbar';
import UserStore from 'stores/user';
import useToken from 'components/Token';
import { validateEmail } from 'components/api/utils';
import Router from 'next/router';
import SettingsStore from 'stores/settings';
import { Translation, useTranslation } from 'components/intl/Translation';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

const Signup = observer(() => {
  const token = useToken();
  const [status, setStatus] = useState('');
  const [show, showButton] = useState(false);
  const turnstile = useTurnstile();
  const [{ settings, getSettings, verifyTurnstile }] = useState(
    () => new SettingsStore()
  );
  const [
    { loading, user, setUser, getUser, signup, checkUsername, updateUser }
  ] = useState(() => new UserStore());

  useEffect(() => {
    getSettings();
  }, [token]);

  const processUsername = (val: string) => {
    if (val.length) {
      val = val.trim();
      setUser({ ...user, username: val });
      setStatus('loading');
      setTimeout(async () => {
        await checkUsername(val).then((res: any) => {
          if (res?.success) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        });
      }, 2000);
    } else {
      setStatus('error');
    }
  };

  const save = async () => {
    const { name, email, username, password } = user;
    if (!name || name?.length < 3) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Fullname is too short.'
        })
      );
    } else if (!username || username?.length < 3) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Username is too short. Minimum character is three.'
        })
      );
    } else if (validateEmail(email) === false) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Invalid email address'
        })
      );
    } else if (!password || password?.length < 3) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Password is too short. Minimum character is six.'
        })
      );
    } else {
      await signup(user).then((res: any) => {
        if (res.success) {
          setCookie(
            null,
            '_w_code',
            JSON.stringify({ type: 'signup', code: res.code, data: res.data }),
            {
              maxAge: 2 * 60 * 60,
              path: '/'
            }
          );
          toast.success(
            useTranslation({
              lang: settings?.language,
              value:
                'Account created successfully! Please verify account to continue.'
            })
          );
          Router.push('/signup/verify');
        } else {
          toast.error(
            useTranslation({
              lang: settings?.language,
              value: res.message
            })
          );
        }
      });
    }
  };

  const googleAuth = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (tokenResponse) => {
      console.log('Login Success:', tokenResponse);

      // Use the access token to fetch user info
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`
            }
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await userInfoResponse.json();
        console.log('User Info:', userInfo);
        // You can now store the user info in your app's state or send it to your backend
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }
  });

  return (
    <div>
      <Navbar
        title={useTranslation({ lang: settings?.language, value: 'Signup' })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Signup'
        })}
        hide
      />
      <Toaster />
      <div className="polkadot">
        <div className="page-container top-30">
          <div className="boxed">
            <div className="logo-container center">
              {settings.siteLogo ? (
                <Image src={`/storage/${settings.siteLogo}`} height={'65px'} />
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
                  value="Create your account"
                />
              </Text>
              <Spacer h={1} />
              <FacebookLogin
                appId={settings?.socialAccount?.facebook}
                onSuccess={(response) => {
                  console.log('Login Success!', response);
                }}
                onFail={(error) => {
                  console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                  console.log('Get Profile Success!', response);
                }}
                render={({ onClick, logout }) => (
                  <Button
                    width="100%"
                    icon={<img src="/images/facebook.svg" height={20} />}
                  >
                    Login with Facebook
                  </Button>
                )}
              />
              <Spacer h={1} />
              {/* settings?.socialAccount?.github */}
              <GitHubLogin
                clientId={'Ov23liO9sbgK51vICdUL'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{ background: 'none', border: 'none' }}
              >
                <Button
                  auto
                  width="100%"
                  icon={<img src="/images/github.svg" height={20} />}
                >
                  Login with Github
                </Button>
              </GitHubLogin>
              <Spacer h={1} />
              <Button
                width="100%"
                icon={<img src="/images/google.svg" height={20} />}
                onClick={() => googleAuth()}
              >
                Signup using Google
              </Button>
              <Spacer h={1} />
              <Divider>Or</Divider>
              <Spacer h={1} />
              <Input
                placeholder={useTranslation({
                  lang: settings?.language,
                  value: 'Fullname'
                })}
                width="100%"
                scale={4 / 3}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
              <Spacer h={1.5} />
              <Input
                placeholder={useTranslation({
                  lang: settings?.language,
                  value: 'Username'
                })}
                width="100%"
                scale={4 / 3}
                iconClickable
                onChange={(e) => processUsername(e.target.value)}
                minLength={3}
                iconRight={
                  status === 'success' ? (
                    <Tooltip
                      placement="topEnd"
                      text={useTranslation({
                        lang: settings?.language,
                        value: 'Username is available.'
                      })}
                      type="success"
                    >
                      <CheckInCircleFill color="#0070F3" />
                    </Tooltip>
                  ) : status === 'error' ? (
                    <Tooltip
                      placement="topEnd"
                      text={useTranslation({
                        lang: settings?.language,
                        value: 'Username is not available. Try another name.'
                      })}
                      trigger="click"
                      type="error"
                    >
                      <XCircleFill color="#cb0000" />
                    </Tooltip>
                  ) : status === 'loading' ? (
                    <Loading />
                  ) : (
                    <CheckInCircle />
                  )
                }
              />
              <Spacer h={1.5} />
              <Input
                placeholder={useTranslation({
                  lang: settings?.language,
                  value: 'Email'
                })}
                width="100%"
                scale={4 / 3}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <Spacer h={1.5} />
              <Input.Password
                placeholder={useTranslation({
                  lang: settings?.language,
                  value: 'Password'
                })}
                width="100%"
                scale={4 / 3}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
              <Spacer h={1} />
              <div className="center">
                <Turnstile
                  sitekey={settings.cloudflarePublicKey}
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
              </div>
              {show && (
                <Button
                  shadow
                  type="secondary"
                  width="100%"
                  loading={loading}
                  onClick={save}
                >
                  <Translation lang={settings?.language} value="Signup" />
                </Button>
              )}
              <Spacer h={1} />
              <Text font="14px">
                <Translation
                  lang={settings?.language}
                  value="Have an account?"
                />{' '}
                &nbsp;
                <Link href="/login" color underline>
                  <Translation lang={settings?.language} value="Login here" />
                </Link>
              </Text>
            </Card>
          </div>
          <Spacer h={3} />
        </div>
      </div>
    </div>
  );
});

export default Signup;

import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Link,
  Button,
  Input,
  Card,
  Image,
  Divider
} from '@geist-ui/core';
import Turnstile, { useTurnstile } from 'react-turnstile';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import { setCookie } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Translation, translation } from 'components/intl/translation';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import UserStore from 'stores/user';
import SettingsStore from 'stores/settings';
import { Authorized } from 'components/auth';

const Login = observer(() => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [show, showButton] = useState(false);
  const turnstile = useTurnstile();
  const [{ settings, getSettings, verifyTurnstile }] = useState(
    () => new SettingsStore()
  );
  const [{ loading, user, setUser, login, loginOtp, socialConnect }] = useState(
    () => new UserStore()
  );
  const { email, password } = user;

  useEffect(() => {
    getSettings();
  }, [status, settings?.theme]);

  const signIn = async () => {
    await login({ email, password }).then((res: any) => {
      if (res.success) {
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
            value: 'Successfully signed in!'
          })
        );
        router.push('/');
      } else {
        setStatus(res.status);
        toast.error(
          translation({ lang: settings?.language, value: res.message })
        );
      }
    });
  };

  const signInOtp = async () => {
    await loginOtp({ email, password }).then((res: any) => {
      if (res.success) {
        setCookie(null, '_w_code', res.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        toast.success(
          translation({
            lang: settings?.language,
            value: 'Verification code sent to your email!'
          })
        );
        router.push('/verify');
      } else {
        setStatus(res.status);
        toast.error(
          translation({ lang: settings?.language, value: res.message })
        );
      }
    });
  };

  const socialAccount = async (body) => {
    await socialConnect(body).then((res) => {
      if (res.success) {
        const { name, id, role, photo, username, status } = res.data;
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
            value: 'Successfully signed in!'
          })
        );
        status === 'new' ? router.push('/settings') : router.push('/');
      }
    });
  };

  const googleAuth = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (tokenResponse) => {
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
          toast.error('Unable to connect to google');
        }

        const userInfo = await userInfoResponse.json();
        let body = {
          name: `${userInfo?.name}`,
          email: userInfo?.email,
          platform: 'Google'
        };

        socialAccount(body);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }
  });

  return (
    <div className="polkadot">
      <Authorized>
        <Navbar
          title={translation({ lang: settings?.language, value: 'Log In' })}
          description={translation({
            lang: settings?.language,
            value: 'Log In'
          })}
          hide
        />
        <Toaster />
        <div>
          <div className="page-container top-50">
            <div className="boxed mini">
              <div className="logo-container center">
                {settings.siteLogo ? (
                  <Image
                    alt="logo"
                    src={`/static/${settings.siteLogo}`}
                    height={'65px'}
                  />
                ) : (
                  <Text h2 width={'100%'}>
                    {settings.siteName}
                  </Text>
                )}
              </div>

              <Card width="100%">
                <Text h3>
                  <Translation
                    lang={settings?.language}
                    value="Sign into your account"
                  />
                </Text>

                {status === 'inactive' ? (
                  <Text className="error">
                    <Translation
                      lang={settings?.language}
                      value="Account is inactive."
                    />
                    <Translation lang={settings?.language} value="Click" />{' '}
                    <Link
                      href="/account/verify"
                      color
                      style={{ textDecoration: 'underline' }}
                    >
                      <Translation
                        lang={settings?.language}
                        value="Click here to verify your account."
                      />
                    </Link>{' '}
                  </Text>
                ) : (
                  ''
                )}
                <Spacer h={1} />
                {settings?.socialAccount?.facebook && (
                  <>
                    <FacebookLogin
                      appId={settings?.socialAccount?.facebook}
                      onFail={(error) => {
                        toast.error('Login Failed!');
                      }}
                      onProfileSuccess={(response) => {
                        const body = {
                          name: response.name,
                          email: response.email,
                          platform: 'Facebook'
                        };
                        socialAccount(body);
                      }}
                      render={({ onClick }) => (
                        <Button
                          onClick={onClick}
                          width="100%"
                          icon={<img src="/images/facebook.svg" height={20} />}
                        >
                          <span style={{ textTransform: 'none' }}>
                            <Translation
                              lang={settings?.language}
                              value="Login using Facebook"
                            />
                          </span>
                        </Button>
                      )}
                    />
                    <Spacer h={1} />
                  </>
                )}
                {settings?.socialAccount?.google && (
                  <>
                    <Button
                      width="100%"
                      icon={<img src="/images/google.svg" height={20} />}
                      onClick={() => googleAuth()}
                    >
                      <span style={{ textTransform: 'none' }}>
                        <Translation
                          lang={settings?.language}
                          value="Login using Google"
                        />
                      </span>
                    </Button>
                    <Spacer h={1} />
                  </>
                )}
                {(settings?.socialAccount?.facebook ||
                  settings?.socialAccount?.google) && <Divider>OR</Divider>}
                <Spacer h={1} />
                <Input
                  placeholder={translation({
                    lang: settings?.language,
                    value: 'Email or username'
                  })}
                  width="100%"
                  scale={4 / 3}
                  onChange={(e) =>
                    setUser({ ...user, ...{ email: e.target.value } })
                  }
                />
                <Spacer h={1.5} />
                <Input.Password
                  placeholder={translation({
                    lang: settings?.language,
                    value: 'Password'
                  })}
                  width="100%"
                  scale={4 / 3}
                  onChange={(e) =>
                    setUser({ ...user, ...{ password: e.target.value } })
                  }
                />
                <Spacer h={1} />

                {settings?.cloudflarePublicKey ? (
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
                ) : (
                  <Button
                    shadow
                    type="secondary"
                    width="100%"
                    loading={loading}
                    onClick={() => {
                      email && password ? signIn() : null;
                    }}
                  >
                    <Translation lang={settings?.language} value="Log In" />
                  </Button>
                )}
                {show && (
                  <Button
                    shadow
                    type="secondary"
                    width="100%"
                    loading={loading}
                    onClick={() => {
                      const initlogin = () =>
                        settings?.twoFactor ? signInOtp() : signIn();

                      email && password ? initlogin() : null;
                    }}
                  >
                    <Translation lang={settings?.language} value="Log In" />
                  </Button>
                )}
                <Spacer h={1.5} />
                <Text font={'14px'}>
                  <Translation
                    lang={settings?.language}
                    value="Forgotten Password?"
                  />
                  &nbsp;
                  <Link
                    href="/forgot"
                    color
                    underline
                    style={{ fontWeight: '500' }}
                  >
                    <Translation lang={settings?.language} value="Reset here" />{' '}
                  </Link>
                </Text>

                <Text font={'14px'}>
                  <Translation
                    lang={settings?.language}
                    value="Not a member?"
                  />
                  &nbsp;
                  <Link
                    href="/signup"
                    color
                    underline
                    style={{ fontWeight: '500' }}
                  >
                    <Translation
                      lang={settings?.language}
                      value="Signup here"
                    />
                  </Link>
                </Text>
              </Card>
              <Spacer h={4} />
            </div>
            <Spacer h={4} />
          </div>
        </div>
      </Authorized>
    </div>
  );
});

export default Login;

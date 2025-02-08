import { useEffect, useState } from 'react';
import { Spacer, Text, Button, Input, Card, Image } from '@geist-ui/core';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import { parseCookies, destroyCookie } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import UserStore from 'stores/user';
import { Translation, translation } from 'components/intl/translation';
import useSettings from 'components/settings';
import { dec } from 'components/api/utils';

const Reset = observer(() => {
  const cookie = parseCookies();
  const router = useRouter();
  const settings = useSettings();
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState('');
  const [_password, setPassword] = useState('');
  const [_code, _setCode] = useState<{ data?: string; code?: number }>({});
  const [{ loading, user, setUser, getUser, updateUser }] = useState(
    () => new UserStore()
  );

  useEffect(() => {
    let _code: any = cookie && cookie._w_code ? cookie._w_code : null;

    _setCode(_code);
  }, [router, code]);

  const verifyAccount = () => {
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
        setVerify(true);
      }
    } catch (error) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Code is incorrect or expired.'
        })
      );
    }
  };

  const updatePass = async () => {
    if (user.password !== _password) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Passwords does not matched!'
        })
      );
    } else {
      try {
        let token = dec(_code);
        token = JSON.parse(token);

        await getUser(token?.id).then(async (res: any) => {
          if (res.success) {
            await updateUser({ id: res.data.id, password: user.password });
            destroyCookie({}, '_w_code');

            toast.success(
              translation({
                lang: settings?.language,
                value: 'Password reset successfully!'
              })
            );
            router.push('/login');
          } else {
            toast.error(
              translation({
                lang: settings?.language,
                value: 'Unable to update user. Please try again later.'
              })
            );
          }
        });
      } catch (error) {
        toast.error(
          translation({
            lang: settings?.language,
            value: 'Unable to update user. Please try again later.'
          })
        );
      }
    }
  };

  return (
    <div className="polkadot">
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Account recovery'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Account recovery'
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
                  value={'Reset your password'}
                />
              </Text>
              <Spacer h={2} />
              {verify === false ? (
                <>
                  <Input
                    placeholder=""
                    width="100%"
                    scale={4 / 3}
                    onChange={(e) => setCode(e.target.value)}
                  >
                    <Translation
                      lang={settings?.language}
                      value={'Enter code sent to your email'}
                    />
                  </Input>
                  <Spacer h={1.5} />
                  <Button
                    shadow
                    type="secondary"
                    width="100%"
                    loading={loading}
                    onClick={verifyAccount}
                  >
                    <Translation lang={settings?.language} value={'Continue'} />{' '}
                    &nbsp;&rarr;
                  </Button>
                </>
              ) : (
                <>
                  <Input.Password
                    placeholder={translation({
                      lang: settings?.language,
                      value: 'New Password'
                    })}
                    width="100%"
                    scale={4 / 3}
                    onChange={(e) =>
                      setUser({ ...user, ...{ password: e.target.value } })
                    }
                  />
                  <Spacer h={1.5} />
                  <Input.Password
                    placeholder={translation({
                      lang: settings?.language,
                      value: 'Retype Password'
                    })}
                    width="100%"
                    scale={4 / 3}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Spacer h={1.5} />
                  <Button
                    shadow
                    type="secondary"
                    width="100%"
                    loading={loading}
                    onClick={updatePass}
                  >
                    <Translation
                      lang={settings?.language}
                      value={'Reset password'}
                    />
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Reset;

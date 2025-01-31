import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Button,
  Input,
  Grid,
  Card,
  Loading,
  Tooltip,
  Avatar,
  Tabs,
  Textarea,
  Popover,
  useMediaQuery
} from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { ChevronDown } from '@geist-ui/icons';
import { setCookie } from 'nookies';
import Router from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from 'components/Navbar';
import UserStore from 'stores/user';
import useToken from 'components/Token';
import { formatNumber, validateEmail } from 'components/api/utils';
import Auth from 'components/Auth';
import { Translation, useTranslation } from 'components/intl/Translation';
import useSettings from 'components/settings';

const Earnings = observer(() => {
  const isXS = useMediaQuery('mobile');
  const token = useToken();
  const settings = useSettings();
  const [status, setStatus] = useState('');
  const [_password, setPassword] = useState({
    password: '',
    newPassword: ''
  });

  const [{ loading, user, setUser, getUser, filter, setFilter }] = useState(
    () => new UserStore()
  );

  useEffect(() => {
    token.id
      ? getUser(token.id).then((res: any) => {
          if (res.success) {
            setUser(res.data);
          }
        })
      : null;
  }, [token?.id]);

  const handleFilter = (value: number) => {
    setFilter(value);
    // getUsers(value);
  };

  return (
    <Auth>
      <Navbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Account settings'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Account settings'
        })}
      />
      <Toaster />
      <div className="page-container top-100">
        <div className="boxed auto-align large">
          <div className="column auto no-gap">
            <div>
              <Text h3>Earnings</Text>
            </div>
            <div>
              <div
                className="pointer right-align"
                style={{ position: 'relative', top: 5 }}
              >
                <Popover
                  placement={isXS ? 'bottomEnd' : 'bottom'}
                  content={
                    <div className="popover-adjust min-width">
                      <Popover.Item onClick={() => handleFilter(0)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="This month"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(1)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="Last month"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(2)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="2 months ago"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(3)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="3 months ago"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(4)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="4 months ago"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(5)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="5 months ago"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(6)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="6 months ago"
                          />
                        </span>
                      </Popover.Item>
                      <Popover.Item onClick={() => handleFilter(12)}>
                        <span className="pointer">
                          <Translation
                            lang={settings?.language}
                            value="1 year ago"
                          />
                        </span>
                      </Popover.Item>
                    </div>
                  }
                >
                  <span>
                    <Translation
                      lang={settings?.language}
                      value={'This month'}
                    />
                  </span>{' '}
                  <span style={{ position: 'relative', top: 5 }}>
                    <ChevronDown size={18} />
                  </span>
                </Popover>
              </div>
            </div>
          </div>

          <Grid.Container gap={2} mb="100px">
            <Grid xs={24} lg={12}>
              <Card shadow width="100%">
                <Text h2 font={'25px'}>
                  {formatNumber(3484)}
                </Text>
                <Text b>Subscribers</Text>
              </Card>
            </Grid>
            <Grid xs={24} lg={12}>
              <Card shadow width="100%">
                <Text h2 font={'25px'}>
                  {settings?.payment?.currency} {formatNumber(3484)}
                </Text>
                <Text b>Income</Text>
              </Card>
            </Grid>
            <Grid xs={24} lg={24}>
              <Card shadow width="100%">
                <Text h2>
                  {settings?.payment?.currency} {formatNumber(2913484)}
                </Text>
                <Text b>Balance</Text>
                <Spacer inline w={4} />
                <Button type="secondary-light" scale={0.7} auto>
                  <b>Withdraw</b>
                </Button>
              </Card>
            </Grid>
          </Grid.Container>
        </div>
        {/* <Grid.Container width="100%" justify="center" mb="100px">
          <Grid xs={24} lg={12}></Grid>
        </Grid.Container> */}
      </div>
    </Auth>
  );
});

export default Earnings;

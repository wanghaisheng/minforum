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
  User,
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
import CustomIcon from 'components/data/icon/icon';

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
          <Text h3>
            <Translation lang={settings?.language} value="Subscriptions" /> (0)
          </Text>

          <div className="pointer">
            <Card shadow className="notification-card">
              <div className="notification">
                <div className="one">
                  <CustomIcon
                    name="crown"
                    size={60}
                    type="solid"
                    color="#8B00F6"
                  />
                </div>
                <div className="two">
                  <Text h4={isXS == false} h5={isXS} className="text">
                    {settings?.payment?.currency} {formatNumber(2913484)}
                  </Text>

                  <Button
                    scale={0.5}
                    auto
                    type="secondary-light"
                    style={{ marginTop: 3 }}
                  >
                    <b>Deactivate</b>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {[
            { id: 23, photo: '', name: 'John Canan', username: 'john' },
            { id: 23, photo: '', name: 'John Canan', username: 'john' },
            { id: 23, photo: '', name: 'John Canan', username: 'john' },
            { id: 23, photo: '', name: 'John Canan', username: 'john' },
            { id: 23, photo: '', name: 'John Canan', username: 'john' }
          ].map((item) => (
            <div className="pointer" key={item.id}>
              <Card shadow className="notification-card">
                <div className="notification">
                  <div className="one">
                    <Avatar
                      src={
                        item.photo
                          ? `/storage/${item.photo}`
                          : '/images/avatar.png'
                      }
                      w={2}
                      h={2}
                    />
                  </div>
                  <div className="two">
                    <Text h4={isXS == false} h5={isXS} className="text">
                      {item.name}
                      <Spacer inline />
                      <small>@{item.username}</small>
                    </Text>
                    <Text b>
                      {settings?.payment?.currency} {formatNumber(2913484)}
                    </Text>
                    <Spacer inline />
                    <Button
                      scale={0.5}
                      auto
                      ghost
                      style={{ marginTop: 3 }}
                      icon={<CustomIcon name="user-x" type="solid" />}
                    >
                      <b>Deactivate</b>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        {/* <Grid.Container width="100%" justify="center" mb="100px">
          <Grid xs={24} lg={12}></Grid>
        </Grid.Container> */}
      </div>
    </Auth>
  );
});

export default Earnings;

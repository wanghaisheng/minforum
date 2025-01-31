import { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import {
  Text,
  Popover,
  Link,
  Button,
  Grid,
  Card,
  User,
  Spacer,
  Badge,
  Image,
  Input,
  Tabs,
  Modal,
  useMediaQuery
} from '@geist-ui/core';
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  Edit,
  XCircleFill,
  Mail
} from '@geist-ui/icons';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import useToken from './Token';
import UserStore from 'stores/user';
import DiscussionStore from 'stores/discussion';
import NotificationStore from 'stores/notification';
import { Translation, useTranslation } from 'components/intl/Translation';
import MessageStore from 'stores/message';
import { oneKFormat } from './api/utils';
import useSettings from './settings';

type navbarProps = {
  title?: string;
  description?: string;
  hide?: boolean;
  startConversation?: () => void;
};

const roles = ['admin', 'moderator'];

const Navbar = observer((props: navbarProps) => {
  const settings = useSettings();
  const token = useToken();
  const router = useRouter();
  const cookie = parseCookies();
  const isXS = useMediaQuery('mobile');
  const [show, setMenu] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [announcementModal, toggleAnnouncement] = useState<any>(false);
  const [modal, toggleSearch] = useState<any>(false);
  const { title, description, hide } = props;
  const [{ unread, getUnreadNotification }] = useState(
    () => new NotificationStore()
  );
  const [{ users, setUsers, searchUsers }] = useState(() => new UserStore());
  const [{ discussions, setDiscussions, publicDiscussionSearch }] = useState(
    () => new DiscussionStore()
  );
  const [{ unread_message, getUnreadMessage }] = useState(
    () => new MessageStore()
  );

  useEffect(() => {
    token.id ? getUnreadNotification(token.id) : null;
    token.id ? getUnreadMessage(token.id) : null;
    cookie && settings?.announcementText && isNaN(Number(cookie?.isAnnounce))
      ? toggleAnnouncement(true)
      : false;

    setTimeout(() => {
      setLoaded(false);
    }, 1000);
  }, [token]);

  const getFirstName = (name: string) => {
    let first: any = name.split(' ');
    return first[0];
  };

  const handleAnnouncement = (accept: boolean) => {
    setCookie(null, 'isAnnounce', `1`, {
      path: '/'
    });

    toggleAnnouncement(false);

    if (accept) {
      window.location.href = settings?.announcementLink;
    }
  };

  const handleSearch = async (val: string) => {
    val = val.trim();
    if (val.length) {
      val = val.replace('@', '');
      await publicDiscussionSearch(val);
      await searchUsers(val);
    } else {
      setDiscussions([]);
      setUsers([]);
    }
  };

  const logout = () => {
    destroyCookie(null, '_w_auth');
    router.push('/login');
  };

  const menu = () => (
    <div>
      <Popover.Item>
        <NextLink href={`/u/${token.username}`}>
          <Link href={`/u/${token.username}`}>
            <Translation lang={settings?.language} value="Profile" />
          </Link>
        </NextLink>
      </Popover.Item>
      <Popover.Item line />
      {roles.includes(token.role) ? (
        <>
          <Popover.Item>
            <NextLink href="/admin">
              <Link href="/admin">
                <Translation lang={settings?.language} value="Admin" />
              </Link>
            </NextLink>
          </Popover.Item>
          <Popover.Item line />
        </>
      ) : (
        ''
      )}
      <Popover.Item>
        <NextLink href="/settings">
          <Link href="/settings">
            <Translation lang={settings?.language} value="Settings" />
          </Link>
        </NextLink>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Link href="#" icon onClick={logout}>
          <Translation lang={settings?.language} value="Log out" />{' '}
          <Spacer w={0.5} inline />
        </Link>
      </Popover.Item>
    </div>
  );

  const MenuItem = () => (
    <div className="menu">
      {token.id ? (
        <div>
          <Spacer w={1} />
          <User
            className="pointer"
            src={token.photo ? `/storage/${token.photo}` : '/images/avatar.png'}
            name={getFirstName(token.name!)}
          />

          <Text p>
            <NextLink href="/start-discussion">
              <Link href="/start-discussion">
                <Translation
                  lang={settings?.language}
                  value="Start a discussion"
                />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/">
              <Link href="/">
                <Translation lang={settings?.language} value="Discussions" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/category">
              <Link href="/category">
                <Translation lang={settings?.language} value="Categories" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/members">
              <Link href="/members">
                <Translation lang={settings?.language} value="Members" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href={`/u/${token.username}`}>
              <Link href={`/u/${token.username}`}>
                <Translation lang={settings?.language} value="Profile" />
              </Link>
            </NextLink>
          </Text>
          {roles.includes(token.role) ? (
            <Text p>
              <NextLink href="/admin">
                <Link href="/admin">
                  <Translation lang={settings?.language} value="Admin" />
                </Link>
              </NextLink>
            </Text>
          ) : (
            ''
          )}
          <Text p>
            <NextLink href="/settings">
              <Link href="/settings">
                <Translation lang={settings?.language} value="Settings" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <Link href="#" icon onClick={logout}>
              <Translation lang={settings?.language} value="Log out" />{' '}
              <Spacer w={0.5} inline />
            </Link>
          </Text>
        </div>
      ) : (
        <>
          <Text p>
            <NextLink href="/">
              <Link href="/">
                <Translation lang={settings?.language} value="Discussions" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/category">
              <Link href="/category">
                <Translation lang={settings?.language} value="Categories" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/members">
              <Link href="/members">
                <Translation lang={settings?.language} value="Members" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/signup">
              <Link href="/signup">
                <Translation lang={settings?.language} value="Signup" />
              </Link>
            </NextLink>
          </Text>
          <Text p>
            <NextLink href="/login">
              <Link href="/login">
                <Translation lang={settings?.language} value="Login" />
              </Link>
            </NextLink>
          </Text>
        </>
      )}
    </div>
  );

  return (
    <>
      {loaded ? (
        <div className="custom-modal loaded">
          <div className="inner"></div>
        </div>
      ) : (
        <div className="navbar">
          <Head>
            <meta
              name="description"
              content={`${description} - ${settings.siteName}`}
            />
            <title>{title}</title>
            <link rel="icon" href={`/storage/${settings.siteFavicon}`} />
          </Head>

          <Modal
            disableBackdropClick
            visible={announcementModal}
            onClose={() => toggleAnnouncement(!announcementModal)}
          >
            <h3>Announcement</h3>
            <Modal.Content>
              <div
                dangerouslySetInnerHTML={{ __html: settings?.announcementText }}
              />
              <Spacer h={3} />
              <Grid.Container gap={1} justify="center">
                <Grid xs={12}>
                  <Button
                    width={'100%'}
                    onClick={() => handleAnnouncement(false)}
                  >
                    <b>Ignore</b>
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <Button
                    width={'100%'}
                    type="secondary-light"
                    onClick={() => handleAnnouncement(true)}
                  >
                    <b>Ok</b>
                  </Button>
                </Grid>
              </Grid.Container>
            </Modal.Content>
          </Modal>

          {modal ? (
            <div className="custom-modal">
              <span className="close" onClick={() => toggleSearch(!modal)}>
                <XCircleFill size={30} />
              </span>
              <div className="inner">
                <Spacer h={3} />
                <Input
                  scale={4 / 3}
                  width="100%"
                  iconRight={<Search />}
                  placeholder={useTranslation({
                    lang: settings.language ? settings.language : '',
                    value: 'Search discussion, user, email.....'
                  })}
                  clearable
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Spacer h={3} />

                <div>
                  <Tabs initialValue="1" leftSpace="0">
                    <Tabs.Item
                      value="1"
                      label={useTranslation({
                        lang: settings?.language,
                        value: 'Discussion'
                      })}
                    >
                      {discussions.map((item) => (
                        <div key={item.id}>
                          <NextLink href={`/d/${item.slug}`}>
                            <Text h5 mb="0">
                              {item.title}
                            </Text>
                          </NextLink>
                        </div>
                      ))}
                    </Tabs.Item>
                    <Tabs.Item
                      value="2"
                      label={useTranslation({
                        lang: settings?.language,
                        value: 'User'
                      })}
                    >
                      <Spacer h={2} />
                      {users.map((item) => (
                        <div key={item.id}>
                          <NextLink href={`/u/${item.username}`}>
                            <User
                              scale={2}
                              src={`${
                                item.photo
                                  ? '/storage/' + item.photo
                                  : '/images/avatar.png'
                              }`}
                              name={
                                <h5 style={{ marginTop: 10 }}>
                                  {item.name} &nbsp;&nbsp;
                                  <Text small className="username">
                                    @{item.username}
                                  </Text>
                                </h5>
                              }
                            ></User>
                          </NextLink>
                        </div>
                      ))}
                    </Tabs.Item>
                  </Tabs>
                  <Spacer h={3} />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          <Card
            shadow
            width="100%"
            className="without-radius"
            style={{
              display: hide ? 'none' : 'inherit'
            }}
          >
            <div className="inner">
              <Grid.Container gap={0}>
                <Grid xs={token?.id ? 12 : 19} md={5}>
                  <NextLink href="/">
                    <Link href="/">
                      {settings.siteLogo ? (
                        <Image
                          className="site-logo"
                          alt={settings?.siteName}
                          src={`/storage/${settings.siteLogo}`}
                          style={{ width: 'auto', height: 30 }}
                        />
                      ) : (
                        <Text b>{settings.siteName}</Text>
                      )}
                    </Link>
                  </NextLink>
                </Grid>
                <Grid xs={0} md={12}>
                  <NextLink href="/">
                    <Link href="/">
                      <Translation
                        lang={settings?.language}
                        value="Discussions"
                      />
                    </Link>
                  </NextLink>

                  <Spacer inline />
                  <NextLink href="/category">
                    <Link href="/category">
                      <Translation
                        lang={settings?.language}
                        value="Categories"
                      />
                    </Link>
                  </NextLink>
                  <Spacer inline />
                  <NextLink href="/members">
                    <Link href="/members">
                      <Translation lang={settings?.language} value="Members" />
                    </Link>
                  </NextLink>
                </Grid>
                <Grid xs={token?.id ? 12 : 5} md={0}>
                  <span
                    className="pointer"
                    onClick={() => toggleSearch(!modal)}
                  >
                    <Search />
                  </span>
                  {token?.id && (
                    <>
                      <Spacer w={isXS ? 5 : 3} inline />
                      {token.id ? (
                        <Badge.Anchor>
                          {unread_message ? (
                            <Badge type="error" scale={0.5}>
                              {oneKFormat(unread_message)}
                            </Badge>
                          ) : (
                            ''
                          )}
                          <NextLink href="/messages">
                            <Link href="/messages">
                              <Mail />
                            </Link>
                          </NextLink>
                        </Badge.Anchor>
                      ) : (
                        ''
                      )}
                      <Spacer w={isXS ? 5 : 3} inline />
                      {token.id ? (
                        <Badge.Anchor>
                          {unread ? (
                            <Badge type="error" scale={0.5}>
                              {unread}
                            </Badge>
                          ) : (
                            ''
                          )}
                          <NextLink href="/notifications">
                            <Link href="/notifications">
                              <Bell />
                            </Link>
                          </NextLink>
                        </Badge.Anchor>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                  {token?.id ? (
                    <Spacer w={isXS ? 5 : 3} inline />
                  ) : (
                    <Spacer w={3} inline />
                  )}
                  <span className="pointer" onClick={() => setMenu(!show)}>
                    <Menu />
                  </span>
                </Grid>

                <Grid xs={0} md={7}>
                  {token.id ? (
                    <>
                      <span
                        className="pointer"
                        onClick={() => toggleSearch(!modal)}
                      >
                        <Search />
                      </span>
                      <Spacer w={1.5} inline />
                      <NextLink href="/start-discussion">
                        <Link href="/start-discussion">
                          <Edit />
                        </Link>
                      </NextLink>

                      <Spacer w={1.5} inline />
                      <Badge.Anchor>
                        {unread_message ? (
                          <Badge type="error" scale={0.5}>
                            {oneKFormat(unread_message)}
                          </Badge>
                        ) : (
                          ''
                        )}
                        <NextLink href="/messages">
                          <Link href="/messages">
                            <Mail />
                          </Link>
                        </NextLink>
                      </Badge.Anchor>
                      <Spacer w={1.5} inline />
                      <Badge.Anchor>
                        {unread ? (
                          <Badge type="error" scale={0.5}>
                            {unread}
                          </Badge>
                        ) : (
                          ''
                        )}
                        <NextLink href="/notifications">
                          <Link href="/notifications">
                            <Bell />
                          </Link>
                        </NextLink>
                      </Badge.Anchor>
                      <Spacer w={1.5} inline />
                      <Popover offset={0} content={menu}>
                        <User
                          className="pointer"
                          src={
                            token.photo
                              ? `/storage/${token.photo}`
                              : '/images/avatar.png'
                          }
                          name={getFirstName(token.name!)}
                        />
                        <ChevronDown size={16} className="caret" />
                      </Popover>
                    </>
                  ) : (
                    <>
                      <Spacer w={4} inline />
                      <span
                        className="pointer"
                        onClick={() => toggleSearch(!modal)}
                      >
                        <Search />
                      </span>
                      <Spacer w={2} inline />
                      <NextLink href="/signup">
                        <Link href="/signup">
                          <Translation
                            lang={settings?.language}
                            value="Signup"
                          />
                        </Link>
                      </NextLink>
                      <Spacer w={2} inline />
                      <NextLink href="/login">
                        <Link href="/login">
                          <Translation
                            lang={settings?.language}
                            value="Login"
                          />
                        </Link>
                      </NextLink>
                    </>
                  )}
                </Grid>
              </Grid.Container>
            </div>
          </Card>
          {show ? <MenuItem /> : ''}
        </div>
      )}
    </>
  );
});

export default Navbar;

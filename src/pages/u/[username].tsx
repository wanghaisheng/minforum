import { useEffect, useState } from 'react';
import {
  Text,
  Pagination,
  Avatar,
  Spacer,
  Card,
  Loading,
  Button,
  useMediaQuery
} from '@geist-ui/core';
import { format } from 'date-fns';
import { setCookie } from 'nookies';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import {
  ChevronRightCircle,
  ChevronLeftCircle,
  MessageCircle,
  UserPlus
} from '@geist-ui/icons';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/Navbar';
import UserStore from 'stores/user';
import { useRouter } from 'next/router';
import MinimalPost from 'components/MinimalPost';
import SettingsStore from 'stores/settings';
import { pluralize, formatNumber } from 'components/api/utils';
import DiscussionStore from 'stores/discussion';
import { Translation } from 'components/intl/Translation';
import useToken from 'components/Token';
import MessageStore from 'stores/message';

const User = observer(() => {
  const token = useToken();
  const router = useRouter();
  const isXS = useMediaQuery('mobile');
  const { username } = router.query;
  const [id, setId] = useState('');
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [{ user, getUsername }] = useState(() => new UserStore());
  const [{ channel, getChannel }] = useState(() => new MessageStore());
  const [
    { loading, total, page, limit, discussions, setPage, getDiscussionsByUser }
  ] = useState(() => new DiscussionStore());

  useEffect(() => {
    getSettings();
    router.isReady
      ? getUsername(username as string).then((id) => {
          if (id) {
            setId(id);
            getDiscussionsByUser(id);
            id && getChannel(token?.id, id);
          }
        })
      : null;
  }, [router, token?.id, channel]);

  const lang = settings.language;
  const renderDate = (value: any) => {
    const date: any = value
      ? format(new Date(value), 'MMM d, yyyy', {
          locale:
            lang === 'es'
              ? es
              : lang === 'fr'
                ? fr
                : lang === 'en'
                  ? enUS
                  : lang === 'ru'
                    ? ru
                    : lang === 'de'
                      ? de
                      : lang === 'cn'
                        ? zhCN
                        : lang === 'jp'
                          ? ja
                          : lang === 'ko'
                            ? ko
                            : null
        })
      : '';
    return <span className="locale-time">{date}</span>;
  };

  const paginate = (val: number) => {
    setPage(val);
    getDiscussionsByUser(id);
  };

  const handleMessage = () => {
    let data = JSON.stringify({
      id: user?.id,
      name: user?.name,
      username: username,
      photo: user?.photo,
      channel: channel
    });

    setCookie(null, '_msg_init', data, {
      path: '/'
    });
    let pref = isXS ? '?mobile=true' : '';
    router.push(`/messages/${channel}${pref}`);
  };

  return (
    <div>
      <Navbar title={`${user.name}`} description={`${user.name}`} />

      <div
        className="category-box"
        style={{
          background: '#2A222E'
        }}
      >
        {user.id ? (
          <div>
            <div className="desktop">
              <div className="gridlock">
                <div className="item">
                  <Avatar
                    w={3}
                    h={3}
                    src={
                      user.photo
                        ? `/storage/${user.photo}`
                        : '/images/avatar.png'
                    }
                  />
                </div>
                <div className="item">
                  <Text h3 className="capitalize">
                    {user.name}
                  </Text>
                  <Text small>
                    <Translation lang={settings?.language} value="Joined" />{' '}
                    {renderDate(user.createdAt)}
                  </Text>
                  <Spacer w={1} inline />
                  <Text small>
                    {formatNumber(user.discussion!)}{' '}
                    <Translation
                      lang={settings?.language}
                      value={`Discussion${pluralize(user.discussion!)}`}
                    />
                    <Spacer w={1} inline />
                    {formatNumber(user.point!)}{' '}
                    <span className="capitalize">
                      <Translation
                        lang={settings?.language}
                        value={`point${pluralize(user.point!)}`}
                      />
                    </span>
                  </Text>
                  <Spacer />
                  <div className="desktop">
                    {/* <Button scale={0.8} auto icon={<UserPlus />}>
                  <b>Subscribe</b>
                </Button>
                <Spacer inline /> */}
                    <Button
                      scale={0.8}
                      auto
                      icon={<MessageCircle />}
                      onClick={handleMessage}
                    >
                      <b>Message</b>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile">
              <div className="gridlock">
                <div className="item">
                  <Avatar
                    w={3}
                    h={3}
                    src={
                      user.photo
                        ? `/storage/${user.photo}`
                        : '/images/avatar.png'
                    }
                  />
                </div>
                <div className="item">
                  <Text h3 className="capitalize">
                    {user.name}
                  </Text>
                  <Text small>
                    <Translation lang={settings?.language} value="Joined" />{' '}
                    {renderDate(user.createdAt)}
                  </Text>
                  <Spacer h={1} />
                  <Text small>
                    {formatNumber(user.discussion!)}{' '}
                    <Translation
                      lang={settings?.language}
                      value={`Discussion${pluralize(user.discussion!)}`}
                    />
                    <Spacer w={1} inline />
                    {formatNumber(user.point!)}{' '}
                    <span className="capitalize">
                      <Translation
                        lang={settings?.language}
                        value={`point${pluralize(user.point!)}`}
                      />
                    </span>
                  </Text>
                  <Spacer />
                </div>
              </div>
              <div className="mobile">
                {/* <Button scale={0.8} auto icon={<UserPlus />}>
                  <b>Subscribe</b>
                </Button>
                <Spacer inline /> */}
                <Button
                  scale={0.8}
                  auto
                  icon={<MessageCircle />}
                  onClick={handleMessage}
                >
                  <b>Message</b>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="page-container">
        <div className="discussion-container">
          <div className="item">
            {loading ? (
              <div>
                <Loading>
                  <Translation lang={settings?.language} value={`Loading`} />
                  &nbsp;
                  <Translation
                    lang={settings?.language}
                    value={`Discussions`}
                  />
                </Loading>
              </div>
            ) : (
              ''
            )}

            {discussions.map((item: any) => (
              <MinimalPost
                lang={settings?.language}
                key={item.id}
                title={item.title}
                slug={item.slug}
                category={item.category?.title}
                comment={item.comment}
                date={item.createdAt}
              />
            ))}
            {!loading && discussions.length === 0 ? (
              <div className="center">
                <Spacer h={3} />
                <Text h4 className="center">
                  <Translation
                    lang={settings?.language}
                    value={`No Discussion`}
                  />
                </Text>
              </div>
            ) : (
              ''
            )}
            <Spacer />
            {total! >= limit ? (
              <div className="pagination">
                <Pagination
                  count={Math.round(total! / limit)}
                  initialPage={page}
                  limit={limit}
                  onChange={paginate}
                >
                  <Pagination.Next>
                    <ChevronRightCircle />
                  </Pagination.Next>
                  <Pagination.Previous>
                    <ChevronLeftCircle />
                  </Pagination.Previous>
                </Pagination>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="item">
            <aside>
              <div className="sidenav">
                {settings.advert?.right ? (
                  <Card>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: settings.advert?.right!
                      }}
                    ></div>
                  </Card>
                ) : (
                  ''
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* <EditorModal show={false} /> */}
      </div>
    </div>
  );
});

export default User;

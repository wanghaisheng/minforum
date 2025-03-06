import { useEffect, useState, useCallback } from 'react';
import {
  Spacer,
  Text,
  Card,
  Loading,
  Button,
  Avatar,
  Tag
} from '@geist-ui/core';
import { formatDistance } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import NotificationStore from 'stores/notification';
import useToken from 'components/token';
import { useRouter } from 'next/router';
import Auth from 'components/auth';
import {
  Translation,
  useLikedPostTranslation,
  useLikedCommentTranslation,
  useLikedReplyTranslation,
  useRepliedCommentTranslation,
  useRepliedPostTranslation,
  translation
} from 'components/intl/translation';
import useSettings from 'components/settings';

const Notifications = observer(() => {
  const token = useToken();
  const router = useRouter();
  const settings = useSettings();
  const [
    {
      loading,
      page,
      nomore,
      notifications,
      setPage,
      getNotifications,
      markAllRead,
      markRead
    }
  ] = useState(() => new NotificationStore());

  const handleScroll = useCallback(() => {
    const offset = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - offset
    ) {
      if (nomore === false) {
        setPage(page + 1);
        getNotifications(token.id!, true);
      }
    }
  }, [nomore, page]);

  useEffect(() => {
    token.id ? getNotifications(token.id, false) : null;
  }, [token?.id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const read = async (
    id: string,
    action: string,
    type: string,
    filterType: string
  ) => {
    await markRead(id).then((res: any) => {
      if (res.success) {
        let t = type === 'user' || type === 'admin' ? '/u' : '/d';
        let link = `${t}/${action}`;
        router.push(link);
      }
    });
  };

  const readAll = async () => {
    await markAllRead(token.id!).then((res: any) => {
      if (res.success) {
        getNotifications(token.id!, true);
        router.reload();
      }
    });
  };

  const lang = settings?.language;

  const renderDate = (value: any) => {
    const date = value
      ? formatDistance(new Date(value), new Date(), {
          addSuffix: true,
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
                        : lang === 'ja'
                          ? ja
                          : lang === 'ko'
                            ? ko
                            : null
        })
      : '';
    return <span className="locale-time">{date}</span>;
  };

  const renderNotifications = (
    name: string,
    type: string,
    message?: string
  ) => {
    if (type === 'like-post') {
      return useLikedPostTranslation({
        name,
        lang: settings?.language,
        value: ''
      });
    } else if (type === 'like-comment') {
      return useLikedCommentTranslation({
        name,
        lang: settings?.language,
        value: ''
      });
    } else if (type === 'like-reply') {
      return useLikedReplyTranslation({
        name,
        lang: settings?.language,
        value: ''
      });
    } else if (type === 'reply-post') {
      return useRepliedPostTranslation({
        name,
        lang: settings?.language,
        value: ''
      });
    } else if (type === 'reply-comment') {
      return useRepliedCommentTranslation({
        name,
        lang: settings?.language,
        value: ''
      });
    } else {
      return translation({
        lang: settings?.language,
        value: message
      });
    }
  };

  const notification = notifications.map((item, index) => (
    <div
      className="pointer"
      key={item.id + index}
      onClick={() => read(item.id!, item.action!, item.type!, item.filterType!)}
    >
      <Card
        shadow
        className={`notification-card ${item.read ? 'greyed' : 'white'}`}
      >
        <div className="notification">
          <div className="one">
            {item?.filterType === 'reward' ? (
              <img src={'/images/badge.png'} />
            ) : item?.filterType === 'post-violation' ? (
              <img src={'/images/shield.png'} />
            ) : (
              <Avatar
                src={
                  item.profile && item.profile.photo
                    ? `/static/${item.profile.photo}`
                    : '/images/avatar.png'
                }
                w={2}
                h={2}
              />
            )}
          </div>
          <div className="two">
            {item.tag && (
              <Tag>
                <Translation lang={settings?.language} value={'Title'} />
                :&nbsp;
                {item?.tag}
              </Tag>
            )}
            <Text p className="text">
              {item?.type === 'admin' ? (
                <Translation lang={settings?.language} value={item.message} />
              ) : item?.filterType === 'mentioned' ? (
                <>
                  {item.profile.name}{' '}
                  <Translation lang={settings?.language} value={item.message} />
                </>
              ) : (
                renderNotifications(item?.name, item?.filterType, item.message)
              )}
            </Text>

            <Text small className="date">
              {renderDate(item.createdAt)}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  ));

  return (
    <Auth>
      <Navbar
        title={translation({
          lang: settings?.language,
          value: 'Notifications'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Notifications'
        })}
        norobot
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <div className="column">
            <div>
              <Text h3>
                <Translation
                  lang={settings?.language}
                  value={'Notifications'}
                />
              </Text>
            </div>
            <div>
              <Button
                type="secondary"
                scale={0.35}
                loading={loading}
                onClick={readAll}
              >
                <Translation
                  lang={settings?.language}
                  value={'Mark all read'}
                />
              </Button>
            </div>
          </div>

          <Spacer h={2} />
          {notification}
          {loading ? (
            <Loading>
              <Translation lang={settings?.language} value={'Loading'} />
            </Loading>
          ) : (
            ''
          )}
          {!loading && notifications.length === 0 ? (
            <Text h4 className="center">
              <Translation
                lang={settings?.language}
                value={'No notification'}
              />
            </Text>
          ) : (
            ''
          )}

          <Spacer h={5} />
        </div>
      </div>
    </Auth>
  );
});

export default Notifications;

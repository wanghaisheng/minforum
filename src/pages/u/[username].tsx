import { useEffect, useState, useCallback } from 'react';
import {
  Text,
  Avatar,
  Spacer,
  Card,
  Loading,
  Button,
  useMediaQuery,
  Tabs
} from '@geist-ui/core';
import { format } from 'date-fns';
import { setCookie } from 'nookies';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { MessageCircle } from '@geist-ui/icons';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/Navbar';
import UserStore from 'stores/user';
import { useRouter } from 'next/router';
import MinimalPost from 'components/MinimalPost';
import { pluralize, oneKFormat } from 'components/api/utils';
import DiscussionStore from 'stores/discussion';
import { Translation } from 'components/intl/Translation';
import useToken from 'components/Token';
import MessageStore from 'stores/message';
import { LicenseIcon, Medal06Icon } from 'hugeicons-react';
import useSettings from 'components/settings';
import { Badges } from 'components/Badges';
import { doAction } from 'extensions/hooks';
import toast, { Toaster } from 'react-hot-toast';
import SubscriptionStore from 'stores/user-subscription';
import CustomIcon from 'components/data/icon/icon';

const User = observer(() => {
  const settings = useSettings();
  const token = useToken();
  const router = useRouter();
  const { username } = router.query;

  const isXS = useMediaQuery('mobile');
  const [id, setId] = useState('');
  const [modal, toggleModal] = useState(false);
  const [subscribed, setSubscribed] = useState(null);
  const [store] = useState(() => new SubscriptionStore());
  const [{ user, getUsername, profile, getProfile }] = useState(
    () => new UserStore()
  );
  const [{ channel, getChannel }] = useState(() => new MessageStore());
  const [
    { loading, page, nomore, discussions, setPage, getDiscussionsByUser }
  ] = useState(() => new DiscussionStore());

  const handleScroll = useCallback(() => {
    const offset = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - offset
    ) {
      if (nomore === false) {
        setPage(page + 1);
        getDiscussionsByUser(id, true);
      }
    }
  }, [discussions, nomore, page]);

  useEffect(() => {
    token?.id && getProfile(token?.id);

    router.isReady
      ? getUsername(username as string).then(async (id) => {
          if (id) {
            setId(id);
            const sub = await store.getSubscription(user?.id, token?.id);
            setSubscribed(sub);
            getDiscussionsByUser(id, false);
            id && getChannel(token?.id, id);
          }
        })
      : null;
  }, [router, token?.id, channel]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handlePayment = async (referenceId) => {
    await store
      .newSubscription({
        plan: user?.id,
        beneficiary: user?.id,
        amount: user?.subAmount,
        userId: token?.id,
        provider: doAction('provider'),
        narration: `Monthly subscription to @${user?.username} contents.`,
        referenceId
      })
      .then((res) => {
        if (res.success) {
          toggleModal(false);
          toast.success('Subscption successful!');
          router.reload();
        } else {
          toast.error('Subscption failed');
        }
      });
    toggleModal(false);
  };

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

  const modals = doAction('paymentModal', {
    show: modal,
    title: `Access premium content`,
    reason: profile?.subDescription || '',
    amount: user?.subAmount || 0,
    currency: settings?.payment?.currency,
    email: profile?.email,
    toggleModal: () => toggleModal(!modal),
    processPayment: handlePayment
  });

  const PaymentModal = () => {
    return <div>{modals}</div>;
  };

  return (
    <div>
      <Toaster />
      <PaymentModal />
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
                    w={5}
                    h={5}
                    src={
                      user.photo
                        ? `/storage/${user.photo}`
                        : '/images/avatar.png'
                    }
                  />{' '}
                </div>
                <div className="item">
                  <div
                    className="capitalize"
                    style={{ fontWeight: '700', fontSize: 25, marginBottom: 2 }}
                  >
                    {user.name}
                  </div>
                  <div style={{ marginBottom: 5 }}>
                    <Badges
                      language={lang}
                      position={isXS ? 'top' : 'bottom'}
                      awards={[user.role, ...user.badges]}
                    />
                  </div>
                  <Text small>
                    <Translation lang={settings?.language} value="Joined" />{' '}
                    {renderDate(user.createdAt)}
                  </Text>
                  <Spacer w={1} inline />
                  <Text small className="lowercase">
                    <span className="icon-fit">
                      <LicenseIcon size={14} />
                    </span>
                    {oneKFormat(user.discussion!)}{' '}
                    <Translation
                      lang={settings?.language}
                      value={`Discussion${pluralize(user.discussion!)}`}
                    />
                    <Spacer w={1} inline />
                    <span className="icon-fit">
                      <Medal06Icon size={14} />
                    </span>
                    {oneKFormat(user.point!)}{' '}
                    <span>
                      <Translation
                        lang={settings?.language}
                        value={`point${pluralize(user.point!)}`}
                      />
                    </span>
                  </Text>
                  <Spacer />
                  <div className="desktop">
                    {settings?.payment?.currency &&
                    settings?.payment?.percentage &&
                    settings?.payment?.subscription &&
                    user?.subAmount &&
                    token?.id &&
                    token?.id !== user?.id ? (
                      <>
                        <Button
                          scale={0.8}
                          auto
                          icon={
                            subscribed ? (
                              <CustomIcon
                                name="user-check"
                                color="#fff"
                                type="solid"
                              />
                            ) : (
                              <CustomIcon
                                name="crown"
                                color="#fff"
                                type="solid"
                              />
                            )
                          }
                          onClick={() => {
                            subscribed ? null : toggleModal(true);
                          }}
                          style={{
                            backgroundColor: '#8B00F6',
                            borderColor: '#8B00F6',
                            color: '#fff'
                          }}
                        >
                          <b>
                            <Translation
                              lang={settings?.language}
                              value={subscribed ? 'Subscribed' : 'Subscribe'}
                            />
                          </b>
                        </Button>
                        <Spacer inline />{' '}
                      </>
                    ) : (
                      ''
                    )}
                    {token?.id && token?.id !== user?.id && (
                      <Button
                        scale={0.8}
                        auto
                        icon={<MessageCircle />}
                        onClick={handleMessage}
                      >
                        <b>
                          <Translation
                            lang={settings?.language}
                            value="Message"
                          />
                        </b>
                      </Button>
                    )}
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
                  <Text small className="lowercase">
                    <span className="icon-fit">
                      <LicenseIcon size={14} />
                    </span>
                    {oneKFormat(user.discussion!)}{' '}
                    <Translation
                      lang={settings?.language}
                      value={`Discussion${pluralize(user.discussion!)}`}
                    />
                    <Spacer w={1} inline />
                    <span className="icon-fit">
                      <Medal06Icon size={14} />
                    </span>
                    {oneKFormat(user.point!)}{' '}
                    <span>
                      <Translation
                        lang={settings?.language}
                        value={`point${pluralize(user.point!)}`}
                      />
                    </span>
                  </Text>
                  <div>
                    <Badges
                      language={lang}
                      position={isXS ? 'top' : 'bottom'}
                      awards={[user.role, ...user.badges]}
                    />
                  </div>
                </div>
              </div>
              <Spacer />
              <div className="mobile">
                {settings?.payment?.currency &&
                settings?.payment?.percentage &&
                settings?.payment?.subscription &&
                user?.subAmount &&
                token?.id &&
                token?.id !== user?.id ? (
                  <>
                    <Button
                      scale={0.8}
                      auto
                      icon={
                        subscribed ? (
                          <CustomIcon
                            name="user-check"
                            color="#fff"
                            type="solid"
                          />
                        ) : (
                          <CustomIcon name="crown" color="#fff" type="solid" />
                        )
                      }
                      onClick={() => {
                        subscribed ? null : toggleModal(true);
                      }}
                      style={{
                        backgroundColor: '#8B00F6',
                        borderColor: '#8B00F6',
                        color: '#fff'
                      }}
                    >
                      <b>
                        <Translation
                          lang={settings?.language}
                          value={subscribed ? 'Subscribed' : 'Subscribe'}
                        />
                      </b>
                    </Button>
                    <Spacer inline />{' '}
                  </>
                ) : (
                  ''
                )}

                {token?.id && token?.id !== user?.id && (
                  <Button
                    scale={0.8}
                    auto
                    icon={<MessageCircle />}
                    onClick={handleMessage}
                  >
                    <b>
                      <Translation lang={settings?.language} value="Message" />
                    </b>
                  </Button>
                )}
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
                color={item.category?.color}
                comment={item.comment}
                view={item.view}
                premium={item.premium}
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
        <Spacer h={5} />
      </div>
    </div>
  );
});

export default User;

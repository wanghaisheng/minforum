import { useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import { Spacer, Button, Card, Link, Loading } from '@geist-ui/core';
import { Toaster } from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/Navbar';
import Post from 'components/Post';
import Sidebar from 'components/Sidebar';
import useToken from 'components/Token';
import SettingsStore from 'stores/settings';
import DiscussionStore from 'stores/discussion';
import Contributors from 'components/Contributors';
import AdminVerify from 'components/admin/AdminVerify';
import { Translation } from 'components/intl/Translation';
import isSetup from 'components/Setup';

const Home = observer(() => {
  const token = useToken();
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [{ loading, page, nomore, discussions, setPage, getDiscussions }] =
    useState(() => new DiscussionStore());
  const [modal, toggleModal] = useState(false);

  useEffect(() => {
    isSetup();
    getSettings();
    getDiscussions(false);
  }, [token]);

  const handleScroll = useCallback(() => {
    const offset = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - offset
    ) {
      if (nomore === false) {
        setPage(page + 1);
        getDiscussions(true);
      }
    }
  }, [discussions, nomore, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const removeBanWords = (data: string) => {
    let banWords: any = settings && settings.banWords ? settings.banWords : '';
    banWords = banWords.replace(/\s/gi, '');
    banWords = banWords.split(',');

    data
      ? banWords.forEach((item: string) => {
          let regEx: any = `${item}`;
          regEx = new RegExp(regEx, 'gi');
          data = data.replace(regEx, '*****');
        })
      : '';

    return data;
  };

  return (
    <AdminVerify>
      <Navbar
        title={settings.siteName}
        description={settings.siteDescription}
        startConversation={() => toggleModal(!modal)}
      />
      <Toaster />
      <div className="page-container top-100">
        <Sidebar
          active="home"
          button={
            <NextLink href={'/start-discussion'}>
              <Button type="secondary" style={{ textTransform: 'unset' }}>
                <Translation
                  lang={settings?.language}
                  value="Start a discussion"
                />
              </Button>
            </NextLink>
          }
          advert={
            settings.advert?.left ? (
              <Card>
                <div
                  dangerouslySetInnerHTML={{ __html: settings.advert?.left! }}
                ></div>
              </Card>
            ) : (
              ''
            )
          }
        />
        <main className="main with-right">
          <div
            style={{ marginBottom: 10 }}
            dangerouslySetInnerHTML={{ __html: settings.advert?.top! }}
          ></div>

          {token.id ? (
            <div className="mobile">
              <NextLink href={'/start-discussion'}>
                <Button type="secondary" style={{ textTransform: 'unset' }}>
                  <Translation
                    lang={settings?.language}
                    value="Start a discussion"
                  />
                </Button>
              </NextLink>
              <Spacer />
            </div>
          ) : (
            ''
          )}

          <div className="custom-tab">
            <NextLink href="/popular">
              <Link>
                <Translation lang={settings?.language} value="Popular" />
              </Link>
            </NextLink>
            <NextLink href="/">
              <Link className="active">
                <Translation lang={settings?.language} value="Recent" />
              </Link>
            </NextLink>
            <NextLink href="/category">
              <Link>
                <Translation lang={settings?.language} value="Categories" />
              </Link>
            </NextLink>
          </div>

          {discussions?.map((item) => (
            <Post
              key={item.id}
              lang={settings?.language}
              category={item.category?.title}
              slug={item.slug}
              avatar={
                item.profile && item.profile.photo
                  ? `/storage/${item.profile.photo}`
                  : '/images/avatar.png'
              }
              author={item.profile?.name}
              authorRole={item.profile?.role}
              authorUsername={item.profile?.username}
              title={removeBanWords(item.title)}
              comment={item.comment}
              date={item.createdAt}
            />
          ))}
          {loading ? (
            <div>
              <Spacer h={3} />
              <Loading>
                <Translation lang={settings?.language} value="Loading" />
                &nbsp;
                <Translation lang={settings?.language} value="Discussions" />
              </Loading>
            </div>
          ) : (
            ''
          )}
        </main>

        <aside>
          <div className="sidenav">
            <Contributors lang={settings.language} />
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
    </AdminVerify>
  );
});

export default Home;

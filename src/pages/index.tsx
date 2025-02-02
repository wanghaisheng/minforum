import { useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import { Spacer, Button, Card, Link, Loading } from '@geist-ui/core';
import { Toaster } from 'react-hot-toast';
import { observer } from 'mobx-react-lite';
import Navbar from 'components/navbar';
import Post from 'components/post';
import Sidebar from 'components/sidebar';
import useToken from 'components/token';
import DiscussionStore from 'stores/discussion';
import Contributors from 'components/contributors';
import AdminVerify from 'components/admin/admin-verify';
import { Translation } from 'components/intl/translation';
import isSetup from 'components/setup';
import useSettings from 'components/settings';

type pageProps = { domain: string };

const Home = observer((props: pageProps) => {
  const token = useToken();
  const settings = useSettings();
  const [{ loading, page, nomore, discussions, setPage, getDiscussions }] =
    useState(() => new DiscussionStore());
  const [modal, toggleModal] = useState(false);

  useEffect(() => {
    isSetup();
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

  //Send domain to min-forum once after installation.

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
            <NextLink href="/unanswered">
              <Link>
                <Translation lang={settings?.language} value="Unanswered" />
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
              color={item.category?.color}
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
              pinned={item.isPinned}
              premium={item.premium}
              view={item.view}
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

          {!loading && discussions.length === 0 ? (
            <div className="center">
              <Spacer h={3} />
              <p>
                <Translation
                  lang={settings?.language}
                  value={`No Discussion`}
                />
              </p>
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

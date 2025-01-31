import { useEffect, useState, useCallback } from 'react';
import { Loading, Spacer, Text, Card, Button } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from 'components/Navbar';
import Post from 'components/Post';
import Sidebar from 'components/Sidebar';
import CategoryStore from 'stores/category';
import DiscussionStore from 'stores/discussion';
import useToken from 'components/Token';
import Contributors from 'components/Contributors';
import { Translation } from 'components/intl/Translation';
import useSettings from 'components/settings';
import CustomIcon from 'components/data/icon/icon';

const Category = observer(() => {
  const token = useToken();
  const router = useRouter();
  const settings = useSettings();
  const { slug }: any = router.query;
  const [modal, toggleModal] = useState(false);
  const [{ category, getCategory }] = useState(() => new CategoryStore());
  const [
    { loading, page, nomore, discussions, setPage, getDiscussionsByCategory }
  ] = useState(() => new DiscussionStore());

  const handleScroll = useCallback(() => {
    const offset = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - offset
    ) {
      if (nomore === false) {
        setPage(page + 1);
        getDiscussionsByCategory(slug, true);
      }
    }
  }, [discussions, nomore, page]);

  useEffect(() => {
    router.isReady
      ? getCategory(slug).then(() => {
          getDiscussionsByCategory(slug, false);
        })
      : null;
  }, [router, token?.id]);

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
    <div>
      {!token.id && category && category.authRequired === true ? (
        <div className="custom-modal all">
          <div className="inner">
            <Card shadow>
              <div className="center">
                <CustomIcon name="lock-alt" size={50} type="solid" />
                <Spacer h={2} />
                <Text h4>
                  <Translation
                    lang={settings?.language}
                    value="You are required to login to access this page"
                  />
                </Text>
                <Spacer h={2} />
                <Link href="/login">
                  <Button type="secondary">
                    <b>
                      <Translation
                        lang={settings?.language}
                        value={'Sign in'}
                      />
                    </b>
                  </Button>
                </Link>
                <Spacer />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        ''
      )}
      <Navbar
        title={category.title}
        description={category.description}
        startConversation={() => toggleModal(!modal)}
      />
      <div
        className="category-box"
        style={{
          background: category.color
        }}
      >
        <Text h4 my={0} style={{ textTransform: 'uppercase' }}>
          {category.title}
        </Text>
        <Text p>{category.description}</Text>
      </div>
      <div className="page-container">
        <Sidebar
          active={category.slug!}
          button={
            <Link href={`/start-discussion?channel=${category.slug}`}>
              <Button type="secondary" style={{ textTransform: 'unset' }}>
                <Translation
                  lang={settings?.language}
                  value="Start a discussion"
                />
              </Button>
            </Link>
          }
          fluid
        />

        <main className="main with-right">
          {token.id ? (
            <div className="mobile">
              <Link href={`/start-discussion?channel=${category.slug}`}>
                <Button type="secondary" style={{ textTransform: 'unset' }}>
                  <Translation
                    lang={settings?.language}
                    value="Start a discussion"
                  />
                </Button>
              </Link>
              <Spacer />
            </div>
          ) : (
            ''
          )}

          {loading ? (
            <div>
              <Spacer h={3} />
              <Loading>
                <Translation lang={settings?.language} value="Loading" />
                &nbsp;
                <Translation lang={settings?.language} value="discussions" />
              </Loading>
            </div>
          ) : (
            ''
          )}

          {discussions.map((item) => (
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
              premium={item.premium}
              view={item.view}
              date={item.createdAt}
            />
          ))}

          {!loading && discussions.length === 0 ? (
            <div className="center">
              <Spacer h={3} />
              <Text>
                <Translation
                  lang={settings?.language}
                  value={`No Discussion`}
                />
              </Text>
            </div>
          ) : (
            ''
          )}
        </main>
        <aside>
          <div className="sidenav fluid">
            <Contributors lang={settings?.language} />
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
  );
});

export default Category;

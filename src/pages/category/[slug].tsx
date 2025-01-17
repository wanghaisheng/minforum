import { useEffect, useState } from 'react';
import {
  Loading,
  Spacer,
  Text,
  Pagination,
  Card,
  Button
} from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronRightCircle, ChevronLeftCircle, Lock } from '@geist-ui/icons';
import Navbar from 'components/Navbar';
import Post from 'components/Post';
import Sidebar from 'components/Sidebar';
import CategoryStore from 'stores/category';
import DiscussionStore from 'stores/discussion';
import useToken from 'components/Token';
import Contributors from 'components/Contributors';
import { Translation } from 'components/intl/Translation';
import useSettings from 'components/settings';

const Category = observer(() => {
  const token = useToken();
  const router = useRouter();
  const settings = useSettings();
  const { slug }: any = router.query;
  const [modal, toggleModal] = useState(false);
  const [{ category, getCategory }] = useState(() => new CategoryStore());
  const [
    {
      loading,
      page,
      total,
      limit,
      discussions,
      setPage,
      getDiscussionsByCategory
    }
  ] = useState(() => new DiscussionStore());

  useEffect(() => {
    router.isReady
      ? getCategory(slug).then(() => {
          getDiscussionsByCategory(slug);
        })
      : null;
  }, [router, token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getDiscussionsByCategory(slug);
  };

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
      <Toaster />
      {!token.id && category && category.authRequired === true ? (
        <div className="custom-modal all">
          <div className="inner">
            <Card shadow>
              <div className="center">
                <Lock size={30} />
                <Text>
                  <Translation
                    lang={settings?.language}
                    value="You are required to login to access this page"
                  />
                </Text>
                <Spacer />
                <Link href="/login">
                  <Button type="secondary">
                    <Translation lang={settings?.language} value={'Sign in'} />
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
              lang={settings?.language}
              key={item.id}
              category={item.category?.title}
              color={item.category?.color}
              slug={item.slug}
              avatar={
                item.profile && item.profile.photo
                  ? `/storage/${item.profile.photo}`
                  : '/images/avatar.png'
              }
              author={item.profile?.name}
              title={removeBanWords(item.title)}
              comment={item.comment}
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

          {total >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total / limit)}
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

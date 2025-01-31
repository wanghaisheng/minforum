import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Input,
  Select,
  Button,
  Card,
  Grid,
  useMediaQuery
} from '@geist-ui/core';
import { Lock } from '@geist-ui/icons';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';
import DiscussionStore from 'stores/discussion';
import useToken from 'components/Token';
import { useRouter } from 'next/router';
import Editor from 'components/Editor';
import CategoryStore from 'stores/category';
import { Translation, useTranslation } from 'components/intl/Translation';
import useSettings from 'components/settings';
import UserStore from 'stores/user';

const StartDiscussion = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const router = useRouter();
  const { channel } = router.query;
  const isXS = useMediaQuery('mobile');
  const [content, setContent] = useState('');
  const [{ profile, getProfile }] = useState(() => new UserStore());
  const [{ categories, getCategories }] = useState(() => new CategoryStore());
  const [{ loading, discussion, setDiscussion, newDiscussion }] = useState(
    () => new DiscussionStore()
  );

  useEffect(() => {
    token.id ? getProfile(token?.id) : null;
    getCategories();
    router.isReady
      ? setDiscussion({ ...discussion, categoryId: channel })
      : null;
  }, [token?.id, router]);

  const save = async () => {
    const { title, categoryId } = discussion;
    if (!title) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Title is too short!'
        })
      );
    } else if (!categoryId) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Please choose a category!'
        })
      );
    } else if (!content) {
      toast.error(
        useTranslation({
          lang: settings?.language,
          value: 'Content is blank.'
        })
      );
    } else {
      let data = {
        ...discussion,
        content,
        userId: token.id
      };

      await newDiscussion(data).then((res: any) => {
        if (res.success) {
          router.push(`/d/${res.data.slug}`);
        } else {
          toast.error(
            useTranslation({
              lang: settings?.language,
              value: 'Error creating post! Please try again.'
            })
          );
        }
      });
    }
  };

  return (
    <div>
      <Toaster />
      {!token.id ? (
        <div className="custom-modal all">
          <div className="inner">
            <Card shadow>
              <div className="center">
                <Lock size={30} />
                <Text>
                  <Translation
                    lang={settings?.language}
                    value={'You are required to login to access this page'}
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
        title={useTranslation({
          lang: settings?.language,
          value: 'Start a discussion'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Start a discussion'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3>
            <Translation
              lang={settings?.language}
              value={useTranslation({
                lang: settings?.language,
                value: 'Start a discussion'
              })}
            />
          </Text>
          <Spacer />
          {isXS ? (
            <div>
              <Grid.Container gap={1}>
                <Grid xs={profile?.subAmount ? 24 : 16} lg={16}>
                  <Input
                    width="100%"
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Discussion Title'
                    })}
                    value={discussion.title}
                    onChange={(e) =>
                      setDiscussion({ ...discussion, title: e.target.value })
                    }
                  ></Input>
                </Grid>
                <Grid xs={profile?.subAmount ? 12 : 8} lg={16}>
                  <Select
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Choose a Category'
                    })}
                    value={discussion.categoryId}
                    onChange={(val) =>
                      setDiscussion({ ...discussion, categoryId: val })
                    }
                  >
                    {categories.map((item: any) => (
                      <Select.Option key={item.id} value={item.slug}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Grid>
                <Grid xs={profile?.subAmount ? 12 : 0} lg={8}>
                  <Select
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Free or Premium?'
                    })}
                    value={`${discussion.premium}`}
                    onChange={(val) =>
                      setDiscussion({
                        ...discussion,
                        premium: val === 'true' ? true : false
                      })
                    }
                  >
                    <Select.Option value={'false'}>
                      <Translation
                        lang={settings?.language}
                        value="For everyone"
                      />
                    </Select.Option>
                    <Select.Option value={'true'}>
                      <Translation
                        lang={settings?.language}
                        value="For my subscribers"
                      />
                    </Select.Option>
                  </Select>
                </Grid>
              </Grid.Container>
              <Spacer />
            </div>
          ) : (
            <div
              className={`discuss-grid ${profile?.subAmount && 'with-premium'}`}
            >
              <div className="item">
                <Input
                  width="100%"
                  placeholder={useTranslation({
                    lang: settings?.language,
                    value: 'Discussion Title'
                  })}
                  onChange={(e) =>
                    setDiscussion({ ...discussion, title: e.target.value })
                  }
                ></Input>
              </div>
              <div className="item">
                <Select
                  disableMatchWidth={true}
                  width={'100%'}
                  placeholder={useTranslation({
                    lang: settings?.language,
                    value: 'Choose a Category'
                  })}
                  value={discussion.categoryId}
                  onChange={(val) =>
                    setDiscussion({ ...discussion, categoryId: val })
                  }
                >
                  {categories.map((item: any) => (
                    <Select.Option key={item.id} value={item.slug}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              {profile?.subAmount && (
                <div className="item">
                  <Select
                    width={'100%'}
                    placeholder={useTranslation({
                      lang: settings?.language,
                      value: 'Free or Premium?'
                    })}
                    value={`${discussion.premium}`}
                    onChange={(val) =>
                      setDiscussion({
                        ...discussion,
                        premium: val === 'true' ? true : false
                      })
                    }
                  >
                    <Select.Option value={'false'}>
                      <Translation
                        lang={settings?.language}
                        value="For everyone"
                      />
                    </Select.Option>
                    <Select.Option value={'true'}>
                      <Translation
                        lang={settings?.language}
                        value="For my subscribers"
                      />
                    </Select.Option>
                  </Select>
                </div>
              )}
            </div>
          )}
          <Editor
            lang={settings.language}
            value={content}
            height="200px"
            placeholder={useTranslation({
              lang: settings?.language,
              value: 'Type something memorable...'
            })}
            button={
              <>
                {token.id ? (
                  <Button
                    auto
                    loading={loading}
                    type="secondary-light"
                    onClick={save}
                  >
                    <Translation lang={settings?.language} value={'Publish'} />
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button loading={loading} type="secondary-light">
                      <Translation
                        lang={settings?.language}
                        value={'Sign in to publish'}
                      />
                    </Button>
                  </Link>
                )}
              </>
            }
            onChange={(val) => setContent(val)}
          />

          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default StartDiscussion;

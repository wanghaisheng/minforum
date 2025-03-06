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
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import DiscussionStore from 'stores/discussion';
import useToken from 'components/token';
import { useRouter } from 'next/router';
import Editor from 'components/editor';
import CategoryStore from 'stores/category';
import { Translation, translation } from 'components/intl/translation';
import useSettings from 'components/settings';
import UserStore from 'stores/user';
import CustomIcon from 'components/data/icon/icon';

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
        translation({
          lang: settings?.language,
          value: 'Title is too short!'
        })
      );
    } else if (!categoryId) {
      toast.error(
        translation({
          lang: settings?.language,
          value: 'Please choose a category!'
        })
      );
    } else if (!content) {
      toast.error(
        translation({
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
            translation({
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
                <CustomIcon name="lock-alt" type="solid" size={50} />
                <Spacer h={2} />
                <Text h4>
                  <Translation
                    lang={settings?.language}
                    value={'You are required to login to access this page'}
                  />
                </Text>
                <Spacer h={2} />
                <Link href="/login">
                  <Button type="secondary-light">
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
        title={translation({
          lang: settings?.language,
          value: 'Start a discussion'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Start a discussion'
        })}
      />
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3>
            <Translation
              lang={settings?.language}
              value={translation({
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
                    placeholder={translation({
                      lang: settings?.language,
                      value: 'Discussion Title'
                    })}
                    value={discussion.title}
                    onChange={(e) =>
                      setDiscussion({ ...discussion, title: e.target.value })
                    }
                  ></Input>
                </Grid>
                <Grid xs={24} lg={16}>
                  <Select
                    placeholder={translation({
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
              </Grid.Container>
              <Spacer />
            </div>
          ) : (
            <div className={`discuss-grid`}>
              <div className="item">
                <Input
                  width="100%"
                  placeholder={translation({
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
                  placeholder={translation({
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
            </div>
          )}
          <Editor
            lang={settings.language}
            value={content}
            height="200px"
            placeholder={translation({
              lang: settings?.language,
              value: 'Type something memorable...'
            })}
            mentionButton
            showEmoji
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

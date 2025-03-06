import { useEffect, useState } from 'react';
import {
  Spacer,
  Text,
  Input,
  Select,
  Button,
  Card,
  Modal,
  Grid,
  useMediaQuery
} from '@geist-ui/core';
import { Lock, Trash2 } from '@geist-ui/icons';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from 'components/navbar';
import { observer } from 'mobx-react-lite';
import DiscussionStore from 'stores/discussion';
import useToken from 'components/token';
import { useRouter } from 'next/router';
import Editor from 'components/editor';
import CategoryStore from 'stores/category';
import UserStore from 'stores/user';
import { resProp } from 'interfaces/res';
import { Translation, translation } from 'components/intl/translation';
import useSettings from 'components/settings';
import Auth from 'components/auth';

const EditDiscussion = observer(() => {
  const token = useToken();
  const router = useRouter();
  const settings = useSettings();
  const { slug } = router.query;
  const isXS = useMediaQuery('mobile');
  const [modal, toggleModal] = useState(false);
  const [content, setContent] = useState('');
  const [{ profile, getProfile }] = useState(() => new UserStore());
  const [{ categories, getCategories }] = useState(() => new CategoryStore());
  const [
    {
      loading,
      discussion,
      setDiscussion,
      updateDiscussion,
      deleteDiscussion,
      getDiscussion
    }
  ] = useState(() => new DiscussionStore());

  useEffect(() => {
    token.id ? getProfile(token?.id) : null;
    getCategories();

    router.isReady
      ? getDiscussion(slug).then((data) => {
          setContent(data.content!);
        })
      : null;
  }, [token?.id, router]);

  const deletePost = async (id: string) => {
    await deleteDiscussion({ id }).then((res: resProp) => {
      if (res.success) {
        toast.success(res.message);
        router.push('/404');
      } else {
        toast.error(res.message);
      }
    });
  };

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
        id: discussion.id,
        title,
        content,
        categoryId,
        edited: true,
        premium: discussion.premium
      };

      await updateDiscussion(data).then((res: any) => {
        if (res.success) {
          router.push(`/d/${slug}`);
        } else {
          toast.error('Error creating post! Please try again.');
        }
      });
    }
  };

  if (discussion.id && discussion.userId !== token?.id) {
    router.push('/404');
  }

  return (
    <Auth>
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
        title={translation({
          lang: settings?.language,
          value: 'Edit discussion'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Edit discussion'
        })}
      />
      <Modal visible={modal} disableBackdropClick>
        <Modal.Title>
          <Translation lang={settings?.language} value={'Delete discussion'} />
        </Modal.Title>
        <Modal.Content>
          <p className="center">
            <Translation
              lang={settings?.language}
              value={'Are you sure you want to delete?'}
            />
          </p>
        </Modal.Content>
        <Modal.Action passive onClick={() => toggleModal(false)}>
          <Translation lang={settings?.language} value={'Cancel'} />
        </Modal.Action>
        <Modal.Action
          style={{ color: '#cb0000' }}
          loading={loading}
          onClick={() => deletePost(discussion.id)}
        >
          <Translation lang={settings?.language} value={'Yes, Delete'} />
        </Modal.Action>
      </Modal>
      <div className="page-container top-100">
        <div className="notification-container">
          <Text h3>
            <Translation lang={settings?.language} value={'Edit discussion'} />
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
                    value={discussion?.title}
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
                  value={discussion?.title}
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

          {discussion.content ? (
            <Editor
              lang={settings?.language}
              value={content}
              height="280px"
              placeholder={translation({
                lang: settings?.language,
                value: 'Type something memorable...'
              })}
              mentionButton
              showEmoji
              button={
                <>
                  {token.id ? (
                    <>
                      <Button
                        auto
                        loading={loading}
                        type="secondary-light"
                        onClick={save}
                      >
                        <Translation lang={settings?.language} value="Save" />
                      </Button>
                      <Spacer inline />
                      <Button
                        type="error"
                        auto
                        onClick={() => toggleModal(true)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Link href="/login">
                      <Button auto loading={loading} type="secondary-light">
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
          ) : (
            ''
          )}

          <Spacer h={5} />
        </div>
      </div>
    </Auth>
  );
});

export default EditDiscussion;

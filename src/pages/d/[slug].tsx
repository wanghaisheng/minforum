import { useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import {
  Text,
  Popover,
  Tooltip,
  Link,
  User,
  Avatar,
  Card,
  Button,
  ButtonDropdown,
  Spacer,
  Image,
  Loading,
  useClipboard,
  useToasts,
  useMediaQuery,
  Badge,
  Grid
} from '@geist-ui/core';
import { formatDistance } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { Eye, Heart, HeartFill, AlertTriangle } from '@geist-ui/icons';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Navbar from 'components/navbar';
import useToken from 'components/token';
import DiscussionStore from 'stores/discussion';
import { oneKFormat, parseUsername } from 'components/api/utils';
import Reply from 'components/reply';
import Recommendation from 'components/recommendation';
import ReportStore from 'stores/report';
import toast, { Toaster } from 'react-hot-toast';
import CommentModal from 'components/modals/comment-modal';
import ReplyModal from 'components/modals/reply-modal';
import CommentStore from 'stores/comment';
import LikeStore from 'stores/like';
import {
  Translation,
  translation,
  useTimeTranslation
} from 'components/intl/translation';
import useSettings from 'components/settings';
import { Paywall } from 'components/subscriber';
import CustomIcon from 'components/data/icon/icon';
import Footer from 'components/footer';

const Discussion = observer(() => {
  const token = useToken();
  const router = useRouter();
  const isXS = useMediaQuery('mobile');
  const settings = useSettings();
  const clipboard = useClipboard();
  const { setToast } = useToasts();
  const { slug }: any = router.query;
  const [modal, toggleModal] = useState(false);
  const [showReplies, showRepliesAction] = useState(false);
  const [editModal, toggleEditModal] = useState(false);
  const [reply, toggleReply] = useState<any>({
    modal: false,
    replyId: '',
    username: '',
    comment: 0
  });

  const [replyAction, toggleReplyAction] = useState<any>({
    modal: false,
    replyId: '',
    username: '',
    comment: 0
  });
  const [content, setContent] = useState('');
  const [commentId, setCommentId] = useState('');
  const [{ newReport }] = useState(() => new ReportStore());
  const [
    {
      newComment,
      newReply,
      updateComment,
      updateReply,
      deleteComment,
      deleteReply
    }
  ] = useState(() => new CommentStore());
  const [{ likeDiscussion, likeComment, likeReply }] = useState(
    () => new LikeStore()
  );
  const [
    {
      loading,
      nomore,
      page,
      commentLoading,
      discussion,
      comments,
      setPage,
      getDiscussion,
      refreshDiscussion,
      getComments,
      refreshComments,
      updateDiscussion
    }
  ] = useState(() => new DiscussionStore());
  const { profile, category } = discussion;

  const handleScroll = useCallback(() => {
    let hash: any = router.isReady ? window.location.hash : '';
    hash = hash.replace('#', '');
    const offset = 50;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - offset
    ) {
      if (nomore === false) {
        setPage(page + 1);
        getComments(discussion.id, true).then((res) => {
          res.data.length
            ? setTimeout(() => {
                scrollToDiv(hash);
              }, 1000)
            : null;
        });
      }
    }
  }, [comments, nomore, page]);

  useEffect(() => {
    let hash: any = router.isReady ? window.location.hash : '';
    hash = hash.replace('#', '');

    router.isReady
      ? getDiscussion(slug).then((data: any) => {
          if (data.id) {
            getComments(data.id, false).then((res) => {
              res.data.length
                ? setTimeout(() => {
                    scrollToDiv(hash);
                  }, 1000)
                : null;
            });
            updateDiscussion({ id: data.id, view: data.view + 1 });
          } else {
            router.push('/404');
          }
        })
      : null;
  }, [router, showReplies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const copyLink = (link: string) => {
    clipboard.copy(link);
    setToast({ text: 'Link copied.' });
  };

  const removeBanWords = (data: string) => {
    data = parseUsername(data);
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

  const toggleCommentBox = (
    replyId?: string,
    replyUsername?: string,
    commentNumber?: number
  ) => {
    toggleReply({
      ...reply,
      modal: !reply.modal,
      username: replyUsername,
      comment: commentNumber,
      replyId
    });
  };

  const report = async (discussionId: string, type: string) => {
    let t = toast.loading('Reporting....');
    await newReport({ discussionId, type, slug: discussion.slug }).then(
      (res: any) => {
        toast.dismiss(t);
        if (res.success) {
          toast.success(
            translation({
              lang: settings?.language,
              value: 'Discussion reported!'
            })
          );
        } else {
          toast.success(
            translation({
              lang: settings?.language,
              value: 'Error occured. Please try again!'
            })
          );
        }
      }
    );
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

  const reports = [
    'Inappropiate content',
    'Fraud or Spam',
    'False information',
    'Nudity',
    'Hate speech',
    'Violence',
    'Harassment',
    'Terrorism',
    'Suicide or self injury',
    'Child abuse'
  ];

  const scrollToDiv = (id: string) => {
    const divElement: any = document.getElementById(id);
    divElement ? divElement.scrollIntoView({ behavior: 'smooth' }) : null;
  };

  const saveComment = async () => {
    if (!content) {
      toast.error(translation({ lang: lang, value: 'Comment is blank!' }));
    } else {
      await newComment({
        comment: content,
        discussionId: discussion.id,
        userId: token.id
      })
        .then((res: any) => {
          if (res.success) {
            getComments(discussion.id!, false).then(() => {
              toggleModal(!modal);
              setContent('');
              setTimeout(() => {
                scrollToDiv(res.data.id);
              }, 1000);
            });
          } else {
            toast.error(
              translation({ lang: lang, value: 'Unable to save comment.' })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const saveEditComment = async () => {
    if (!content) {
      toast.error(translation({ lang: lang, value: 'Comment is blank!' }));
    } else {
      await updateComment({
        comment: content,
        id: commentId,
        edited: true
      })
        .then((res: any) => {
          if (res.success) {
            setContent('');
            getComments(discussion.id!, false).then(() => {
              toggleEditModal(false);
              setContent('');
              setTimeout(() => {
                scrollToDiv(res.data.id);
              }, 1000);
            });
          } else {
            toast.error(
              translation({ lang: lang, value: 'Unable to save comment.' })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const saveEditReply = async () => {
    if (!content) {
      toast.error(translation({ lang: lang, value: 'Comment is blank!' }));
    } else {
      await updateReply({
        comment: content,
        id: replyAction.replyId,
        edited: true
      })
        .then((res: any) => {
          if (res.success) {
            setContent('');
            getComments(discussion.id!, false).then(() => {
              toggleReplyAction({ ...replyAction, modal: false });
              setContent('');
              setTimeout(() => {
                showRepliesAction(true);
                scrollToDiv(res.data.id);
              }, 1000);
            });
          } else {
            toast.error(
              translation({ lang: lang, value: 'Unable to save comment.' })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const editComment = async (id: string, commentData: string) => {
    setCommentId(id);
    setContent(commentData);
    toggleEditModal(true);
  };

  const editReply = async (id: string, commentData: string) => {
    setContent(commentData);
    toggleReplyAction({ ...replyAction, replyId: id, modal: true });
  };

  const saveReply = async () => {
    if (!content) {
      toast.error(translation({ lang: lang, value: 'Comment is blank!' }));
    } else {
      await newReply({
        comment: content,
        discussionId: discussion.id,
        userId: token.id,
        type: 'reply',
        replyId: reply.replyId
      })
        .then((res: any) => {
          if (res.success) {
            getComments(discussion.id!, false).then(() => {
              toggleReply({
                modal: false,
                replyId: '',
                username: '',
                comment: 0
              });
              setContent('');
              setTimeout(() => {
                showRepliesAction(true);
                scrollToDiv(res.data.slug);
              }, 1000);
            });
          } else {
            toast.error(
              translation({ lang: lang, value: 'Unable to save reply.' })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const commentDeletion = async (commentId: string) => {
    await deleteComment({ id: commentId }).then((res: any) => {
      let reply = document.getElementById(commentId);
      reply.style.opacity = '0.9';
      reply.style.opacity = '0.5';
      reply.style.opacity = '0.1';
      setTimeout(() => {
        reply.style.display = 'none';

        let hash: any = router.isReady ? window.location.hash : '';
        hash = hash.replace('#', '');

        getDiscussion(slug).then((data: any) => {
          if (data.id) {
            getComments(data.id, false).then((res) => {
              res.data.length
                ? setTimeout(() => {
                    scrollToDiv(hash);
                  }, 1000)
                : null;
            });
          }
        });
      }, 2000);
    });
  };

  const replyDeletion = async (id: string) => {
    await deleteReply({ id }).then((res: any) => {
      let reply = document.getElementById(res.data);
      reply.style.opacity = '0.9';
      reply.style.opacity = '0.5';
      reply.style.opacity = '0.1';
      setTimeout(() => {
        reply.style.display = 'none';

        let hash: any = router.isReady ? window.location.hash : '';
        hash = hash.replace('#', '');

        getDiscussion(slug).then((data: any) => {
          if (data.id) {
            getComments(data.id, false).then((res) => {
              res.data.length
                ? setTimeout(() => {
                    showRepliesAction(true);
                    scrollToDiv(hash);
                  }, 1000)
                : null;
            });
          }
        });
      }, 2000);
    });
  };

  const bestAnswer = async (value: string) => {
    await updateDiscussion({
      id: discussion?.id,
      bestAnswer: value,
      status: value ? 'answered' : 'unanswered'
    }).then(() => {
      getDiscussion(slug).then((data: any) => {
        if (data.id) {
          getComments(data.id, false);
          updateDiscussion({ id: data.id, view: data.view + 1 });
        }
      });
    });
  };

  const likeDiscussionAction = async (id: string) => {
    await likeDiscussion({
      userId: token.id,
      discussionId: id
    }).then((res: any) => {
      if (res.success) {
        refreshDiscussion(slug);
      }
    });
  };

  const likeCommentAction = async (postId: string) => {
    await likeComment({
      postId,
      userId: token.id,
      discussionId: discussion.id
    }).then((res: any) => {
      if (res.success) {
        refreshComments(discussion.id!, 'comment');
      }
    });
  };

  const likeReplyAction = async (postId: string) => {
    await likeReply({
      postId,
      userId: token.id,
      discussionId: discussion.id
    }).then((res: any) => {
      if (res.success) {
        refreshComments(discussion.id!, 'comment');
      }
    });
  };

  const isActiveLiked = (data: any[]) => {
    data = data.filter((item: any) => item.userId === token.id);
    if (data.length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Toaster />
      {!token.id && category && category.authRequired === true ? (
        <div className="custom-modal all">
          <div className="inner">
            <Card shadow>
              <div className="center">
                <CustomIcon name={'lock-alt'} size={50} type="solid" />
                <Spacer h={2} />
                <Text h4>
                  <Translation
                    lang={settings?.language}
                    value={'You are required to login to access this page'}
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
        title={removeBanWords(discussion.title)}
        description={removeBanWords(discussion.title)}
      />

      {discussion?.id && (
        <Paywall
          premium={discussion?.premium}
          plan={discussion?.userId}
          username={discussion?.profile?.username}
          userId={token?.id}
          language={settings?.language}
        >
          <div className="page-container top-100">
            <div className="discussion-container">
              {loading ? (
                <Loading>
                  <Translation lang={settings?.language} value="Loading" />
                </Loading>
              ) : (
                <div className="item">
                  <div
                    style={{ marginBottom: 10, width: '100%' }}
                    dangerouslySetInnerHTML={{ __html: settings.advert?.top! }}
                  ></div>

                  {!token.id && category && category.authRequired === true ? (
                    <div className="center">
                      <Grid.Container gap={2} justify="center">
                        <Grid xs={24}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                      </Grid.Container>
                      <Grid.Container gap={2} justify="center">
                        <Grid xs={24}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                      </Grid.Container>
                      <Grid.Container gap={2} justify="center">
                        <Grid xs={24}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={12}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                        <Grid xs={6}>
                          <Card shadow width="100%" height="50px" />
                        </Grid>
                      </Grid.Container>
                    </div>
                  ) : (
                    <>
                      <Text h2 className="title">
                        {removeBanWords(discussion.title)}{' '}
                        {discussion?.isPinned && (
                          <Tooltip
                            text={translation({
                              lang,
                              value: 'Pinned post'
                            })}
                          >
                            <Badge
                              scale={0.5}
                              style={{
                                backgroundColor: '#228b22',
                                marginRight: 3
                              }}
                            >
                              <CustomIcon name={'pin'} color="#fff" size={20} />
                            </Badge>
                          </Tooltip>
                        )}
                        {discussion?.premium && (
                          <Tooltip
                            text={translation({
                              lang,
                              value: 'Premium post'
                            })}
                          >
                            <Badge
                              scale={0.5}
                              style={{ backgroundColor: '#8B00F6' }}
                            >
                              <CustomIcon
                                name={'crown'}
                                color="#fff"
                                size={20}
                              />
                            </Badge>
                          </Tooltip>
                        )}
                      </Text>
                      <div className="discuss-grid block">
                        <div className="item">
                          <NextLink href={`/category/${category?.slug}`}>
                            <Link font={'14px'}>
                              <Translation
                                lang={settings?.language}
                                value="Category"
                              />
                              :&nbsp;
                              <span style={{ color: category?.color }}>
                                {category?.title}
                              </span>
                            </Link>
                          </NextLink>{' '}
                          {token.id === discussion.userId ? (
                            <span>
                              -{' '}
                              <NextLink href={`/edit/${discussion.slug}`}>
                                <Link font={'14px'}>
                                  <Translation
                                    lang={settings?.language}
                                    value="Edit discussion"
                                  />
                                </Link>
                              </NextLink>
                            </span>
                          ) : (
                            ''
                          )}
                          {token.id ? (
                            <>
                              &nbsp; - &nbsp;
                              <Popover
                                offset={0}
                                content={
                                  <div>
                                    {reports.map((item: string, key) => (
                                      <Popover.Item key={key}>
                                        <Link
                                          href="#"
                                          onClick={() =>
                                            report(discussion.id!, item)
                                          }
                                        >
                                          {translation({
                                            lang: lang,
                                            value: item
                                          })}{' '}
                                        </Link>
                                      </Popover.Item>
                                    ))}
                                  </div>
                                }
                              >
                                <Button
                                  auto
                                  scale={0.2}
                                  type="warning"
                                  font={'13px'}
                                  iconRight={<AlertTriangle size={15} />}
                                >
                                  <Translation
                                    lang={settings?.language}
                                    value="Report"
                                  />
                                </Button>
                              </Popover>
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="item">
                          <div className="action-fix">
                            <Text span style={{ position: 'relative', top: 7 }}>
                              <Eye />
                              <span
                                style={{
                                  position: 'relative',
                                  top: -5,
                                  width: 50,
                                  paddingLeft: 5
                                }}
                              >
                                {oneKFormat(discussion.view!)}
                              </span>
                            </Text>
                            {discussion.bestAnswer && (
                              <>
                                <Spacer inline />
                                <Button
                                  auto
                                  scale={0.5}
                                  type="abort"
                                  style={{
                                    backgroundColor: '#50BA6F',
                                    color: '#fff'
                                  }}
                                  onClick={() =>
                                    scrollToDiv(discussion.bestAnswer)
                                  }
                                >
                                  <Translation
                                    lang={lang}
                                    value={'Best response'}
                                  />
                                </Button>
                              </>
                            )}
                            <Spacer inline />
                            <ButtonDropdown
                              type="secondary"
                              scale={0.5}
                              w={'50px'}
                            >
                              <ButtonDropdown.Item main>
                                <Translation
                                  lang={settings?.language}
                                  value="Share"
                                />
                              </ButtonDropdown.Item>
                              <ButtonDropdown.Item>
                                <Link
                                  target="_blank"
                                  href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}&text=${discussion.title}`}
                                >
                                  <Image src="/images/x.svg" height={'18px'} />
                                  &nbsp;&nbsp;{' '}
                                  <span
                                    style={{ position: 'relative', top: -5 }}
                                  >
                                    Tweet
                                  </span>
                                </Link>
                              </ButtonDropdown.Item>
                              <ButtonDropdown.Item>
                                <Link
                                  target="_blank"
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
                                >
                                  <Image
                                    src="/images/facebook.svg"
                                    height={'18px'}
                                  />
                                  &nbsp;&nbsp;{' '}
                                  <span
                                    style={{ position: 'relative', top: -5 }}
                                  >
                                    Share
                                  </span>
                                </Link>
                              </ButtonDropdown.Item>
                              <ButtonDropdown.Item>
                                <Link
                                  target="_blank"
                                  href={`mailto:?&subject=${discussion.title}&body=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}%0A${discussion.title}`}
                                >
                                  <Image
                                    src="/images/mail.svg"
                                    height={'18px'}
                                  />
                                  &nbsp;&nbsp;{' '}
                                  <span
                                    style={{ position: 'relative', top: -5 }}
                                  >
                                    Email
                                  </span>
                                </Link>
                              </ButtonDropdown.Item>
                              <ButtonDropdown.Item
                                onClick={() =>
                                  copyLink(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}%0A${discussion.title}`
                                  )
                                }
                              >
                                <Link href="#">
                                  <Image
                                    src="/images/copy.svg"
                                    height={'18px'}
                                  />
                                  &nbsp;&nbsp;{' '}
                                  <span
                                    style={{ position: 'relative', top: -5 }}
                                  >
                                    Copy
                                  </span>
                                </Link>
                              </ButtonDropdown.Item>
                            </ButtonDropdown>
                          </div>
                        </div>
                      </div>

                      <div className="discussion">
                        <div className="item first">
                          <Popover
                            placement="rightStart"
                            trigger="hover"
                            content={
                              <div className="popover-adjust">
                                <NextLink href={`/u/${profile?.username}`}>
                                  <Link color>
                                    <User
                                      src={
                                        profile && profile.photo
                                          ? `/static/${profile.photo}`
                                          : '/images/avatar.png'
                                      }
                                      name={profile?.name}
                                    >
                                      <Text p>
                                        <span>
                                          <Translation
                                            lang={settings?.language}
                                            value={profile?.role}
                                          />
                                        </span>
                                      </Text>
                                    </User>
                                  </Link>
                                </NextLink>
                              </div>
                            }
                          >
                            <NextLink href={`/u/${profile?.username}`}>
                              <Avatar
                                src={
                                  profile && profile.photo
                                    ? `/static/${profile.photo}`
                                    : '/images/avatar.png'
                                }
                                w={isXS ? 1.2 : 2.3}
                                h={isXS ? 1.2 : 2.3}
                                style={{ marginRight: isXS ? 5 : 0 }}
                              />
                            </NextLink>
                          </Popover>
                        </div>
                        <div className="item">
                          <Text h5>
                            <NextLink href={`/u/${profile?.username}`}>
                              <Link>{profile?.username}</Link>
                            </NextLink>
                            &nbsp;&nbsp;
                            {discussion && discussion?.edited === true && (
                              <Tooltip
                                text={useTimeTranslation({
                                  lang: lang,
                                  date: new Date(discussion?.updatedAt)
                                })}
                              >
                                <Text small style={{ color: '#555' }}>
                                  [{discussion.edited ? 'edited' : ''}]
                                  &nbsp;&nbsp;
                                </Text>
                              </Tooltip>
                            )}
                            <Text small>
                              {renderDate(discussion.createdAt)}
                            </Text>
                          </Text>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: removeBanWords(discussion.content)
                            }}
                          ></div>
                          <Tooltip
                            placement="right"
                            text={translation({
                              lang: settings?.language,
                              value:
                                'Click on the number count to who see liked.'
                            })}
                          >
                            {discussion.id ? (
                              <span
                                className="pointer"
                                onClick={() =>
                                  likeDiscussionAction(discussion.id!)
                                }
                              >
                                {isActiveLiked(discussion.likes!) ? (
                                  <HeartFill color="#cb0000" size={16} />
                                ) : (
                                  <Heart size={16} />
                                )}
                              </span>
                            ) : (
                              ''
                            )}
                            <Popover
                              placement="rightStart"
                              content={
                                <div
                                  style={{ maxHeight: 100, overflow: 'auto' }}
                                >
                                  {discussion.id
                                    ? discussion.likes!.map((item: any) => (
                                        <NextLink
                                          href={`/u/${item.profile.username}`}
                                          key={item.id}
                                        >
                                          <Link style={{ display: 'block' }}>
                                            <User
                                              src={
                                                item.profile &&
                                                item.profile.photo
                                                  ? `/static/${item.profile.photo}`
                                                  : '/images/avatar.png'
                                              }
                                              name={item.profile.name}
                                            />
                                          </Link>
                                        </NextLink>
                                      ))
                                    : ''}
                                </div>
                              }
                            >
                              <Text className="like-btn" span>
                                {discussion.id
                                  ? oneKFormat(discussion.likes!.length)
                                  : 0}
                              </Text>
                            </Popover>
                          </Tooltip>
                          <Text
                            small
                            className="reply-btn"
                            onClick={() => toggleModal(!modal)}
                          >
                            <Translation
                              lang={settings?.language}
                              value="Comment"
                            />
                          </Text>
                        </div>
                      </div>
                      <Spacer />
                      {commentLoading ? (
                        <Loading>
                          <Translation
                            lang={settings?.language}
                            value="Loading replies"
                          />
                        </Loading>
                      ) : (
                        ''
                      )}
                      {comments.map((item: any, key) => (
                        <Reply
                          lang={settings?.language}
                          key={item.slug}
                          id={item.id}
                          activeUser={token.id!}
                          userId={item.userId}
                          authorId={discussion.userId}
                          name={item.author.name}
                          username={item.author.username}
                          role={item.author.role}
                          photo={
                            item.author.photo
                              ? `/static/` + item.author.photo
                              : '/images/avatar.png'
                          }
                          replies={item.replies}
                          likes={item.likes}
                          content={item.comment}
                          bestAnswer={discussion.bestAnswer}
                          showReplies={showReplies}
                          edited={item.edited}
                          date={item.createdAt}
                          lastEdited={item.updatedAt}
                          replyTrigger={() => {
                            setContent('');
                            toggleCommentBox(
                              item.id,
                              item.author.username,
                              key + 1
                            );
                          }}
                          commentDeletion={commentDeletion}
                          replyDeletion={replyDeletion}
                          likeTrigger={() => likeCommentAction(item.id!)}
                          likeTriggerX={(val: string) => likeReplyAction(val)}
                          commentUpdateTrigger={(id: string, comment: string) =>
                            editComment(id, comment)
                          }
                          bestAnswerTrigger={bestAnswer}
                          replyUpdateTrigger={(id: string, comment: string) =>
                            editReply(id, comment)
                          }
                        />
                      ))}
                    </>
                  )}
                  <div
                    className="mobile"
                    style={{ marginBottom: 10 }}
                    dangerouslySetInnerHTML={{
                      __html: settings.advert?.inner!
                    }}
                  ></div>
                </div>
              )}
              <div className="item">
                <aside className="max">
                  <div className="sidenav max-width">
                    {discussion.id ? (
                      <Recommendation
                        lang={settings?.language}
                        title={discussion.title!}
                        category={discussion.categoryId!}
                      />
                    ) : (
                      ''
                    )}

                    {settings.advert?.right ? (
                      <div
                        style={{ marginTop: 20, width: '100%' }}
                        dangerouslySetInnerHTML={{
                          __html: settings.advert?.right!
                        }}
                      ></div>
                    ) : (
                      ''
                    )}
                    <Footer siteName={settings?.siteName} />
                    <Spacer h={4} />
                  </div>
                </aside>
              </div>
            </div>

            <Spacer h={5} />

            <CommentModal
              lang={settings.language}
              loading={commentLoading}
              content={content}
              show={modal}
              isAuthenticate={token.id ? true : false}
              toggleModal={() => toggleModal(!modal)}
              actionTrigger={setContent}
              save={saveComment}
            />

            <CommentModal
              lang={settings.language}
              loading={commentLoading}
              content={content}
              show={editModal}
              isAuthenticate={token.id ? true : false}
              toggleModal={() => toggleEditModal(!editModal)}
              actionTrigger={setContent}
              save={saveEditComment}
            />

            <ReplyModal
              lang={settings.language}
              loading={commentLoading}
              content={content}
              show={replyAction.modal}
              replyId={replyAction.replyId}
              replyUsername={replyAction.username}
              commentNumber={replyAction.comment}
              isAuthenticate={token.id ? true : false}
              toggleModal={() =>
                toggleReplyAction({ ...replyAction, modal: !replyAction.modal })
              }
              actionTrigger={setContent}
              save={saveEditReply}
            />

            <ReplyModal
              lang={settings.language}
              loading={commentLoading}
              content={content}
              show={reply.modal}
              replyId={reply.replyId}
              replyUsername={reply.username}
              commentNumber={reply.comment}
              isAuthenticate={token.id ? true : false}
              toggleModal={() => toggleReply({ ...reply, modal: !reply.modal })}
              actionTrigger={setContent}
              save={saveReply}
            />
          </div>
        </Paywall>
      )}
    </div>
  );
});

export default Discussion;

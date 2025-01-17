import {
  Text,
  Popover,
  Tooltip,
  Link,
  User,
  Avatar,
  Spacer,
  Collapse,
  useMediaQuery,
  Modal,
  Button,
  Grid
} from '@geist-ui/core';
import { Heart, HeartFill, Trash2 } from '@geist-ui/icons';
import NextLink from 'next/link';
import { formatDistance } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import {
  Translation,
  useTimeTranslation,
  useTranslation
} from './intl/Translation';
import { oneKFormat } from './api/utils';
import { PencilEdit02Icon } from 'hugeicons-react';
import { useState } from 'react';

type replyProp = {
  lang: string;
  id: string;
  activeUser: string;
  userId: string;
  name?: string;
  username?: string;
  role?: string;
  point?: number;
  photo?: string;
  content?: string;
  edited?: boolean;
  replies?: replyProp[];
  likes?: any;
  date?: Date | string;
  lastEdited?: Date | string;
  replyTrigger: () => void;
  likeTrigger: (val: string) => void;
  likeTriggerX: (val: string) => void;
  commentUpdateTrigger: (id: string, val: string) => void;
  replyUpdateTrigger: (id: string, val: string) => void;
  commentDeletion: (id: string) => void;
  replyDeletion: (id: string) => void;
};

const Reply = (props: replyProp) => {
  const isXS = useMediaQuery('mobile');
  const [commentModal, toggleCommentModal] = useState(false);
  const [replyModal, toggleReplyModal] = useState(false);
  const [replyId, setReplyId] = useState('');
  const {
    id,
    lang,
    activeUser,
    userId,
    name,
    username,
    role,
    point,
    photo,
    content,
    edited,
    replies,
    likes,
    date,
    lastEdited,
    replyTrigger,
    likeTrigger,
    likeTriggerX,
    commentUpdateTrigger,
    replyUpdateTrigger,
    commentDeletion,
    replyDeletion
  } = props;

  const handleComment = () => {
    commentDeletion(id);
    toggleCommentModal(false);
  };

  const triggerComment = () => {
    commentUpdateTrigger(id, content);
  };

  const handleReply = () => {
    replyDeletion(replyId);
    toggleReplyModal(false);
  };

  const isActiveLiked = (data: any[]) => {
    data = data.filter((item: any) => item.userId === activeUser);
    if (data.length) {
      return true;
    } else {
      return false;
    }
  };

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

  return (
    <>
      <Modal
        visible={commentModal}
        disableBackdropClick
        onClose={() => toggleCommentModal(false)}
      >
        <Modal.Content>
          <p style={{ marginTop: -10 }}>
            <b>
              <Translation
                lang={lang}
                value="⚠️ Warning: Deleting this comment will also delete all its replies. This action cannot be undone. Are you sure you want to proceed?"
              />
            </b>
          </p>
          <Spacer h={3} />
          <Grid.Container gap={2}>
            <Grid xs={12} lg={12}>
              <Button width="100%" onClick={() => toggleCommentModal(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid xs={12} lg={12}>
              <Button width="100%" type="error-light" onClick={handleComment}>
                Yes, Delete
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Content>
      </Modal>

      <Modal
        visible={replyModal}
        disableBackdropClick
        onClose={() => toggleReplyModal(false)}
      >
        <Modal.Content>
          <p style={{ marginTop: -10 }}>
            <b>
              <Translation
                lang={lang}
                value="⚠️ Warning: This action cannot be undone. Are you sure you want to delete this reply?"
              />
            </b>
          </p>
          <Spacer h={3} />
          <Grid.Container gap={2}>
            <Grid xs={12} lg={12}>
              <Button width="100%" onClick={() => toggleReplyModal(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid xs={12} lg={12}>
              <Button
                width="100%"
                type="error-light"
                onClick={() => handleReply()}
              >
                Yes, Delete
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Content>
      </Modal>

      <div className="discussion" id={id}>
        <div className="item first">
          <Popover
            trigger="hover"
            content={
              <div style={{ padding: '0 10px' }}>
                <Link color href={`/u/${username}`}>
                  <User src={photo} name={name}>
                    <Text p>{role}</Text>
                  </User>
                </Link>
              </div>
            }
          >
            <Avatar src={photo} w={isXS ? 1.2 : 2.3} h={isXS ? 1.2 : 2.3} />
          </Popover>
        </div>
        <div className="item">
          <Text h5>
            {name} &nbsp;
            {edited && (
              <Tooltip
                text={useTimeTranslation({
                  lang: lang,
                  date: new Date(lastEdited)
                })}
              >
                <Text small style={{ color: '#555' }}>
                  [{edited ? 'edited' : ''}] &nbsp;&nbsp;
                </Text>
              </Tooltip>
            )}
            <Text small>{renderDate(date)}</Text>
          </Text>
          <div
            style={{ margin: 0, position: 'relative', top: -10 }}
            dangerouslySetInnerHTML={{ __html: content! }}
          ></div>
          <div style={{ margin: 0 }}>
            <Tooltip
              placement="right"
              text={useTranslation({
                lang: lang,
                value: 'Click on the number count to who see liked.'
              })}
            >
              <span className="pointer" onClick={() => likeTrigger(id)}>
                {isActiveLiked(likes) ? (
                  <HeartFill color="#cb0000" size={16} />
                ) : (
                  <Heart size={16} />
                )}
              </span>
              <Popover
                placement="right"
                content={
                  <div style={{ maxHeight: 100, overflow: 'auto' }}>
                    {likes
                      ? likes.map((item: any) => (
                          <NextLink
                            href={`/u/${item.profile.username}`}
                            key={item.id}
                          >
                            <Link style={{ display: 'block' }}>
                              <User
                                src={
                                  item.profile && item.profile.photo
                                    ? `/storage/${item.profile.photo}`
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
                <Text className="like-btn">
                  {likes ? oneKFormat(likes.length) : 0}
                </Text>
              </Popover>
            </Tooltip>

            <Text small className="reply-btn" onClick={() => replyTrigger()}>
              <Translation lang={lang} value="Reply" />
            </Text>

            {activeUser === userId && (
              <>
                <Spacer inline w={2} />
                <span className="pointer" onClick={() => triggerComment()}>
                  <PencilEdit02Icon size={18} />
                </span>
                <Spacer inline w={1} />
                <span
                  className="pointer"
                  onClick={() => toggleCommentModal(true)}
                >
                  <Trash2 size={18} />
                </span>
              </>
            )}
          </div>

          {replies?.length ? (
            <Collapse
              initialVisible
              title={
                replies?.length > 1
                  ? oneKFormat(replies?.length) +
                    ` ${useTranslation({ lang: lang, value: 'Replies' })}`
                  : replies?.length +
                    ` ${useTranslation({ lang: lang, value: 'Reply' })}`
              }
            >
              {replies?.length
                ? replies.map((i: any) => (
                    <div className="discussion" id={i.slug} key={i.id}>
                      <div className="item first">
                        <Popover
                          trigger="hover"
                          content={
                            <div style={{ padding: '0 10px' }}>
                              <Link color href={`/u/${i.author.username}`}>
                                <User
                                  src={
                                    i.author.photo
                                      ? `/storage/${i.author.photo}`
                                      : `/images/avatar.png`
                                  }
                                  name={i.author.name}
                                >
                                  <Text p>{i.author.role}</Text>
                                </User>
                              </Link>
                            </div>
                          }
                        >
                          <Avatar
                            src={
                              i.author.photo
                                ? `/storage/${i.author.photo}`
                                : `/images/avatar.png`
                            }
                            w={isXS ? 1.2 : 2}
                            h={isXS ? 1.2 : 2}
                          />
                        </Popover>
                      </div>
                      <div className="item">
                        <Text h5>
                          {i.author.name} &nbsp;
                          {i.edited && (
                            <Tooltip
                              text={useTimeTranslation({
                                lang: lang,
                                date: new Date(i.updatedAt)
                              })}
                            >
                              <Text small style={{ color: '#555' }}>
                                [{i.edited ? 'edited' : ''}] &nbsp;&nbsp;
                              </Text>
                            </Tooltip>
                          )}
                          <Text small>{renderDate(i.createdAt)}</Text>
                        </Text>
                        <div
                          style={{ margin: 0, position: 'relative', top: -10 }}
                          dangerouslySetInnerHTML={{ __html: i.comment! }}
                        ></div>
                        <Tooltip
                          placement="right"
                          text={useTranslation({
                            lang: lang,
                            value: 'Click on the number count to who see liked.'
                          })}
                        >
                          <span
                            className="pointer"
                            onClick={() => likeTriggerX(i.id)}
                          >
                            {isActiveLiked(i.likes) ? (
                              <HeartFill color="#cb0000" size={16} />
                            ) : (
                              <Heart size={16} />
                            )}
                          </span>
                          <Popover
                            content={
                              <div style={{ maxHeight: 100, overflow: 'auto' }}>
                                {i.likes && i.likes.length
                                  ? i.likes.map((l: any) => (
                                      <NextLink
                                        href={`/u/${l.profile.username}`}
                                        key={l.id}
                                      >
                                        <Link style={{ display: 'block' }}>
                                          <User
                                            src={
                                              l.profile && l.profile.photo
                                                ? `/storage/${l.profile.photo}`
                                                : '/images/avatar.png'
                                            }
                                            name={l.profile.name}
                                          />
                                        </Link>
                                      </NextLink>
                                    ))
                                  : ''}
                              </div>
                            }
                          >
                            <Text className="like-btn">
                              {i.likes ? oneKFormat(i.likes.length) : 0}
                            </Text>
                          </Popover>
                        </Tooltip>
                        {activeUser === i.userId && (
                          <>
                            <Spacer inline w={2} />
                            <span
                              className="pointer"
                              onClick={() =>
                                replyUpdateTrigger(i.id, i.comment)
                              }
                            >
                              <PencilEdit02Icon size={18} />
                            </span>
                            <Spacer inline w={1} />
                            <span
                              className="pointer"
                              onClick={() => {
                                setReplyId(i.id);
                                toggleReplyModal(true);
                              }}
                            >
                              <Trash2 size={18} />
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                : ''}
            </Collapse>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;

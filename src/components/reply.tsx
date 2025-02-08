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
import { CheckInCircleFill, Heart, HeartFill, Trash2 } from '@geist-ui/icons';
import NextLink from 'next/link';
import { formatDistance } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import {
  Translation,
  useTimeTranslation,
  translation
} from './intl/translation';
import { oneKFormat } from './api/utils';
import { PencilEdit02Icon } from 'hugeicons-react';
import { useState } from 'react';
import { CheckmarkIcon } from 'react-hot-toast';

type replyProp = {
  lang: string;
  id: string;
  activeUser: string;
  userId: string;
  authorId: string;
  name?: string;
  username?: string;
  role?: string;
  point?: number;
  photo?: string;
  content?: string;
  bestAnswer?: string;
  showReplies?: boolean;
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
  bestAnswerTrigger: (val: string) => void;
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
    authorId,
    name,
    username,
    role,
    point,
    photo,
    content,
    bestAnswer,
    edited,
    showReplies,
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
    replyDeletion,
    bestAnswerTrigger
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
            placement="rightStart"
            trigger="hover"
            content={
              <div className="popover-adjust">
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
            {username} &nbsp;
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
            className="conversation"
            dangerouslySetInnerHTML={{ __html: content! }}
          ></div>
          <div style={{ margin: 0 }}>
            {activeUser === authorId && (
              <>
                {!bestAnswer ? (
                  <Popover
                    placement="topStart"
                    trigger="hover"
                    content={
                      <div className="popover-adjust">
                        <Translation
                          lang={lang}
                          value="Click to mark this comment the best response"
                        />
                      </div>
                    }
                  >
                    <span
                      className="best-button"
                      onClick={() => bestAnswerTrigger(id)}
                    >
                      {id === bestAnswer ? (
                        <CheckmarkIcon />
                      ) : (
                        <CheckInCircleFill size={14} />
                      )}
                      &nbsp;{' '}
                      <Translation lang={lang} value="Mark best response" />
                    </span>
                  </Popover>
                ) : (
                  bestAnswer === id && (
                    <Popover
                      placement="topStart"
                      trigger="hover"
                      content={
                        <div className="popover-adjust">
                          <Translation
                            lang={lang}
                            value="Click to remove this comment as the best response"
                          />
                        </div>
                      }
                    >
                      <span
                        className="best-button"
                        onClick={() => bestAnswerTrigger('')}
                      >
                        <CheckmarkIcon />
                        &nbsp;&nbsp;{' '}
                        <Translation lang={lang} value="Best response" />
                      </span>
                    </Popover>
                  )
                )}
              </>
            )}
            <Tooltip
              placement="right"
              text={translation({
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
                placement="rightStart"
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
                <Spacer inline w={1} />
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
              initialVisible={showReplies}
              title={
                replies?.length > 1
                  ? oneKFormat(replies?.length) +
                    ` ${translation({ lang: lang, value: 'Replies' })}`
                  : replies?.length +
                    ` ${translation({ lang: lang, value: 'Reply' })}`
              }
            >
              <div className="timeline">
                {replies.length
                  ? replies.map((i: any) => (
                      <div
                        className="timeline-container"
                        id={i.slug}
                        key={i.id}
                      >
                        <div className="timeline-icon">
                          <Popover
                            placement="rightStart"
                            trigger="hover"
                            content={
                              <div className="popover-adjust">
                                <Link color href={`/u/${i.author.username}`}>
                                  <User
                                    src={
                                      i.author.photo
                                        ? `/static/${i.author.photo}`
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
                                  ? `/static/${i.author.photo}`
                                  : `/images/avatar.png`
                              }
                              w={isXS ? 1.2 : 2}
                              h={isXS ? 1.2 : 2}
                            />
                          </Popover>
                        </div>
                        <div className="timeline-body">
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
                            className="conversation"
                            dangerouslySetInnerHTML={{ __html: i.comment! }}
                          ></div>
                          <Tooltip
                            placement="right"
                            text={translation({
                              lang: lang,
                              value:
                                'Click on the number count to who see liked.'
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
                              placement="rightStart"
                              content={
                                <div
                                  style={{ maxHeight: 100, overflow: 'auto' }}
                                >
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
                                                  ? `/static/${l.profile.photo}`
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
              </div>
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

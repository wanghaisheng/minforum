import { useEffect, useRef, useState, useMemo } from 'react';
import {
  Avatar,
  Spacer,
  Loading,
  Button,
  useMediaQuery,
  Input,
  Popover,
  Modal,
  Image
} from '@geist-ui/core';
import { Row, Col } from 'react-grid-system';
import { parseCookies, setCookie } from 'nookies';
import toast, { Toaster } from 'react-hot-toast';
import {
  ChevronLeft,
  Send,
  Emoji as Emoticon,
  Image as Picture,
  Search,
  Plus
} from '@geist-ui/icons';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import Emoji from 'components/data/emoji';
import Navbar from 'components/navbar';
import UserStore from 'stores/user';
import { useRouter } from 'next/router';
import { getInitials, timeAgoShort } from 'components/api/utils';
import {
  Translation,
  useTimeTranslation,
  translation
} from 'components/intl/translation';
import dayjs from 'dayjs';
import TextareaAutosize from 'react-textarea-autosize';
import useToken from 'components/token';
import useSocket from 'components/socket';
import MessageStore from 'stores/message';
import BlockStore from 'stores/block';
import ChatBubble from 'components/chat-bubble';
import Auth from 'components/auth';
import useSettings from 'components/settings';

const Index = observer(() => {
  const settings = useSettings();
  const router = useRouter();
  const { mobile } = router.query;
  const cookie = parseCookies();
  const isXS = useMediaQuery('xs');
  const socket = useSocket();
  const token = useToken();
  const chatBox = useRef(null);
  const containerRef = useRef(null);
  const { channel }: any = router.query;
  const [typing, setTyping] = useState(false);
  const [_msg, setMsg] = useState<any>({});
  const [chatHeight, resizeHeight] = useState('calc(100vh - 190px)');
  const [_search, setSearch] = useState<any>('');
  const [image, setImage] = useState<any>('');
  const [active, setActive] = useState(true);
  const [imageModal, toggleImage] = useState(false);
  const [{ blockLoading, block, getBlock, blockAction }] = useState(
    () => new BlockStore()
  );
  const [{ uploadImage }] = useState(() => new UserStore());
  const [
    {
      loading,
      page,
      nomore,
      unread_message,
      setPage,
      messages,
      threads,
      status,
      setStatus,
      getMessages,
      getThreads
    }
  ] = useState(() => new MessageStore());

  useEffect(() => {
    token?.id && init();

    socket?.on('typing', function (typed) {
      if (typed === _msg?.id) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
        }, 2000);
      }
    });

    socket?.on('message', async function (data) {
      if (data.receiver === _msg?.id) {
        chatBox.current.value = '';
        setStatus('');
        setPage(1);
        await getThreads(channel, token?.id, false);
        if (containerRef.current) {
          const container = containerRef.current;
          const paddingBottom = parseInt(
            window.getComputedStyle(container).paddingBottom,
            10
          );
          container.scrollTop =
            container.scrollHeight - container.clientHeight - paddingBottom;
        }
      }
    });

    return () => {
      socket ? socket.close() : null;
    };
  }, [router, token?.id]);

  const init = async () => {
    let msg = cookie && cookie?._msg_init ? JSON.parse(cookie?._msg_init) : {};

    setMsg(msg);
    setActive(mobile === 'true');
    await getMessages(token?.id, true);
    msg && (await getThreads(msg?.channel, token?.id, true));
    msg?.id && (await getBlock(token?.id, msg?.id));
    if (containerRef.current) {
      const container = containerRef.current;
      const paddingBottom = parseInt(
        window.getComputedStyle(container).paddingBottom,
        10
      );
      container.scrollTop =
        container.scrollHeight - container.clientHeight - paddingBottom;
    }
  };

  const blockUser = async () => {
    let msg = cookie && cookie?._msg_init ? JSON.parse(cookie?._msg_init) : {};

    let body = {
      userId: token?.id,
      profileId: msg?.id
    };

    await blockAction(body);
  };

  const goTo = (item: any) => {
    let data = JSON.stringify({
      id: item?.profile?.id,
      name: item?.profile?.name,
      username: item?.profile?.username,
      photo: item?.profile?.photo,
      channel: item.channel
    });

    setCookie(null, '_msg_init', data, {
      path: '/'
    });
    item?.channel
      ? router.push(`/messages/${item?.channel}?mobile=true`)
      : router.push('/messages/new');
  };

  const lang = settings.language;

  const ellipsis = (val: string) => {
    if (val?.length >= 30) {
      val = val?.substring(0, 25);
      val = val + '...';
    }
    return val;
  };

  const handleUpload = async (id: string) => {
    let t = toast.loading(
      translation({
        lang: settings?.language,
        value: 'Uploading image....'
      })
    );

    let upload: any = document.querySelector(id);

    let formData = new FormData();
    formData.append('file', upload.files[0]);
    let file = '';
    await uploadImage('logo', formData)
      .then(async (res: any) => {
        if (res?.success) {
          file = res.file;
          // setContent(res.file)
          let _upload: any = document.querySelector(id);
          _upload.value = '';
          const message = {
            channel: channel,
            content: file,
            sender: token?.id,
            receiver: _msg?.id,
            type: 'image',
            timestamp: dayjs().unix()
          };

          socket?.emit('send-message', message);
          setStatus('sent');
          const container = containerRef.current;
          const paddingBottom = parseInt(
            window.getComputedStyle(container).paddingBottom,
            10
          );
          container.scrollTop =
            container.scrollHeight - container.clientHeight - paddingBottom;
        } else {
          let _upload: any = document.querySelector(id);
          _upload.value = '';

          toast.dismiss(t);
          toast.error(res.message, {
            duration: 3000
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = async () => {
    if (chatBox?.current?.value.trim() === '') return;
    setStatus('send');

    const message = {
      channel: channel,
      content: chatBox.current.value,
      sender: token?.id,
      receiver: _msg?.id,
      type: 'text',
      timestamp: dayjs().unix()
    };

    socket?.emit('send-message', message);
    chatBox.current.value = '';
    setStatus('sent');
    const container = containerRef.current;
    const paddingBottom = parseInt(
      window.getComputedStyle(container).paddingBottom,
      10
    );
    container.scrollTop =
      container.scrollHeight - container.clientHeight - paddingBottom;
  };

  const insertTextAtCursor = (textToInsert: string) => {
    const textArea = chatBox.current;

    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const textBefore = textArea.value.substring(0, start);
      const textAfter = textArea.value.substring(end);

      textArea.value = textBefore + textToInsert + textAfter;

      const cursorPosition = start + textToInsert.length;
      textArea.setSelectionRange(cursorPosition, cursorPosition);

      // Trigger React's onChange event if necessary
      const event = new Event('input', { bubbles: true });
      textArea.dispatchEvent(event);
    }
  };

  const paginate = async () => {
    let msg = cookie && cookie?._msg_init ? JSON.parse(cookie?._msg_init) : {};
    setPage(page + 1);
    msg && (await getThreads(msg?.channel, token?.id, true));
    msg?.id && (await getBlock(token?.id, msg?.id));
  };

  const handleScroll = () => {
    const container = containerRef.current;
    const offset = 50;

    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - offset
      ) {
        nomore === false && paginate();
      }

      if (container.scrollTop <= offset) {
        nomore === false && paginate();
      }
    }
  };

  const _messages = useMemo(() => {
    let withSearch = messages.filter(
      (item) =>
        item.profile?.name
          ?.toLowerCase()
          .includes(_search.trim().toLowerCase()) ||
        item.profile?.username
          ?.toLowerCase()
          .includes(_search.trim().toLowerCase())
    );
    return _search ? withSearch : messages;
  }, [messages, _search]);

  return (
    <div style={{ position: 'fixed', width: '100%' }}>
      <Toaster />
      <Auth>
        <Navbar
          title={`${unread_message ? `(${unread_message})` : ''} Messages`}
          description={`${unread_message ? `(${unread_message})` : ''} Messages`}
          norobot
        />
        <Modal
          width={'38rem'}
          visible={imageModal}
          onClose={() => toggleImage(!imageModal)}
        >
          <Modal.Content>
            <div className="center">
              <Image style={{ borderRadius: 0 }} src={`/static/${image}`} />
            </div>
          </Modal.Content>
          <Modal.Action passive onClick={() => toggleImage(!imageModal)}>
            Close
          </Modal.Action>
        </Modal>
        <div className="page-container top-100">
          <div className={`message-grid`}>
            <div className="user-container">
              <div
                className={`user-affix ${isXS && active ? 'with-message' : isXS ? 'with-user' : ''}`}
              >
                <div className="user-inner">
                  <div className="user-title">
                    <h3>Messages</h3>
                    <Input
                      width={'100%'}
                      icon={<Search />}
                      onKeyUp={(e) => setSearch(e.target.value)}
                      placeholder={translation({
                        lang,
                        value: 'Search....'
                      })}
                    />
                  </div>
                  {_messages?.map((item, key) => (
                    <div
                      className={`user-chat pointer ${item.channel === _msg?.channel ? 'active' : ''}`}
                      key={key}
                      onClick={() => goTo(item)}
                    >
                      <Row>
                        <Col xs={2}>
                          <Avatar
                            scale={1.5}
                            src={`${item.profile?.photo ? `/static/${item.profile?.photo}` : ''}`}
                            text={getInitials(item.profile?.name)}
                          />
                        </Col>
                        <Col xs={10}>
                          <Row>
                            <Col xs={8}>
                              <div>
                                <div className="name">
                                  {item?.profile?.name}
                                </div>
                              </div>
                            </Col>
                            <Col xs={4}>
                              <div className="time">
                                {timeAgoShort(dayjs(item.createdAt))}
                              </div>
                              <div></div>
                            </Col>
                            <Col xs={9}>
                              <div className="preview">
                                {item.type === 'text' ? (
                                  ellipsis(item.content)
                                ) : (
                                  <span>
                                    <Picture size={14} /> Image
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col xs={3}>
                              {item.read ? (
                                <div className="message-badge">
                                  <div>{item.read}</div>
                                </div>
                              ) : (
                                ''
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  {!loading && messages.length === 0 && (
                    <div className="center">
                      <p>No messages</p>
                      <Link href="/members">
                        <Button
                          type="secondary-light"
                          auto
                          scale={0.7}
                          icon={<Plus />}
                        >
                          Start a Conversation
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="user-ads">
                  {settings.advert?.right ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: settings.advert?.right!
                      }}
                    ></div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="chat-container">
              <div
                className={`chat-affix ${isXS && active ? 'with-message' : isXS ? 'with-user' : ''}`}
              >
                {_msg?.id === undefined ? (
                  ''
                ) : (
                  <div className="chat-header">
                    <div>
                      <Link
                        href={`/messages/${_msg?.channel}`}
                        className="mobile pointer"
                        style={{ marginRight: 10 }}
                        // onClick={() => {
                        //   setActive(false);
                        // }}
                      >
                        <ChevronLeft size={30} />
                      </Link>
                      <Link href={`/u/${_msg?.username}`}>
                        <Avatar
                          scale={1.5}
                          src={`${_msg?.photo ? `/static/${_msg?.photo}` : ''}`}
                          text={getInitials(_msg?.name)}
                        />
                      </Link>
                    </div>
                    <div>
                      <div className={`name ${!typing ? 'top' : ''}`}>
                        <Link href={`/u/${_msg?.username}`}>{_msg?.name}</Link>
                      </div>
                      {typing ? <div className="typing">typing....</div> : ''}
                    </div>
                    <div>
                      <Button
                        ghost
                        scale={0.7}
                        auto
                        onClick={blockUser}
                        loading={blockLoading}
                      >
                        {block?.blocked ? (
                          <Translation lang={lang} value="Unblock" />
                        ) : (
                          <Translation lang={lang} value="Block" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                {_msg?.id === undefined ? (
                  ''
                ) : (
                  <div
                    ref={containerRef}
                    className="chat-inner"
                    style={{
                      height: chatHeight
                    }}
                    onScroll={() => status === '' && handleScroll()}
                  >
                    {loading && (
                      <div>
                        <Loading />
                      </div>
                    )}
                    {threads.map((item) => (
                      <ChatBubble
                        key={item.id}
                        type={item.type}
                        direction={item.sender === token?.id ? 'right' : 'left'}
                        content={item.content}
                        date={useTimeTranslation({
                          date: new Date(item.createdAt),
                          lang: lang
                        })}
                        toggleImage={(value) => {
                          setImage(value);
                          toggleImage(!imageModal);
                        }}
                      />
                    ))}
                  </div>
                )}
                {_msg?.id === undefined ? (
                  ''
                ) : (
                  <>
                    {block?.blockedYou || block?.blocked ? (
                      <div className="chat-bottom disabled">
                        <div>
                          {block?.blockedYou ? (
                            <Translation
                              lang={lang}
                              value="You can no longer send messages in this chat"
                            />
                          ) : (
                            <Translation
                              lang={lang}
                              value="Unblock user to send messages"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="chat-bottom">
                        <div>
                          <div className="action-button">
                            <input
                              type="file"
                              className="file-upload"
                              id="image"
                              onChange={() => handleUpload('#image')}
                            />
                            <Picture />
                          </div>
                          <Popover
                            placement="topStart"
                            content={
                              <Emoji
                                width={300}
                                height={300}
                                onPick={(text) => insertTextAtCursor(text)}
                                lang={lang}
                              />
                            }
                          >
                            <span className="action-button">
                              <Emoticon />
                            </span>
                          </Popover>
                        </div>
                        <div>
                          <TextareaAutosize
                            ref={chatBox}
                            className="chat-editor"
                            onKeyUp={() => {
                              socket.emit('typing', JSON.stringify(token?.id));
                            }}
                            onHeightChange={(height) =>
                              resizeHeight(`calc(100vh - ${148 + height}px)`)
                            }
                            minRows={1}
                            maxRows={5}
                          />
                        </div>
                        <div>
                          <div style={{ marginTop: -45 }}>
                            <Button
                              scale={0.8}
                              type="secondary-light"
                              auto
                              icon={<Send />}
                              onClick={sendMessage}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={`ads-container`}>
              {settings.advert?.right ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: settings.advert?.right!
                  }}
                ></div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Auth>
    </div>
  );
});

export default Index;

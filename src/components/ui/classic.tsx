import {
  Popover,
  Text,
  Link,
  Avatar,
  Spacer,
  User,
  useMediaQuery,
  Badge,
  Tooltip
} from '@geist-ui/core';
import { format } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { oneKFormat } from 'components/api/utils';
import { Translation, translation } from 'components/intl/translation';
import { Comment01Icon, ViewIcon } from 'hugeicons-react';
import CustomIcon from 'components/data/icon/icon';
import { userProp } from 'interfaces/user';

type ClassicUiProps = {
  title?: string;
  avatar?: string;
  active?: Array<userProp>;
  author?: string;
  authorUsername?: string;
  authorRole?: string;
  slug?: string;
  category?: string;
  color?: string;
  comment?: number;
  view?: number;
  pinned?: boolean;
  premium?: boolean;
  date?: Date | string;
  lang: string;
};

const ClassicUI = (props: ClassicUiProps) => {
  const isXS = useMediaQuery('xs');
  const {
    title,
    avatar,
    slug,
    category,
    color,
    comment,
    view,
    pinned,
    active,
    author,
    authorRole,
    authorUsername,
    date,
    lang,
    premium
  } = props;

  const content = () => (
    <div className="popover-adjust">
      <Link color href={`/u/${authorUsername}`}>
        <User src={avatar} name={author}>
          <Translation lang={props.lang} value={authorRole} />
        </User>
      </Link>
    </div>
  );

  const renderDate = (value: any) => {
    const date: any = value
      ? format(new Date(value), 'MMM d, yyyy @ h:mm a', {
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

  let total = active && active.length > 3 ? active.length - 3 : null;

  return (
    <Link width={'100%'} href={`/d/${slug}`}>
      <div className="classicui">
        <div className="initial">
          <div>
            <div className="title">
              <span>{title} &nbsp;</span>
              {pinned && (
                <Tooltip text={translation({ lang, value: 'Pinned post' })}>
                  <Badge
                    scale={0.5}
                    style={{
                      backgroundColor: '#228b22',
                      marginRight: 3
                    }}
                  >
                    <CustomIcon name="pin" color="#fff" size={14} />
                  </Badge>
                </Tooltip>
              )}

              {premium && (
                <Tooltip text={translation({ lang, value: 'Premium post' })}>
                  <Badge scale={0.5} style={{ backgroundColor: '#8B00F6' }}>
                    <CustomIcon name="crown" color="#fff" size={14} />
                  </Badge>
                </Tooltip>
              )}
            </div>
            <Text b className="name" style={{ color }}>
              {category}
            </Text>
            <Spacer w={1} inline />
            <Text span className="date">
              {renderDate(date)}
            </Text>
          </div>
          <div>
            <div className="meta">
              <div className="comment">
                {isXS ? (
                  <Popover content={content}>
                    <Avatar src={avatar} />
                  </Popover>
                ) : (
                  <Avatar.Group count={total}>
                    {active?.map((item) => (
                      <Tooltip
                        key={item.id}
                        text={
                          <div>
                            <b>{item.name}</b>
                            <Spacer inline w={0.5} />
                            <small>@{item.username}</small>
                            <div>Role: {item.role}</div>
                          </div>
                        }
                      >
                        <Link href={`/u/${item.username}`}>
                          <Avatar
                            src={
                              item.photo
                                ? `/static/${item.photo}`
                                : '/images/avatar.png'
                            }
                            stacked
                          />
                        </Link>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                )}
              </div>
              <div>
                <Text span style={{ position: 'relative', top: isXS ? 6 : 2 }}>
                  <span style={{ position: 'relative', top: 5 }}>
                    <Comment01Icon size={isXS ? 20 : 25} />
                  </span>{' '}
                  <span style={{ position: 'relative', top: -2, fontSize: 12 }}>
                    {oneKFormat(comment)}
                  </span>
                </Text>
                <Spacer w={isXS ? 1 : 2} inline />
                <Text span style={{ position: 'relative', top: isXS ? 6 : 2 }}>
                  <span style={{ position: 'relative', top: 7 }}>
                    <ViewIcon size={isXS ? 23 : 28} />
                  </span>{' '}
                  <span style={{ position: 'relative', top: -2, fontSize: 12 }}>
                    {oneKFormat(view)}
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClassicUI;

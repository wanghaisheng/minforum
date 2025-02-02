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
import { oneKFormat } from './api/utils';
import { Translation, useTranslation } from 'components/intl/translation';
import { Comment01Icon, ViewIcon } from 'hugeicons-react';
import CustomIcon from './data/icon/icon';

type postProps = {
  title?: string;
  avatar?: string;
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

const Post = (props: postProps) => {
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

  return (
    <div className="post without-right">
      <div className="item first desktop">
        <Popover placement="rightStart" trigger="hover" content={content}>
          <Avatar src={avatar} w={isXS ? 1 : 1.7} h={isXS ? 1 : 1.7} />
        </Popover>
      </div>
      <div className="item">
        <Link href={`/d/${slug}`}>
          <div className="mobile-inner">
            <div className="mobile">
              <Popover placement="rightStart" trigger="hover" content={content}>
                <Avatar src={avatar} w={isXS ? 1 : 1.7} h={isXS ? 1 : 1.7} />
              </Popover>
            </div>
            <div>
              <span>{title} &nbsp;</span>
              {pinned && (
                <Tooltip text={useTranslation({ lang, value: 'Pinned post' })}>
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
                <Tooltip text={useTranslation({ lang, value: 'Premium post' })}>
                  <Badge scale={0.5} style={{ backgroundColor: '#8B00F6' }}>
                    <CustomIcon name="crown" color="#fff" size={14} />
                  </Badge>
                </Tooltip>
              )}
            </div>
          </div>
          <Text b className="name" style={{ color }}>
            {category}
          </Text>
          <Spacer w={1} inline />
          <Text span className="date">
            {renderDate(date)}
          </Text>
          <Spacer w={1} inline />
          <Text span className="comment">
            <span style={{ position: 'relative', top: 5 }}>
              <ViewIcon size={20} />
            </span>{' '}
            {oneKFormat(view)}
          </Text>
          <Spacer w={1} inline />
          <Text span className="comment">
            <span style={{ position: 'relative', top: 5 }}>
              <Comment01Icon size={18} />
            </span>{' '}
            {oneKFormat(comment)}
          </Text>
        </Link>
      </div>
    </div>
  );
};

export default Post;

import {
  Popover,
  Text,
  Link,
  Avatar,
  Spacer,
  User,
  useMediaQuery
} from '@geist-ui/core';
import NextLink from 'next/link';
import { format } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { oneKFormat } from './api/utils';
import { Translation } from 'components/intl/Translation';
import { Comment01Icon, ViewIcon } from 'hugeicons-react';

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
    author,
    authorRole,
    authorUsername,
    date,
    lang
  } = props;

  const content = () => (
    <div style={{ padding: '0 10px' }}>
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
    <NextLink href={`/d/${slug}`}>
      <Link width="100%">
        <div className="post without-right">
          <div className="item">
            <Popover trigger="hover" content={content}>
              <Avatar src={avatar} w={isXS ? 1 : 1.7} h={isXS ? 1 : 1.7} />
            </Popover>
          </div>
          <div className="item">
            <Text h1 className="title">
              {title}
            </Text>
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
          </div>
        </div>
      </Link>
    </NextLink>
  );
};

export default Post;

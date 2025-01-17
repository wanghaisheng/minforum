import { Text, Spacer } from '@geist-ui/core';
import Link from 'next/link';
import { format } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { oneKFormat } from './api/utils';
import { Comment01Icon, ViewIcon } from 'hugeicons-react';

type postProps = {
  lang: string;
  title: string;
  comment?: number;
  view?: string;
  slug: string;
  category?: string;
  color?: string;
  date: Date;
};

const MinimalPost = (props: postProps) => {
  const { lang, title, comment, view, color, category, slug, date } = props;

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
    <Link href={`/d/${slug}`}>
      <div className="post minimal pointer without-right">
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
            {oneKFormat(view)}{' '}
          </Text>
          <Spacer w={1} inline />
          <Text span className="comment">
            <span style={{ position: 'relative', top: 5 }}>
              <Comment01Icon size={18} />
            </span>{' '}
            {oneKFormat(comment)}{' '}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default MinimalPost;

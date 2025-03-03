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
import { format, formatDistanceToNow, isSameDay, isSameYear } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import { abbreviateText, oneKFormat } from 'components/api/utils';
import { Translation, translation } from 'components/intl/translation';
import { Comment01Icon, ViewIcon } from 'hugeicons-react';
import CustomIcon from 'components/data/icon/icon';

type SocialUiProps = {
  title?: string;
  avatar?: string;
  author?: string;
  authorUsername?: string;
  authorRole?: string;
  data?: string;
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

const SocialUI = (props: SocialUiProps) => {
  const isXS = useMediaQuery('xs');
  const {
    title,
    avatar,
    slug,
    data,
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

  function renderDate(date: string | Date) {
    const now = new Date();
    const inputDate = new Date(date);
    let locale: any | string =
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
                      : 'en';

    if (isSameDay(inputDate, now)) {
      return formatDistanceToNow(inputDate, { locale });
    } else if (isSameYear(inputDate, now)) {
      return format(inputDate, 'MMM d', { locale });
    } else {
      return format(inputDate, 'MMM d, yyyy', { locale });
    }
  }

  return (
    <Link width={'100%'} href={`/d/${slug}`}>
      <div className="socialui without-right">
        <div className="social-header">
          <div>
            <Popover placement="rightStart" trigger="hover" content={content}>
              <Avatar src={avatar} w={isXS ? 1 : 1.7} h={isXS ? 1 : 1.7} />
            </Popover>
          </div>
          <div>
            <div className="author">
              {author}
              <Spacer w={0.5} inline />
              <span className="username">@{authorUsername}</span>
            </div>
            <Text span className="date">
              {renderDate(date)}
            </Text>
          </div>
          <div></div>
        </div>
        <h4>
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
        </h4>
        <div
          dangerouslySetInnerHTML={{ __html: abbreviateText(data, 160) }}
        ></div>
        <div className="item">
          <Text b className="name" style={{ color }}>
            {category}
          </Text>
          <Spacer w={1} inline />

          <Spacer w={1} inline />
          <Text span className="comment">
            <span style={{ position: 'relative', top: 5 }}>
              <ViewIcon size={20} />
            </span>{' '}
            {oneKFormat(view)}
          </Text>
          <Spacer w={2} inline />
          <Text span className="comment">
            <span style={{ position: 'relative', top: 5 }}>
              <Comment01Icon size={18} />
            </span>{' '}
            {oneKFormat(comment)}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default SocialUI;

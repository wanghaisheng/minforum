import { pluralize } from 'components/api/utils';
import dict from './dict';

type LangCode = 'en' | 'es' | 'fr' | 'de' | 'ru' | 'cn' | 'ja' | 'ko';
interface timeTranslationProps {
  lang: string;
  date: Date;
}

type translationProps = {
  lang: string;
  value: string;
  number?: any;
  name?: any;
  duration?: number;
};

const useReplyTranslation = (props: translationProps) => {
  let value = props.value?.match(/\(([^)]+)\)/);
  let name = value?.length ? value[1] : '';

  if (props.lang === 'en') {
    return props.value;
  } else if (props.lang === 'es') {
    return `En respuesta al comentario de ${name} #${props.number}`;
  } else if (props.lang === 'fr') {
    return `En réponse au commentaire de ${name} #${props.number}`;
  } else if (props.lang === 'de') {
    return `Als Antwort auf @${props.name} Kommentar #${props.number}`;
  } else if (props.lang === 'ru') {
    return `В ответ на комментарий @${props.name} #${props.number}`;
  } else if (props.lang === 'cn') {
    return `回复@${props.name} 评论 #${props.number}`;
  } else if (props.lang === 'ja') {
    return `@${props.name} コメント #${props.number} への返信`;
  } else if (props.lang === 'ko') {
    return `@${props.name} 댓글 #${props.number}에 대한 회신`;
  }
};

const useRepliedPostTranslation = (props: translationProps) => {
  if (props.lang === 'en') {
    return `${props.name} replied your post.`;
  } else if (props.lang === 'es') {
    return `${props.name} respondió tu publicación.`;
  } else if (props.lang === 'fr') {
    return `${props.name} a répondu à votre message.`;
  } else if (props.lang === 'de') {
    return `${props.name} hat auf deinen Beitrag geantwortet.`;
  } else if (props.lang === 'ru') {
    return `${props.name} ответила на твой пост.`;
  } else if (props.lang === 'cn') {
    return `${props.name} 回复了你的帖子`;
  } else if (props.lang === 'ja') {
    return `${props.name} があなたの投稿に返信しました。`;
  } else if (props.lang === 'ko') {
    return `${props.name} 이 귀하의 게시물에 답장했습니다 .`;
  }
};

const useRepliedCommentTranslation = (props: translationProps) => {
  if (props.lang === 'en') {
    return `${props.name} replied your comment.`;
  } else if (props.lang === 'es') {
    return `${props.name} respondió tu comentario.`;
  } else if (props.lang === 'fr') {
    return `${props.name} a répondu à votre commentaire.`;
  } else if (props.lang === 'de') {
    return `${props.name} hat auf deinen Kommentar geantwortet.`;
  } else if (props.lang === 'ru') {
    return `${props.name} ответила на ваш комментарий.`;
  } else if (props.lang === 'cn') {
    return `${props.name} 回复了你的评论`;
  } else if (props.lang === 'ja') {
    return `${props.name} があなたのコメントに返信しました。`;
  } else if (props.lang === 'ko') {
    return `${props.name} 이 귀하의 의견에 답변했습니다.`;
  }
};

const useLikedReplyTranslation = (props: translationProps) => {
  if (props.lang === 'en') {
    return `${props.name} liked your reply.`;
  } else if (props.lang === 'es') {
    return `A ${props.name} me gusta tu respuesta.`;
  } else if (props.lang === 'fr') {
    return `${props.name}  aime ta réponse.`;
  } else if (props.lang === 'de') {
    return `Ihre Antwort hat ${props.name} gefallen.`;
  } else if (props.lang === 'ru') {
    return `${props.name} понравился твой ответ.`;
  } else if (props.lang === 'cn') {
    return `${props.name} 喜欢你的回复`;
  } else if (props.lang === 'ja') {
    return `${props.name} はあなたの返事を気に入りました`;
  } else if (props.lang === 'ko') {
    return `${props.name} 은 귀하의 답변을 좋아했습니다.`;
  }
};

const useLikedCommentTranslation = (props: translationProps) => {
  if (props.lang === 'en') {
    return `${props.name} liked your comment.`;
  } else if (props.lang === 'es') {
    return `A ${props.name} le gustó tu comentario.`;
  } else if (props.lang === 'fr') {
    return `${props.name}  a aimé votre commentaire.`;
  } else if (props.lang === 'de') {
    return `${props.name} hat deinen Kommentar gefallen.`;
  } else if (props.lang === 'ru') {
    return `${props.name}  понравился ваш комментарий.`;
  } else if (props.lang === 'cn') {
    return `${props.name} 喜欢你的评论。`;
  } else if (props.lang === 'ja') {
    return `${props.name} はあなたのコメントが気に入りました。`;
  } else if (props.lang === 'ko') {
    return `${props.name} 은 귀하의 의견을 좋아했습니다.`;
  }
};

const useLikedPostTranslation = (props: translationProps) => {
  if (props.lang === 'en') {
    return `${props.name} liked your post.`;
  } else if (props.lang === 'es') {
    return `A ${props.name} le gustó tu comentario.`;
  } else if (props.lang === 'fr') {
    return `${props.name}  a aimé votre commentaire.`;
  } else if (props.lang === 'de') {
    return `${props.name} hat deinen Beitrag gefallen.`;
  } else if (props.lang === 'ru') {
    return `${props.name} понравился твой пост.`;
  } else if (props.lang === 'cn') {
    return `${props.name} 喜欢你的帖子`;
  } else if (props.lang === 'ja') {
    return `${props.name} はあなたの投稿が好きでした`;
  } else if (props.lang === 'ko') {
    return `${props.name} 이 게시물을 좋아합니다`;
  }
};

const timePluralize = (number: number, lang: LangCode): string => {
  if (lang === 'en') {
    return number > 1 ? 's' : '';
  } else if (lang === 'es') {
    return number > 1 ? 's' : '';
  } else if (lang === 'fr') {
    return number > 1 ? 's' : '';
  } else if (lang === 'de') {
    return number > 1 ? 'e' : '';
  } else if (lang === 'ru') {
    return number > 1 ? 'ы' : 'а';
  } else if (lang === 'cn') {
    return '';
  } else if (lang === 'ja') {
    return '';
  } else if (lang === 'ko') {
    return '';
  }
  return '';
};

const useTimeTranslation = (props: timeTranslationProps): string => {
  const { lang, date } = props;

  const durationMap: Record<LangCode, string[]> = {
    en: ['min', 'hour', 'day', 'month', 'year'],
    es: ['minuto', 'hora', 'día', 'mes', 'año'],
    fr: ['minute', 'heure', 'jour', 'mois', 'an'],
    de: ['Minute', 'Stunde', 'Tag', 'Monat', 'Jahr'],
    ru: ['минута', 'час', 'день', 'месяц', 'год'],
    cn: ['分钟', '小时', '天', '个月', '年'],
    ja: ['分', '時間', '日', 'ヶ月', '年'],
    ko: ['분', '시간', '일', '개월', '년']
  };

  // Step 1: Calculate the difference between the current date and the given date
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  // Step 2: If the difference is less than 1 minute, return "just now"
  if (diffInMs < 60 * 1000) {
    const justNowMap: Record<LangCode, string> = {
      en: 'Just now',
      es: 'Ahora mismo',
      fr: "À l'instant",
      de: 'Gerade jetzt',
      ru: 'Только что',
      cn: '刚刚',
      ja: 'たった今',
      ko: '방금 전'
    };
    return justNowMap[lang];
  }

  // Step 2: Determine the duration and unit
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  let number: number;
  let duration: string;

  if (diffInMinutes < 60) {
    number = diffInMinutes;
    duration = 'min';
  } else if (diffInHours < 24) {
    number = diffInHours;
    duration = 'hour';
  } else if (diffInDays < 30) {
    number = diffInDays;
    duration = 'day';
  } else if (diffInMonths < 12) {
    number = diffInMonths;
    duration = 'month';
  } else {
    number = diffInYears;
    duration = 'year';
  }

  // Step 3: Get the unit based on the language
  const unit =
    lang &&
    durationMap[lang][
      ['min', 'hour', 'day', 'month', 'year'].indexOf(duration)
    ];

  // Step 4: Return the translated string based on the language
  if (lang === 'en') {
    return `${number} ${unit}${timePluralize(number, lang)} ago`;
  } else if (lang === 'es') {
    return `hace ${number} ${unit}${timePluralize(number, lang)}`;
  } else if (lang === 'fr') {
    return `il y a ${number} ${unit}${timePluralize(number, lang)}`;
  } else if (lang === 'de') {
    return `vor ${number} ${unit}${timePluralize(number, lang)}`;
  } else if (lang === 'ru') {
    return `${number} ${unit}${timePluralize(number, lang)} назад`;
  } else if (lang === 'cn') {
    return `${number}${unit}前`;
  } else if (lang === 'ja') {
    return `${number}${unit}前`;
  } else if (lang === 'ko') {
    return `${number}${unit} 전`;
  }

  return '';
};

const useTranslation = (props: translationProps) => {
  let translation: any = dict
    .filter((item) => item.en === props.value)
    .map((item) => item);
  translation = translation.length ? translation[0]?.[props.lang] : '';

  return translation;
};

const Translation = (props: translationProps) => {
  const translation = useTranslation(props);

  return <span>{translation}</span>;
};

export {
  useTranslation,
  useLikedPostTranslation,
  useLikedCommentTranslation,
  useRepliedCommentTranslation,
  useRepliedPostTranslation,
  useLikedReplyTranslation,
  useReplyTranslation,
  useTimeTranslation,
  Translation
};

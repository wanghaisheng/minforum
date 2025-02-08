import { Tooltip } from '@geist-ui/core';
import {
  Alien01Icon,
  Brain02Icon,
  Medal02Icon,
  PenTool01Icon,
  QuillWrite02Icon,
  StarFaceIcon,
  UserLove01Icon,
  UserLove02Icon,
  UserStar01Icon,
  UserStar02Icon
} from 'hugeicons-react';
import React from 'react';
import { translation } from 'components/intl/translation';

type BadgeProps = {
  color: string;
  text: string;
  icon: React.ReactNode;
  position: 'top' | 'bottom';
  language: string;
};

type BadgeItem = {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

type BadgesProps = {
  awards: string[];
  position: 'top' | 'bottom';
  language: string;
};

const badges: BadgeItem[] = [
  {
    name: 'admin',
    icon: <UserStar01Icon size={16} />,
    description: 'Admin',
    color: '#5f45f2'
  },
  {
    name: 'moderator',
    icon: <UserStar02Icon size={16} />,
    description: 'Moderator',
    color: '#0766FF'
  },
  {
    name: 'devotee',
    icon: <StarFaceIcon size={16} />,
    description: 'Devotee: Actively engaged and contributing for 1+ years',
    color: '#2FCC72'
  },
  {
    name: 'veteran',
    icon: <Medal02Icon size={16} />,
    description: 'Veteran: Actively engaged and contributing for 3+ years',
    color: '#123266'
  },
  {
    name: 'prolific-writer',
    icon: <PenTool01Icon size={16} />,
    description: 'Prolific writer: Wrote 100+ discussions',
    color: 'blue'
  },
  {
    name: 'wordsmith',
    icon: <QuillWrite02Icon size={16} />,
    description: 'Wordsmith: Wrote 1000+ discussions',
    color: '#0E9808'
  },
  {
    name: 'people-choice',
    icon: <UserLove01Icon size={16} />,
    description: "People's choice: 1000+ likes",
    color: '#ff0000'
  },
  {
    name: 'favorite',
    icon: <UserLove02Icon size={16} />,
    description: 'Favorite: Answered 100+ likes',
    color: '#BE0071'
  },
  {
    name: 'genius',
    icon: <Alien01Icon color="#444" size={16} />,
    description: 'Genius: Best Answers for 100+ posts',
    color: '#F9C93C'
  },
  {
    name: 'polymath',
    icon: <Brain02Icon color="#222" size={16} />,
    description: 'Polymath: Best Answers for 1000+ posts',
    color: '#FF7201'
  }
];

export const Badge = ({
  color,
  text,
  icon,
  position,
  language
}: BadgeProps) => (
  <div
    className="reward"
    style={{
      backgroundColor: color
    }}
  >
    <Tooltip
      placement={position}
      text={translation({ lang: language, value: text })}
    >
      {icon}
    </Tooltip>
  </div>
);

export const Badges = ({ awards, position, language }: BadgesProps) => {
  const rewards = awards.map((item, index) => {
    const badge = badges.find((i) => i.name === item);
    if (!badge) return null;

    return (
      <Badge
        key={item + index}
        icon={badge.icon}
        color={badge.color}
        text={badge.description}
        position={position}
        language={language}
      />
    );
  });

  return <>{rewards}</>;
};

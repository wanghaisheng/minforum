import { Input, Tabs, Text } from '@geist-ui/core';
import { useMemo, useState } from 'react';
import { emojis } from './emoji';
import { Translation, useTranslation } from 'components/intl/translation';
import CustomIcon from '../icon/icon';

type emojiProps = {
  width?: number;
  height?: number;
  onPick?: (emoji: string) => void;
  lang: string;
};

const Emoji = (props: emojiProps) => {
  const [search, setSearch] = useState('');

  const Category = ({ name, search }) => {
    const emoticons = useMemo(() => {
      return emojis
        .filter((item) => item.category === name)
        .filter((item) =>
          item.name?.toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [name]);

    const emoji = emoticons.map((item) => (
      <span
        key={item.name}
        className="emoji"
        onClick={() => props?.onPick(item.emoji)}
      >
        {item.emoji}
      </span>
    ));

    return <div className="emoji-container">{emoji}</div>;
  };

  const handleChange = (e: any) => {
    let val = e.target.value;
    val = val.trim();
    setSearch(val);
  };

  return (
    <div
      style={{
        width: props.width || '100%',
        height: props.height || 300,
        overflow: 'auto',
        padding: 10
      }}
    >
      <Input
        width="100%"
        placeholder={useTranslation({
          lang: props.lang,
          value: 'Search emoji...'
        })}
        onChange={handleChange}
      />
      <Tabs initialValue="1" leftSpace={'0px'}>
        <Tabs.Item label={<CustomIcon name="smile" type="solid" />} value="1">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Smileys & Emotions" />
          </Text>
          <Category name="Smileys & Emotion" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="user" type="solid" />} value="2">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="People & Body" />
          </Text>
          <Category name="People & Body" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="dog" type="solid" />} value="3">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Animals & Nature" />
          </Text>
          <Category name="Animals & Nature" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="lemon" type="solid" />} value="4">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Food & Drink" />
          </Text>
          <Category name="Food & Drink" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="car" type="solid" />} value="5">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Travel & Places" />
          </Text>
          <Category name="Travel & Places" search={search} />
        </Tabs.Item>
        <Tabs.Item
          label={<CustomIcon name="football" type="regular" />}
          value="6"
        >
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Activities" />
          </Text>
          <Category name="Activities" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="bulb" type="solid" />} value="7">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Objects" />
          </Text>
          <Category name="Objects" search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="hash" type="regular" />} value="8">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Symbols" />
          </Text>
          <Category name={'Symbols'} search={search} />
        </Tabs.Item>
        <Tabs.Item label={<CustomIcon name="flag" type="solid" />} value="9">
          <Text font={'13px'} span>
            <Translation lang={props.lang} value="Flags" />
          </Text>
          <Category name="Flags" search={search} />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Emoji;

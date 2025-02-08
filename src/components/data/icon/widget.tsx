import { Input, Spacer, Grid } from '@geist-ui/core';
import { useMemo, useState } from 'react';
import icons from './icons';

import { translation } from 'components/intl/translation';
import CustomIcon from './icon';

type iconData = {
  icon: string;
  type: string;
};

type iconProps = {
  width?: number;
  height?: number;
  onPick?: (icon: iconData) => void;
  lang: string;
};

const IconWidget = (props: iconProps) => {
  const [search, setSearch] = useState('');

  const Widget = ({ search }) => {
    const symbols = useMemo(() => {
      return icons.filter((item) =>
        item.name?.toLowerCase().includes(search.trim().toLowerCase())
      );
    }, [icons]);

    const symbol = symbols.map((item) => (
      <div
        key={item.id}
        className="pointer"
        onClick={() => props?.onPick({ icon: item.name, type: item.type })}
      >
        <Grid.Container gap={2}>
          <Grid xs={3}>
            <CustomIcon name={item.name} size={25} type={item.type} />
          </Grid>
          <Grid xs={20}>{item.name}</Grid>
        </Grid.Container>
      </div>
    ));

    return <div>{symbol}</div>;
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
        placeholder={translation({
          lang: props.lang,
          value: 'Search....'
        })}
        onChange={handleChange}
      />
      <Spacer />

      <Widget search={search} />
    </div>
  );
};

export default IconWidget;

import { CSSProperties } from 'react';

type iconProps = {
  name: string;
  size?: number;
  color?: string;
  type?: string;
  style?: CSSProperties;
};

const CustomIcon = (props: iconProps) => {
  const { name, size, color, type, style } = props;

  return (
    <i
      className={`bx ${type === 'solid' ? 'bxs' : type === 'logo' ? 'bxl' : 'bx'}-${name}`}
      style={{ fontSize: size || 20, color: color || '#000', ...style }}
    ></i>
  );
};

export default CustomIcon;

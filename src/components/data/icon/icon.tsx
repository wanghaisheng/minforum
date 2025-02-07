import { CSSProperties } from 'react';

type iconProps = {
  name: string;
  size?: number;
  color?: string;
  type?: string;
  rotate?: boolean;
  style?: CSSProperties;
};

const CustomIcon = (props: iconProps) => {
  const { name, size, color, type, rotate, style } = props;

  return (
    <i
      className={`bx ${type === 'solid' ? 'bxs' : type === 'logo' ? 'bxl' : 'bx'}-${name} ${rotate ? 'bx-rotate-180' : ''}`}
      style={{ fontSize: size || 'inherit', color: color || '#000', ...style }}
    ></i>
  );
};

export default CustomIcon;

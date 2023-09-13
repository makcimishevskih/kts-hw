import * as React from 'react';
import ArrowDownIcon from '../ArrowDownIcon';
import CheckIcon from '../CheckIcon';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = () => {
  return (
    <>
      <ArrowDownIcon color="accent" />
      <CheckIcon width={40} height={40} />
    </>
  );
};

export default Icon;

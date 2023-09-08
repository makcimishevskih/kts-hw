import css from './NavInputs.module.scss';

import { FC, useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Loupe from 'components/icons/Loupe';
import Button from 'components/Button';

interface INavInputsProps {}

const NavInputs: FC<INavInputsProps> = () => {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  function wrapperHandleClick1() {
    inputRef1.current && inputRef1.current.focus();
  }
  function wrapperHandleClick2() {
    inputRef2.current && inputRef2.current.focus();
  }

  const handle1 = (value: string) => {
    setV1(value);
  };
  const handle2 = (value: string) => {
    setV2(value);
  };
  return (
    <div className={css.orgs__navInputs}>
      <Input
        onClick={wrapperHandleClick1}
        ref={inputRef1}
        value={v1}
        onChange={handle1}
        placeholder="Type"
        afterSlot={<ArrowDownIcon color="secondary" />}
        width="s"
      />
      <div className={`${css.orgs__filter} margin-top-m`}>
        <Input
          onClick={wrapperHandleClick2}
          ref={inputRef2}
          borderRadius="6px"
          value={v2}
          onChange={handle2}
          placeholder="Enter organization name"
          width="l"
        />
        <Button>
          <Loupe />
        </Button>
      </div>
    </div>
  );
};
export default NavInputs;

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Loupe from 'components/icons/Loupe';
import css from './NavInputs.module.scss';

interface INavInputsProps {
  changeOrgName: (name: string) => void;
}

const NavInputs: FC<INavInputsProps> = ({ changeOrgName }) => {
  const [l, setL] = useState(false);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setL(true);

    changeOrgName(v2);
  };

  return (
    <div className={css.orgs__navInputs}>
      <Input
        width="s"
        ref={inputRef1}
        value={v1}
        onChange={handle1}
        onClick={wrapperHandleClick1}
        afterSlot={<ArrowDownIcon color="secondary" />}
        placeholder="Type"
      />
      <form onSubmit={handleSubmit} className={`${css.orgs__filter} margin-top-m`}>
        <Input
          width="l"
          ref={inputRef2}
          borderRadius="6px"
          value={v2}
          onChange={handle2}
          onClick={wrapperHandleClick2}
          placeholder="Enter organization name"
        />
        <Button>
          <Loupe />
        </Button>
      </form>
    </div>
  );
};
export default NavInputs;

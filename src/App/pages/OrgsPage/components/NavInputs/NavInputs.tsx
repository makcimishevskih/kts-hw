import { FC, FormEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Dropdown, { Option } from 'components/Dropdown';
import Input from 'components/Input';
import Loupe from 'components/icons/Loupe';

import useFocus from 'hooks/useFocus';
import { TTypes } from 'store/models/types';
import { typeOptions } from './config';

import css from './NavInputs.module.scss';

interface INavInputsProps {
  orgName: string;
  handleOffsetToStart: () => void;
  setOrgName: (name: string) => void;
  setReposFilterType: (type: TTypes) => void;
}

const NavInputs: FC<INavInputsProps> = ({ orgName, handleOffsetToStart, setOrgName, setReposFilterType }) => {
  const [searchInputValue, setSearchInputValue] = useState(orgName);
  const [optionsValue, setOptionsValue] = useState<Option[]>([typeOptions[0]]);
  const { t } = useTranslation();

  const { inputRef, handleElementFocusOnClick } = useFocus();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchInputValue) {
      return;
    }

    const type: TTypes = optionsValue[0].value as TTypes;

    handleOffsetToStart();
    setOrgName(searchInputValue);
    setReposFilterType(type);
  };

  const getTitle = () => (optionsValue.length ? optionsValue.map((el) => t(el.value)).join(', ') : 'Select org type');

  const handleOptionValues = (value: Option[], type: TTypes) => {
    if (value.length) {
      setOptionsValue(value);
      setReposFilterType(type);
    }
  };

  return (
    <div className={css.orgs__navInputs}>
      <Dropdown
        type="single"
        value={optionsValue}
        onChange={handleOptionValues}
        getTitle={getTitle}
        options={typeOptions}
      />
      <form onSubmit={handleSubmit} className={css.orgs__filter}>
        <Input
          width="l"
          ref={inputRef}
          borderRadius="6px"
          value={searchInputValue}
          onChange={setSearchInputValue}
          onClick={handleElementFocusOnClick}
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

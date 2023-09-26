import { FC, FormEvent, useCallback, useRef, useState } from 'react';

import Button from 'components/Button';
import Dropdown, { Option } from 'components/Dropdown';
import Input from 'components/Input';
import Loupe from 'components/icons/Loupe';

import { TTypes } from 'store/models/types';
import { typeOptions } from './config';

import css from './NavInputs.module.scss';

interface INavInputsProps {
  handleOffsetToStart: () => void;
  setOrgName: (name: string) => void;
  setReposFilterType: (type: TTypes) => void;
}

const NavInputs: FC<INavInputsProps> = ({ handleOffsetToStart, setOrgName, setReposFilterType }) => {
  const [searchInputValue, setSearchInputValue] = useState('ktsstudio');
  const [optionsValue, setValue] = useState<Option[]>([typeOptions[0]]);

  const repoTypeInput = useRef<HTMLInputElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const handleRepoTypeInputClick = useCallback(() => repoTypeInput?.current?.focus(), [repoTypeInput]);
  const handleSearchInputClick = useCallback(() => searchInput?.current?.focus(), [searchInput]);

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

  const getTitle = () => (optionsValue.length ? optionsValue.map((el) => el.value).join(', ') : 'Select org type');

  const handleOptionValues = (value: Option[]) => {
    if (value.length) {
      setValue(value);
    }
  };

  return (
    <div className={css.orgs__navInputs}>
      <Dropdown
        type="single"
        value={optionsValue}
        onChange={handleOptionValues}
        onClick={handleRepoTypeInputClick}
        getTitle={getTitle}
        options={typeOptions}
      />
      <form onSubmit={handleSubmit} className={css.orgs__filter}>
        <Input
          width="l"
          ref={searchInput}
          borderRadius="6px"
          value={searchInputValue}
          onChange={setSearchInputValue}
          onClick={handleSearchInputClick}
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

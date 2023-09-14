import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback, useRef, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Loupe from 'components/icons/Loupe';
import OrgStore from 'store/OrgStore/OrgStore';
import css from './NavInputs.module.scss';

interface INavInputsProps {
  // changeOrgName: (name: string) => void;
}

const NavInputs: FC<INavInputsProps> = observer(() => {
  const [typeInputValue, setTypeInputValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const repoTypeInput = useRef<HTMLInputElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);

  const handleRepoTypeInputClick = useCallback(() => repoTypeInput?.current?.focus(), [repoTypeInput]);
  const handleSearchInputClick = useCallback(() => searchInput?.current?.focus(), [searchInput]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    OrgStore.changeOrgName(searchInputValue);
  };

  return (
    <div className={css.orgs__navInputs}>
      <Input
        width="s"
        ref={repoTypeInput}
        value={typeInputValue}
        onChange={setTypeInputValue}
        onClick={handleRepoTypeInputClick}
        afterSlot={<ArrowDownIcon color="secondary" />}
        placeholder="Type"
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
});
export default NavInputs;
// const NavInputs: FC<INavInputsProps> = observer(({ changeOrgName }) => {
//   const [l, setL] = useState(false);
//   const [typeInputValue, setTypeInputValue] = useState('');
//   const [searchInputValue, setSearchInputValue] = useState('');

//   const repoTypeInput = useRef<HTMLInputElement | null>(null);
//   const searchInput = useRef<HTMLInputElement | null>(null);

//   const handleRepoTypeInputClick = useCallback(() => repoTypeInput?.current?.focus(), [repoTypeInput]);
//   const handleSearchInputClick = useCallback(() => searchInput?.current?.focus(), [searchInput]);

//   // const handle1 = (value: string) => {
//   //   setTypeInputValue(value);
//   // };
//   // const handle2 = (value: string) => {
//   //   setSearchInputValue(value);
//   // };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setL(true);

//     changeOrgName(searchInputValue);
//   };

//   return (
//     <div className={css.orgs__navInputs}>
//       <Input
//         width="s"
//         ref={repoTypeInput}
//         value={typeInputValue}
//         onChange={setTypeInputValue}
//         onClick={handleRepoTypeInputClick}
//         afterSlot={<ArrowDownIcon color="secondary" />}
//         placeholder="Type"
//       />
//       <form onSubmit={handleSubmit} className={css.orgs__filter}>
//         <Input
//           width="l"
//           ref={searchInput}
//           borderRadius="6px"
//           value={searchInputValue}
//           onChange={setSearchInputValue}
//           onClick={handleSearchInputClick}
//           placeholder="Enter organization name"
//         />
//         <Button>
//           <Loupe />
//         </Button>
//       </form>
//     </div>
//   );
// });
// export default NavInputs;

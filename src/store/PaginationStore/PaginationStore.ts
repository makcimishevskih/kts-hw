import { makeObservable, observable, computed, action } from 'mobx';

class PaginationStore {
  offset: number = 1;
  ITEM_PER_PAGE: number = 1;
  orgReposCount: number = 0;
  isLoading: boolean = false;
  _isLastPage: boolean = false;
  _isFirstPage: boolean = false;

  constructor(ITEM_PER_PAGE: number) {
    this.ITEM_PER_PAGE = ITEM_PER_PAGE;

    makeObservable<PaginationStore>(this, {
      offset: observable,
      isLastPage: computed,
      isFirstPage: computed,
      isLoading: observable,
      ITEM_PER_PAGE: observable,
      orgReposCount: observable,

      pageNumbers: computed,
      paginationNums: computed,
      totalPagesCount: computed,

      onChange: action,
      setReposLen: action,
      setIsLoading: action,
    });
  }

  setReposLen = (orgLen: number) => {
    if (orgLen !== this.orgReposCount) {
      this.orgReposCount = orgLen;
    }
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  get totalPagesCount() {
    return Math.ceil(this.orgReposCount / this.ITEM_PER_PAGE);
  }

  get pageNumbers() {
    return new Array(this.totalPagesCount).fill(0).map((_, i) => i + 1) || [];
  }

  onChange = (pageN: number) => {
    this.offset = pageN;
  };
  handleOffsetToStart = () => {
    this.offset = 1;
  };

  get isFirstPage() {
    return this.offset === 1;
  }

  get isLastPage() {
    return this.offset === this.paginationNums[this.paginationNums.length - 1] || this.orgReposCount === 0;
  }

  get paginationNums() {
    const SEPARATOR = '...';
    const first = this.pageNumbers[0];
    const last = this.pageNumbers[this.pageNumbers.length - 1];

    if (this.pageNumbers.length <= 5) {
      return this.pageNumbers;
    }

    if (this.offset === 1) {
      return [...this.pageNumbers.slice(0, this.offset + 2), SEPARATOR, last];
    } else if (this.offset === last || this.offset === last - 1) {
      return [first, SEPARATOR, ...this.pageNumbers.slice(this.offset - 2, last + 1)];
    } else if (this.offset === 3) {
      return [first, ...this.pageNumbers.slice(this.offset - 2, this.offset + 1), SEPARATOR, last];
    } else if (this.offset < 3) {
      return [...this.pageNumbers.slice(this.offset - 2, this.offset + 1), SEPARATOR, last];
    } else if (this.offset >= last - 2) {
      return [...this.pageNumbers.slice(this.offset - 2, this.offset + 1), SEPARATOR, last];
    } else if (this.offset > 3) {
      return [first, SEPARATOR, ...this.pageNumbers.slice(this.offset - 2, this.offset + 1), SEPARATOR, last];
    }

    return this.pageNumbers;
  }
}
export default PaginationStore;

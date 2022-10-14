// Core
import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Pagination.module.scss';

// Components
import Select from "@components/Select";
import { P } from "@components/Typography";
import Button from "@components/Button";

interface PaginationProps {
  className?: string;
  total: number;
  countInPage: number;
  setCountInPage:  React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const { Option } = Select;

const recordsVisible = [7, 15, 25, 50];

const Pagination: React.FC<PaginationProps> = ({
  total,
  countInPage,
  page,
  setPage,
  className,
  setCountInPage,
}) => {
  const { first, last} = React.useMemo(() => {
    const first = countInPage*(page - 1) + 1;
    const last = countInPage*page;

    return ({
      first: first<total ? first : total,
      last: last<total ? last : total });
  }, [countInPage, page, total]);

  const handlePrev = React.useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const handleNext = React.useCallback(() => {
    setPage(page + 1)
  }, [page]);

  return (
    <P size='large' className={classNames(styles.root, className)}>
      <span className={styles.select}>
        записей на странице
        <Select onChange={(selected) => setCountInPage(selected as number)} value={countInPage} clearable={false} >
          {
            recordsVisible.map((number) => <Option value={number} label={`${number}`} />)
          }
        </Select>
      </span>

      <span className={styles.recordVisible}>
        {`${first}-${last} из ${total}`}
      </span>

      <span className={styles.control}>
        <Button shape='circle' variant='text' className={styles.button} onClick={handlePrev} disabled={first - 1 <= 0}> <i className='icon-chevron-left'/> </Button>

        <Button shape='circle' variant='text' className={styles.button} onClick={handleNext} disabled={last >= total}> <i className='icon-chevron-right'/> </Button>
      </span>
    </P>
  )
};

// Exports
export default Pagination;

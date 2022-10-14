// Core
import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

// Components
import Select, { SelectProps } from '../Select';

// Styles
import styles from './AsyncSelect.module.scss';
import withReduxForm from '../../helpers/withReduxFormw';

// Types
export interface FilterResult<D> {
    total: number;
    result: D[];
}

type TValue = string | number;

export interface AsyncSelectProps<TData = any>
    extends Omit<SelectProps, 'value' | 'onChange' | 'children'> {
    value?: TValue | null;
    onChange?: (val: TValue) => void;
    fetch: (query: string, page: number) => Promise<FilterResult<TData>>;
    fetchOne: (value: TValue) => Promise<TData>;
    dataToValue: (data: TData) => TValue;
    dataToRender?: (data: TData) => string;
    NotFound?: React.ReactNode;
    defaultDisplayValue?: string | number | null;
}

const debounceDelay = 300;

type AsyncSelectInterface = <TData extends object>(
    props: PropsWithChildren<AsyncSelectProps<TData>>,
) => React.ReactElement | null;

interface AsyncSelectWithReduxInterface extends AsyncSelectInterface {
    Redux: typeof AsyncSelectRedux;
}

const AsyncSelect: AsyncSelectWithReduxInterface = <TData extends object>({
    fetch,
    fetchOne: fetchOneProp,
    value,
    dataToRender,
    dataToValue,
    defaultDisplayValue,
    ...props
}: PropsWithChildren<AsyncSelectProps<TData>>) => {
    const $timer = React.useRef<number | null>(null);
    const $inited = React.useRef<boolean>(false);

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<TData[]>([]);
    const [search, setSearch] = React.useState('');
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const loadData = async () => {
        setLoading(true);

        const response = await fetch(search, page);

        setLoading(false);
        setItems(page > 1 ? [...items, ...response.result] : response.result);
        setTotal(response.total);
    };

    const fetchOne = React.useCallback(async () => {
        setLoading(true);

        const item = await fetchOneProp(value!);

        setItems([item]);
        setLoading(false);
    }, [fetchOneProp, value]);

    const scheduleFetch = () => {
        if ($timer.current !== null) {
            clearTimeout($timer.current);
        }

        $timer.current = setTimeout(loadData, debounceDelay) as any;
    };

    const handleScroll = (event: React.UIEvent) => {
        if (loading || items.length >= total) {
            return;
        }

        const { offsetHeight, scrollHeight, scrollTop } = event.target as any;

        if (scrollHeight - offsetHeight === scrollTop) {
            setPage((prev) => prev + 1);
        }
    };
    React.useEffect(() => {
        if ($inited.current) {
            scheduleFetch();
        } else {
            $inited.current = true;
        }
    }, [search, page]);

    React.useEffect(() => {rowgroup
        if (value) {
            fetchOne();
        }
    }, [fetchOne, value]);

    React.useEffect(() => {
        setItems([]);
    }, [value]);

    return (
        <Select
            onScroll={handleScroll}
            onOpen={loadData}
            onClose={() => setPage(1)}
            onInput={(value) => setSearch(value)}
            value={value}
            defaultDisplayValue={defaultDisplayValue}
            {...props}
        >
            {items.map((item, index) => (
                <Select.Option
                    label={
                        (dataToRender?.(item) ?? dataToValue(item)) as string
                    }
                    value={dataToValue(item)}
                    key={(item as any).id ?? (dataToValue(item) || index)}
                />
            ))}
            {items.length === 0 && (
                <div className={classNames(styles.loading, styles.notFound)}>
                    {' '}
                    Ничего не найдено.{' '}
                </div>
            )}
            {loading && <div className={styles.loading}> Загрузка... </div>}
        </Select>
    );
};

const AsyncSelectRedux = withReduxForm(AsyncSelect);

AsyncSelect.Redux = AsyncSelectRedux;

// Exports
export default AsyncSelect;

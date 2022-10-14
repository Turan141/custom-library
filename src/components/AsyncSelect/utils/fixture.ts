export interface FixtureDTO {
    id: number;
    title: string;
    meta?: any;
}

export const createFixture = (meta?: (n: number) => any): FixtureDTO[] => {
    const arr = new Array(100).fill(1);

    return Object.keys(arr).map((number) => ({
        id: Number(number),
        title: `Вариант ${number}`,
        meta: meta?.(Number(number)),
    }))
}
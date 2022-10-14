import {createFixture, FixtureDTO} from "@components/AsyncSelect/utils/fixture";
import {FilterResult} from "@components/AsyncSelect/AsyncSelect";

const data = createFixture();
const COUNT_IN_PAGE = 15;

function getSlice(page: number) {
    return data.slice((page-1)*COUNT_IN_PAGE, page*COUNT_IN_PAGE)
}

export default class FixtureApi {

    getOptions = (query: string, page: number): Promise<FilterResult<FixtureDTO>> => {
        return Promise.resolve({
            total: data.length,
            result: getSlice(page).filter(item => item.title.includes(query))
        })
    }

    getOne(id: number | string): Promise<FixtureDTO> {
        return Promise.resolve(data.find(item => item.id === Number(id))!)
    }
}
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import AsyncSelect, { AsyncSelectProps } from './AsyncSelect';
import {FixtureDTO} from "@components/AsyncSelect/utils/fixture";
import FixtureApi from "@components/AsyncSelect/utils/api";

export default {
    title: 'Async Select',
    component: AsyncSelect,
    parameters: {
        docs: {
            description: {
                component: 'AsyncSelect для выбора варианта ответа с возможностью поиска их по базе данных, со связью с backend'
            }
        }
    }
} as Meta;

const fixtureApi = new FixtureApi();

const Template: Story<AsyncSelectProps> = (args) => <AsyncSelect<FixtureDTO>
    dataToValue={item => item.id}
    fetch={fixtureApi.getOptions}
    fetchOne={fixtureApi.getOne}
    dataToRender={item => item.title}
    onChange={console.log}
/>

export const Base = Template.bind({});
Base.args = {}
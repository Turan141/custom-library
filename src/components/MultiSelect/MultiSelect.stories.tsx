import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import MultiSelect, { MultiSelectProps } from "./MultiSelect";

export default {
    title: 'MultiSelect',
    component: MultiSelect,
    parameters: {
        docs: {
            description: {
                component: 'MultiSelect для выбора нескольких из заданных вариантов ответа.'
            }
        }
    }
} as Meta;

const { Option } = MultiSelect;

const Template: Story<MultiSelectProps> = (args) => {
    const [state, setState] = React.useState<any[]>([]);
    const [values, setValues] = React.useState<any[]>([]);

    return (
        <MultiSelect {...args} value={values} selected={state}>
            <Option value={1} label="Первый вариант ответа" onClick={ () => {
                console.log('CLICK')
                setValues(['12','123', '333'])
                setState([{value: '12', label: '123'}])

            }}/>
            <Option value={2} label="Второй вариант ответа"/>
            <Option value={3} label="Третий вариант ответа"/>
            <Option value={4} label="Четвёртый вариант ответа"/>
        </MultiSelect>
    )
}

export const Base = Template.bind({});
Base.args = {label: 'MultiSelect', name: 'MultiSelect', id: 'MultiSelect'}

import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Select, { SelectProps } from "./Select";

export default {
    title: 'Select',
    component: Select,
    parameters: {
        docs: {
            description: {
                component: 'Select для выбора одного варианта из предложенных'
            }
        }
    },
    argTypes: {
        error: {
            description: 'Отображает ошибку',
            control: { type: 'text' }
        }
    }
} as Meta;

const Template: Story<SelectProps> = (args) => {
    const [value, setValue] = React.useState<string | number | null>(null);

    return (
        <Select value={value} onChange={setValue} {...args}>
            <Select.Option value={1} label='Первый вариант'/>
            <Select.Option value={2} label='Второй вариант'/>
        </Select>
    )
}

export const Base = Template.bind({});
Base.args = {name: 'Select', id: 'Select', label: 'Select'}
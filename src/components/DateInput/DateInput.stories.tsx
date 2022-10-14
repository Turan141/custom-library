import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import DateInput from './DateInput';
import { NumberFormatProps } from "react-number-format";

export default {
    title: 'DateInput',
    component: DateInput,
    parameters: {
        docs: {
            description: {
                component: 'Маскированный компонент для ручного заполнения даты.'
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

const Template: Story<NumberFormatProps> = (args) => <DateInput {...args} />

export const Base = Template.bind({});
Base.args = {label: 'DateInput', name: 'input', id: 'DateInput'}
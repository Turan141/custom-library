import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Textarea, { TextareaProps } from "./Textarea";

export default {
    title: 'Textarea',
    component: Textarea,
    parameters: {
        docs: {
            description: {
                component: 'Textarea для ввода больших текстов'
            }
        }
    }
} as Meta;

const Template: Story<TextareaProps> = (args) => {
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback((event: React.FormEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value)
    }, []);

    return (
        <Textarea {...args} value={value} onChange={onChange}/>
    )
}

export const Base = Template.bind({});
Base.args = {name: 'Textarea', id: 'Textarea', label: 'Textarea'}
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Input, { InputProps } from './Input';
import PhoneField from '@components/PhoneField';
import PasswordField from '@components/PasswordField';
import { NumberFormatProps } from 'react-number-format';
import SearchField from '@components/SearchField';
import FileInput from '@components/FileInput';

export default {
    title: 'Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component: 'Текстовый инпут.',
            },
        },
    },
    argTypes: {
        error: {
            description: 'Отображает ошибку',
            control: { type: 'text' },
        },
    },
} as Meta;

const Template: Story<InputProps> = (args) => {
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
        },
        [],
    );

    return <Input {...args} value={value} onChange={onChange} />;
};

const PhoneTemplate: Story<NumberFormatProps> = (args) => {
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
        },
        [],
    );

    return <PhoneField {...args} value={value} onChange={onChange} />;
};

const PasswordTemplate: Story<InputProps> = (args) => {
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
        },
        [],
    );

    return <PasswordField {...args} value={value} onChange={onChange} />;
};

const FileInputTemplate: Story<React.InputHTMLAttributes<HTMLInputElement>> = (
    args,
) => {
    return <FileInput error={'ошибка'} />;
};

const SearchTemplate: Story<React.InputHTMLAttributes<HTMLInputElement>> = (
    args,
) => {
    const [value, setValue] = React.useState('');

    const onChange = React.useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
        },
        [],
    );

    return <SearchField {...args} value={value} onChange={onChange} />;
};

export const Base = Template.bind({});
export const Phone = PhoneTemplate.bind({});
export const Password = PasswordTemplate.bind({});
export const Search = SearchTemplate.bind({});
export const File = FileInputTemplate.bind({});

Base.args = { label: 'Input for text', name: 'input', id: 'Input' };

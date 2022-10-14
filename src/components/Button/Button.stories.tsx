import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Button, { ButtonProps } from "./Button";

export default {
    title: 'Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: 'Базовая кнопка в UI-kit'
            }
        }
    }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Base = Template.bind({});
Base.args = {children: 'Button'}
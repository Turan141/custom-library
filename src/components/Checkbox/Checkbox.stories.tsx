import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Checkbox , { CheckboxProps } from "./Checkbox";

export default {
    title: 'Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: 'Чекбокс - элемент формы'
            },
        }
    },
    argTypes: {

    }
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />

export const Base = Template.bind({});
Base.args = {label: 'Checkbox', name: 'name', disabled: true, checked: true, defaultChecked: true}
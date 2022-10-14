import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import RadioButton, {RadioButtonProps} from "@components/RadioButton/RadioButton";
import {useState} from "react";

export default {
    title: 'RadioButton',
    component: RadioButton,
    parameters: {
        docs: {
            description: {
                component: 'RadioButton - элемент формы'
            },
        }
    }
} as Meta;

const Template: Story<RadioButtonProps> = () => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    return (
            <>
                <RadioButton label="RadioButton 1" name="1" checked={checked1} onChange={setChecked1}/>
                <RadioButton label="RadioButton 2" name="2" checked={checked2} onChange={setChecked2}/>
            </>
        )
}

export const Base = Template.bind({});

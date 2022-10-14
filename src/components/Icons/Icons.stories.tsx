import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Icon , { IconProps } from "./Icon";

export default {
    title: 'Icon',
    component: Icon,
    parameters: {
        docs: {
            description: {
                component: 'Иконка для дополнительной информации    '
            }
        }
    }
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Base = Template.bind({});
Base.args = {name: 'Travel'}
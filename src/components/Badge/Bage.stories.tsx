import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Badge, { BadgeProps } from './Badge';
import Avatar from "@components/Avatar";
import avatar from '../../assets/images/profile.png'

export default {
    title: 'Badge',
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: 'Badge для отображения маленького кол-ва информации'
            }
        }
    }
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />

export const Base = Template.bind({});
Base.args = {content: '11', children: <Avatar src={avatar} alt='avatar'/>}
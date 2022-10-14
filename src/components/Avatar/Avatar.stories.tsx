import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Avatar , { AvatarProps } from "./Avatar";
import image from '@assets/images/profile.png';

export default {
    title: 'Avatar',
    component: Avatar,
    parameters: {
        docs: {
            description: {
                component: 'Базовая кнопка в UI-kit'
            }
        }
    }
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const Base = Template.bind({});
Base.args = {src: image, alt: 'avatar'}

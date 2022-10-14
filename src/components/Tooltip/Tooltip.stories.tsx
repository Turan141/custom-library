import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Tooltip, { TooltipProps } from './Tooltip';
import Button from "@components/Button";

export default {
    title: 'Tooltip',
    component: Tooltip,
    parameters: {
        docs: {
            description: {
                component: 'Tooltip, он же хинт, показывает дополнительную информацию.'
            }
        }
    }
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />

export const Base = Template.bind({});
Base.args = {title: 'more text for button', children: <Button> short </Button>}
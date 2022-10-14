import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Timer, { TimerProps } from "./Timer";

export default {
    title: 'Timer',
    component: Timer,
    parameters: {
        docs: {
            description: {
                component: 'Timer для обратного отсчёта времени. Можно передать onTick и onFinish. Время принимается в секундах.'
            }
        }
    }
} as Meta;

const Template: Story<TimerProps> = (args) => <Timer {...args} />

export const Base = Template.bind({});
Base.args = {time: 3000}
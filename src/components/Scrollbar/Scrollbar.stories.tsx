import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Scrollbar, { ScrollbarProps } from './Scrollbar';

export default {
    title: 'Scrollbar',
    component: Scrollbar,
    parameters: {
        docs: {
            description: {
                component: 'Scrollbar для прокрутки длинного контента. !Наследует высоту от родительского компонента!. '
            }
        }
    }
} as Meta;

const Template: Story<ScrollbarProps> = (args) => (
    <div style={{height: 150}}>
        <Scrollbar {...args}>
            {
                (new Array(100)).fill(1).map((_, index) => <div> Item {index}</div>)
            }
        </Scrollbar>
    </div>
)

export const Base = Template.bind({});
Base.args = {}
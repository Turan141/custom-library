import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Tabs, { TabsProps } from './Tabs';

export default {
    title: 'Tabs',
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component: 'Табы для разделения контента',
            },
        },
    },
} as Meta;

const Template: Story<TabsProps> = (args) => {
    const [tab, setTab] = React.useState(1);
    return (
        <div>
            <Tabs {...args} onChange={setTab} value={tab}>
                <Tabs.Tab value={1} label="Первый таб" />
                <Tabs.Tab value={2} label="Второй таб" />
                <Tabs.Tab value={3} label="Третий таб" />
                <Tabs.Tab value={4} label="Четвёртый таб" />
                <Tabs.Tab value={5} label="Пятый таб" />
                <Tabs.Tab value={6} label="Шестой таб" />
                <Tabs.Tab value={7} label="Седьмой таб" />
                <Tabs.Tab value={8} label="Восьмой таб" />
            </Tabs>

            <Tabs.Panel value={tab} index={1}>
                Контент первого таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={2}>
                Контент второго таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={3}>
                Контент третьего таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={4}>
                Контент четвертого таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={5}>
                Контент пятого таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={6}>
                Контент шестого таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={7}>
                Контент седьмого таба
            </Tabs.Panel>
            <Tabs.Panel value={tab} index={8}>
                Контент восьмого таба
            </Tabs.Panel>
        </div>
    );
};

export const Base = Template.bind({});
Base.args = {};

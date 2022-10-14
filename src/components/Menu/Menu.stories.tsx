import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { withCssResources } from '@storybook/addon-cssresources';
import Menu, { MenuProps } from './Menu';
import Icon from "@components/Icons";

export default {
    title: 'Menu',
    component: Menu,
    subcomponents: {'Item': Menu.Item},
    parameters: {
        docs: {
            description: {
                component: 'Контекстное меню для быстрых взаимодействий.'
            }
        },
        cssresources: [
            {
                id:'Icomoon',
                code: '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/icomoon@1.0.0/style.css">',
                picked: true,
            },
            {
                id:'CustomLink',
                code: `<style>i.icon-archiv:before { content: "\\e906\""";}</style>`,
                picked: true,
            },
        ]
    },
    decorators: [withCssResources],
} as Meta;

const trigger = (
    <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: "grey" }}>
        <Icon name="documentAdd" />
    </span>
)

const Template: Story<MenuProps> = (args, subcomponents) => <Menu trigger={trigger} {...args}>
    <Menu.Item {...subcomponents['Item']}>первый элемент</Menu.Item>
    <Menu.Item {...subcomponents['Item']}>второй элемент</Menu.Item>
    <Menu.Item icon={<i className="icon-archiv"></i>} isLink {...subcomponents['Item']}>элемент-ссылка</Menu.Item>
</Menu>

export const Base = Template.bind({});
Base.args = {}
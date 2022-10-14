import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { withCssResources } from '@storybook/addon-cssresources';
import Popup, { PopupProps } from './Popup';

export default {
    title: 'Popup',
    component: Popup,
    parameters: {
        docs: {
            description: {
                component: 'Всплывающее окно'
            }
        },
        cssresources: [
            {
                id:'PopupStyles',
                code: `<style>h1:hover{color: blue; cursor: pointer;} p:hover{color: green; cursor: pointer;}</style>`,
                picked: true,
            },
        ]
    },
    decorators: [withCssResources],
} as Meta;

const trigger = (
    <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: "grey" }}>
        <button>Открыть</button>
    </span>
)


const Template: Story<PopupProps> = () => (
    <Popup
        trigger={trigger}
        onClose={() => { console.log("Попап закрылся") }}
        renderChildren={
        (close: () => void) => (
            <div>
                <h1>Заголовок</h1>
                <p>Абзац</p>
                <button onClick={close}>Закрыть</button>
            </div>
        )
    }>
    </Popup>
)

export const Base = Template.bind({});
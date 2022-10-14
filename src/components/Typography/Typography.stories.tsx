import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Typography, {
    H1 as H1Component,
    H2 as H2Component,
    H4 as H4Component,
    H5 as H5Component,
    P as PComponent,
    TypographyProps
} from './Typography';

export default {
    title: 'Typography',
    component: Typography,
    parameters: {
        docs: {
            description: {
                component: 'Варианты типографики.'
            }
        }
    }
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />
const H1Tamplate: Story<TypographyProps> = (args) => <H1Component {...args}>H1</H1Component>
const H2Tamplate: Story<TypographyProps> = (args) => <H2Component {...args}>H2</H2Component>
const H4Tamplate: Story<TypographyProps> = (args) => <H4Component {...args}>H4</H4Component>
const H5Tamplate: Story<TypographyProps> = (args) => <H5Component {...args}>H5</H5Component>
const PTamplate: Story<TypographyProps> = (args) => <PComponent {...args}>P</PComponent>

export const Base = Template.bind({});
export const H1 = H1Tamplate.bind({});
export const H2 = H2Tamplate.bind({});
export const H4 = H4Tamplate.bind({});
export const H5 = H5Tamplate.bind({});
export const P = PTamplate.bind({});

Base.args = { children: 'You can configurate this phrase ', variant: "p", size: "medium" }
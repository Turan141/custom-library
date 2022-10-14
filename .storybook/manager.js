import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from '../src/assets/images/logo_black.svg';

const theme = create({
    appBg: '#F5F9FF',
    brandTitle: 'UTG Group',
    brandImage: logo
});

addons.setConfig(theme);
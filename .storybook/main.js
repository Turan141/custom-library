const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../src/assets/icons');

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-cssresources',
    ],

    webpackFinal: async (config) => {
        config.resolve.plugins.push(new TsconfigPathsPlugin());

        const getStyleLoaders = (preProcessor) => {
            const loaders = [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]-[hash:base64:6]',
                        },
                    },
                },
                { loader: 'postcss-loader' },
            ];

            if (preProcessor) {
                loaders.push(
                    { loader: 'resolve-url-loader' },
                    { loader: preProcessor },
                );
            }

            return loaders;
        };

        config.module.rules.push({
            test: /\.(css)$/,
            use: getStyleLoaders(),
            include: path.resolve(__dirname, '../'),
        });

        config.module.rules.push({
            test: /\.(scss)$/,
            use: getStyleLoaders('sass-loader'),
            include: path.resolve(__dirname, '../'),
        });

        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test.test('.svg'),
        );
        fileLoaderRule.exclude = pathToInlineSvg;

        config.module.rules.push({
            test: /\.svg$/,
            include: pathToInlineSvg,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                    },
                },
            ],
        });

        config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');

        config.resolve.alias = {
            ...config.resolve.alias,
            '@api': path.resolve(__dirname, './src/api'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@utils': path.resolve(__dirname, './src/utils'),
        };

        return config;
    },
};

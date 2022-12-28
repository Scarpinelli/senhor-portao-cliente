module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        assets: './src/assets',
                        components: './src/components',
                        contexts: './src/contexts',
                        models: './src/models',
                        pages: './src/pages',
                        routes: '/src/routes',
                        styles: './src/styles',
                        services: './src/services',
                        types: './src/types',
                        utils: './src/utils',
                    },

                    extensions: [
                        '.js',
                        '.jsx',
                        '.ts',
                        '.tsx',
                        '.android.js',
                        '.android.tsx',
                        '.ios.js',
                        '.ios.tsx',
                    ],
                },
            ],
            'react-native-reanimated/plugin',
        ],
    }
}

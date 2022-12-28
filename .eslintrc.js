/* eslint-disable prettier/prettier */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',

        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    ignorePatterns: ['*.test.js', '*.test.tsx'],
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'import',
        'prettier',
    ],
    rules: {
        'react/jsx-no-constructed-context-values': 'off',
        'no-unreachable': 'off',
        'import/no-cycle': 'off',
        'import/named': 2,
        'import/namespace': 2,
        'import/default': 2,
        'import/export': 2,
        'import/no-unresolved': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'import/no-duplicates': 'error',

        'prettier/prettier': [
            'off',

            {
                endOfLine: 'auto',
            },
        ],
        'no-plusplus': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'react/style-prop-object': 'off',

        'react/jsx-filename-extension': [
            'warn',

            {
                extensions: ['.js', '.jsx', '.tsx', '.ts'],
            },
        ],

        'import/prefer-default-export': 'off',

        'react/state-in-constructor': 'off',

        'react/static-property-placement': 'off',

        'react/jsx-props-no-spreading': 'off',

        'react/prop-types': 'off',

        'react/require-default-props': 'off',

        'react/no-array-index-key': 'off',

        'no-param-reassign': 'off',

        'no-console': 'off',

        'no-use-before-define': 'off',

        'no-unused-vars': 'off',

        'global-require': 'off',

        camelcase: 'off',

        '@typescript-eslint/no-unused-vars': 'off',

        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/no-empty-function': 'off',

        '@typescript-eslint/no-explicit-any': 'off',

        'import/no-extraneous-dependencies': 'off',

        'no-unused-expressions': 'off',

        'no-nested-ternary': 'off',

        'react/destructuring-assignment': 'off',

        'import/extensions': [
            'error',

            'ignorePackages',

            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        'react/function-component-definition': 'off',
        'consistent-return': 'off',
        'no-unsafe-optional-chaining': 'off',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                typescript: {},
                paths: [
                    'src',
                    'assets',
                    'components',
                    'models',
                    'pages',
                    'services',
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
}

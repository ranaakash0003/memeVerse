module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2020: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        'no-console': 0,
        'global-require': 0,
        indent: ['error', 4],
    },
};

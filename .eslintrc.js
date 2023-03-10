module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint",
        "prettier",
    ],
    "rules": {
        "prettier/prettier": [
            1,
            {
                trailingComma: "es5",
                singleQuote: true,
                semi: false,
            },
        ],
        ...require('eslint-config-prettier').rules,
        ...require('eslint-config-prettier/@typescript-eslint').rules,
    },
}
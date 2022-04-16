module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "rules": {
        "vue/comment-directive": ["error", {
            "reportUnusedDisableDirectives": false
          }],
          "no-debugger": 0
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6
    },
}
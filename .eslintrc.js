module.exports = {
    "extends": [
        "airbnb",
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "never"],
        "no-undef": 0,
        "no-underscore-dangle": 0,
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0,
        "react/require-default-props": 0,
        "exceptMethods": [
            "componentDidMount",
            "componentDidUpdate",
            "componentWillMount",
            "componentWillReceiveProps",
            "componentWillUnmount",
            "componentWillUpdate",
            "render",
            "shouldComponentUpdate",
        ]
    }
};
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                "color-primary": "#1F3264",
                "color-primary-hover": "#012042",
                "color-secondary": "#2584db",
                // "color-primary": "#ab0226",
                // "color-primary-hover": "#80001b",
                // "color-secondary": "#f79059",
            },
        },
    },
    safelist: [
        {
            pattern: /(bg|text|border)-(color-primary|color-secondary)/,
        },
    ],

    // plugins: [require('@tailwindcss/forms')],
});

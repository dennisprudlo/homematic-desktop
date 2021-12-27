const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './src/**/*.vue'
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: colors.blue['700'],
                    ...colors.blue
                }
            },
        },
    },
    plugins: [],
}

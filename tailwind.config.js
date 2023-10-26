import defaultTheme  from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'sans': ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors : {
                'primary': "#E69332",
                'secondary': "#DF3B57"
            }
        },
    },
    plugins: [],
}


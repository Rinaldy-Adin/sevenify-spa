import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';

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
            colors: {
                'primary': "#E69332",
                'secondary': "#DF3B57"
            }
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#E69332",
                    "secondary": "#DF3B57",
                    "accent": "#1dcdbc",
                    "neutral": "#2b3440",
                    "base-100": "#ffffff",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
    },
    plugins: [daisyui],
}


/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Green Tones
				'deep-forest': '#0C221F',
				'hunter-green': '#232F2D',
				evergreen: '#142E2B',
				'moss-green': '#43A57C',
				'sage-green': '#7BB99F',
				'spring-fern': '#32C653',
				'pale-jade': '#B3DFC9',
				'seafoam-green': '#E6F2ED',

				//Blue Tones
				'dark-indigo': '#272934',
				'deep-teal': '#1A3835',
				'midnight-steel': '#404B57',
				'slate-mist': '#6C6D75',
				'steel-blue': '#242834',
				'nightfall-navy': '#505475',
				'blue-grey': '#788489',
				'luminous-azure': '#3973F8',
				'cerulean-breeze': '#3491FA',
				'winter-mint': '#E9F3F2',

				// Grey Tones
				'midnight-grey': '#292929',
				'shadow-slate': '#3F3F3F',
				'charcoal-grey': '#57585F',
				'whispering-gray': '#9EA1B0',
				'silver-mist': '#CECECE',
				'light-silver': '#D9D9D9',
				'ashen-grey': '#DFE3E1',

				// Purple Tones
				'mystic-amethyst': '#9D5FF3',
				'misty-lavender': '#B1B5CA',
				'misty-moonstone': '#CACCD2',
				'silvery-sky': '#C3C8CD',
				'opal-mist': '#EBF4F1',
				'cloudy-pearl': '#F5F6FB',

				// White Tones
				'frost-white': '#FCFDFC',
				'aqua-haze': '#F5FFFA',

				// Orange Tones
				'spicy-apricot': '#FF9F5A',
				'golden-tangerine': '#FFB341',
			},
			fontFamily: {
				'inter-regular': ['Inter-Regular', 'sans-serif'],
				'inter-medium': ['Inter-Medium', 'sans-serif'],
				'inter-semi-bold': ['Inter-SemiBold', 'sans-serif'],
				'inter-bold': ['Inter-Bold', 'sans-serif'],
				'gilroy-regular': ['Gilroy-Regular', 'sans-serif'],
				'gilroy-medium': ['Gilroy-Medium', 'sans-serif'],
				'gilroy-semi-bold': ['Gilroy-SemiBold', 'sans-serif'],
				'gilroy-bold': ['Gilroy-Bold', 'sans-serif'],
				'helvetica-neue-regular': ['HelveticaNeue-Regular', 'sans-serif'],
				'helvetica-neue-medium': ['HelveticaNeue-Medium', 'sans-serif'],
				'helvetica-neue-bold': ['HelveticaNeue-Bold', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				offWhite: "#f2f2f2",
				offWhite2: "#f3f3f3",
				ash: "#828282",
				darkGrey: "#333333",
				primaryBlue: "#2f80ed",
				secondaryBlue: "#2d9cdb",
				errorRed: "#ff414e",
				transparentBlack: "rgba(0, 0, 0, 0.5)",
			},
			boxShadow: {
				soft: "0px 2px 4px rgba(0, 0, 0, 0.05)",
			},
			fontFamily: {
				notoSans: ["Noto Sans", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			borderRadius: {
				horizontalBar: "8px 8px 0px 0px",
				verticalBar: "0px 4px 4px 0px",
			},
		},
	},
	plugins: [],
};

import { defineTheme } from '@directus/extensions-sdk';

/**
 * ResearchEdit4U Light Theme
 * Matches the design system: logo #0b3c71, ink #111827, CTA #1d4ed8, backgrounds #f9fafb / #f2f7fa.
 */
export default defineTheme({
	id: 'researchedit4u-light',
	name: 'ResearchEdit4U Light',
	appearance: 'light',
	rules: {
		borderRadius: '10px',
		borderWidth: '2px',

		foreground: '#111827',
		foregroundAccent: '#111827',
		foregroundSubdued: '#6b7280',

		background: '#ffffff',
		backgroundNormal: '#f9fafb',
		backgroundAccent: '#f2f7fa',
		backgroundSubdued: '#f2f7fa',

		borderColor: '#dde6ec',
		borderColorAccent: '#dde6ec',
		borderColorSubdued: '#e4eaf1',

		primary: '#0b3c71',
		primaryBackground: 'color-mix(in srgb, #ffffff, #0b3c71 10%)',
		primarySubdued: 'color-mix(in srgb, #ffffff, #0b3c71 50%)',
		primaryAccent: 'color-mix(in srgb, #0b3c71, #111827 25%)',

		secondary: '#1d4ed8',
		secondaryBackground: 'color-mix(in srgb, #ffffff, #1d4ed8 10%)',
		secondarySubdued: 'color-mix(in srgb, #ffffff, #1d4ed8 50%)',
		secondaryAccent: 'color-mix(in srgb, #1d4ed8, #111827 25%)',

		success: '#166534',
		successBackground: 'color-mix(in srgb, #ffffff, #166534 10%)',
		successSubdued: 'color-mix(in srgb, #ffffff, #166534 50%)',
		successAccent: 'color-mix(in srgb, #166534, #111827 25%)',

		warning: '#ffa439',
		warningBackground: 'color-mix(in srgb, #ffffff, #ffa439 10%)',
		warningSubdued: 'color-mix(in srgb, #ffffff, #ffa439 50%)',
		warningAccent: 'color-mix(in srgb, #ffa439, #111827 25%)',

		danger: '#e35169',
		dangerBackground: 'color-mix(in srgb, #ffffff, #e35169 10%)',
		dangerSubdued: 'color-mix(in srgb, #ffffff, #e35169 50%)',
		dangerAccent: 'color-mix(in srgb, #e35169, #111827 25%)',

		fonts: {
			display: {
				fontFamily: '"Inter", system-ui',
				fontWeight: '700',
			},
			sans: {
				fontFamily: '"Inter", system-ui',
				fontWeight: '500',
			},
			serif: {
				fontFamily: '"Merriweather", serif',
				fontWeight: '500',
			},
			monospace: {
				fontFamily: '"Fira Mono", monospace',
				fontWeight: '500',
			},
		},

		navigation: {
			background: '#f9fafb',
			backgroundAccent: '#f2f7fa',

			borderColor: 'transparent',
			borderWidth: '0px',

			project: {
				borderColor: 'transparent',
				borderWidth: '0px',
				background: '#f2f7fa',
				foreground: '#0b3c71',
				fontFamily: 'var(--theme--fonts--sans--font-family)',
			},

			modules: {
				background: '#0b3c71',
				borderColor: 'transparent',
				borderWidth: '0px',

				button: {
					foreground: 'rgba(255, 255, 255, 0.75)',
					foregroundHover: '#ffffff',
					foregroundActive: '#ffffff',

					background: 'transparent',
					backgroundHover: 'transparent',
					backgroundActive: '#f9fafb',
				},
			},

			list: {
				icon: {
					foreground: 'var(--theme--primary)',
					foregroundHover: 'var(--theme--navigation--list--icon--foreground)',
					foregroundActive: 'var(--theme--navigation--list--icon--foreground)',
				},

				foreground: '#111827',
				foregroundHover: 'var(--theme--navigation--list--foreground)',
				foregroundActive: 'var(--theme--navigation--list--foreground)',

				background: 'transparent',
				backgroundHover: 'var(--theme--navigation--background-accent)',
				backgroundActive: 'var(--theme--navigation--background-accent)',

				fontFamily: 'var(--theme--fonts--sans--font-family)',

				divider: {
					borderColor: 'var(--theme--border-color-accent)',
					borderWidth: 'var(--theme--border-width)',
				},
			},
		},

		header: {
			background: 'var(--theme--background)',
			borderColor: 'transparent',
			borderWidth: '0px',
			boxShadow: '0 4px 7px -4px rgb(0 0 0 / 0.2)',
			headline: {
				foreground: 'var(--theme--foreground-subdued)',
				fontFamily: 'var(--theme--fonts--sans--font-family)',
			},
			title: {
				foreground: '#111827',
				fontFamily: 'var(--theme--fonts--display--font-family)',
				fontWeight: 'var(--theme--fonts--display--font-weight)',
			},
		},

		form: {
			columnGap: '32px',
			rowGap: '40px',

			field: {
				label: {
					foreground: '#111827',
					fontFamily: 'var(--theme--fonts--sans--font-family)',
					fontWeight: '600',
				},
				input: {
					background: 'var(--theme--background)',
					backgroundSubdued: 'var(--theme--background-subdued)',

					foreground: 'var(--theme--foreground)',
					foregroundSubdued: 'var(--theme--foreground-subdued)',

					borderColor: 'var(--theme--border-color)',
					borderColorHover: 'var(--theme--border-color-accent)',
					borderColorFocus: 'var(--theme--primary)',

					boxShadow: 'none',
					boxShadowHover: 'none',
					boxShadowFocus: '0 0 16px -8px var(--theme--primary)',

					height: '60px',
					padding: '16px',
				},
			},
		},

		sidebar: {
			background: 'var(--theme--background-normal)',
			foreground: 'var(--theme--foreground-subdued)',
			fontFamily: 'var(--theme--fonts--sans--font-family)',
			borderColor: 'transparent',
			borderWidth: '0px',

			section: {
				toggle: {
					icon: {
						foreground: 'var(--theme--foreground-accent)',
						foregroundHover: 'var(--theme--sidebar--section--toggle--icon--foreground)',
						foregroundActive: 'var(--theme--sidebar--section--toggle--icon--foreground)',
					},

					foreground: 'var(--theme--foreground-accent)',
					foregroundHover: 'var(--theme--sidebar--section--toggle--foreground)',
					foregroundActive: 'var(--theme--sidebar--section--toggle--foreground)',

					background: 'var(--theme--background-accent)',
					backgroundHover: 'var(--theme--sidebar--section--toggle--background)',
					backgroundActive: 'var(--theme--sidebar--section--toggle--background)',

					fontFamily: 'var(--theme--fonts--sans--font-family)',

					borderColor: 'transparent',
					borderWidth: '0px',
				},

				form: {
					columnGap: 'var(--theme--form--column-gap)',
					rowGap: 'var(--theme--form--row-gap)',

					label: {
						foreground: 'var(--theme--form--field--label--foreground)',
						fontFamily: 'var(--theme--form--field--label--font-family)',
					},

					field: {
						input: {
							background: 'var(--theme--form--field--input--background)',
							foreground: 'var(--theme--form--field--input--foreground)',
							foregroundSubdued: 'var(--theme--form--field--input--foreground-subdued)',

							borderColor: 'var(--theme--form--field--input--border-color)',
							borderColorHover: 'var(--theme--form--field--input--border-color-hover)',
							borderColorFocus: 'var(--theme--form--field--input--border-color-focus)',

							boxShadow: 'var(--theme--form--field--input--box-shadow)',
							boxShadowHover: 'var(--theme--form--field--input--box-shadow-hover)',
							boxShadowFocus: 'var(--theme--form--field--input--box-shadow-focus)',

							height: '52px',
							padding: '12px',
						},
					},
				},
			},
		},

		public: {
			background: 'var(--theme--background)',
			foreground: 'var(--theme--foreground)',
			foregroundAccent: 'var(--theme--foreground-accent)',

			art: {
				background: '#0b3c71',
				primary: 'var(--theme--primary)',
				secondary: 'var(--theme--secondary)',
				speed: '1',
			},

			form: {
				columnGap: 'var(--theme--form--column-gap)',
				rowGap: 'var(--theme--form--row-gap)',

				label: {
					foreground: 'var(--theme--form--field--label--foreground)',
					fontFamily: 'var(--theme--form--field--label--font-family)',
				},

				field: {
					input: {
						background: 'var(--theme--form--field--input--background)',
						foreground: 'var(--theme--form--field--input--foreground)',
						foregroundSubdued: 'var(--theme--form--field--input--foreground-subdued)',

						borderColor: 'var(--theme--form--field--input--border-color)',
						borderColorHover: 'var(--theme--form--field--input--border-color-hover)',
						borderColorFocus: 'var(--theme--form--field--input--border-color-focus)',

						boxShadow: 'var(--theme--form--field--input--box-shadow)',
						boxShadowHover: 'var(--theme--form--field--input--box-shadow-hover)',
						boxShadowFocus: 'var(--theme--form--field--input--box-shadow-focus)',

						height: 'var(--theme--form--field--input--height)',
						padding: 'var(--theme--form--field--input--padding)',
					},
				},
			},
		},

		popover: {
			menu: {
				background: '#fafcfd',
				borderRadius: 'var(--theme--border-radius)',
				boxShadow: '0px 0px 6px 0px rgb(17, 24, 39, 0.2), 0px 0px 12px 2px rgb(17, 24, 39, 0.05)',
			},
		},

		banner: {
			background: '#0b3c71',
			padding: '40px',
			borderRadius: 'var(--theme--border-radius)',

			avatar: {
				borderRadius: '50%',
				foreground: 'var(--theme--primary)',
				background: '#ffffff',
			},

			headline: {
				foreground: '#ffffff',
				fontFamily: 'var(--theme--fonts--sans--font-family)',
				fontWeight: 'var(--theme--fonts--sans--font-weight)',
			},

			title: {
				foreground: '#ffffff',
				fontFamily: 'var(--theme--fonts--display--font-family)',
				fontWeight: 'var(--theme--fonts--display--font-weight)',
			},

			subtitle: {
				foreground: 'rgba(255, 255, 255, 0.85)',
				fontFamily: 'var(--theme--fonts--monospace--font-family)',
				fontWeight: 'var(--theme--fonts--monospace--font-weight)',
			},

			art: {
				foreground: '#132644',
			},
		},
	},
});

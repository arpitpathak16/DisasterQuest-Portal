
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				"primary-foreground": 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				"secondary-foreground": 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				"destructive-foreground": 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				"muted-foreground": 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				"accent-foreground": 'hsl(var(--accent-foreground))',
				popover: 'hsl(var(--popover))',
				"popover-foreground": 'hsl(var(--popover-foreground))',
				card: 'hsl(var(--card))',
				"card-foreground": 'hsl(var(--card-foreground))',
				
				// Disaster management cycle colors
				"preimpact": "#a5c8f7",
				"emergency": "#f79f97",
				"restoration": "#c28fb6",
				"recovery": "#d8ef94",
				"mitigation": "#d7c0f7",
				"capacity": "#8372b4",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"pulse-slow": {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				"float": {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				"rotate-cycle": {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-slow": "pulse-slow 3s infinite ease-in-out",
				"float": "float 3s infinite ease-in-out",
				"rotate-cycle": "rotate-cycle 60s infinite linear",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

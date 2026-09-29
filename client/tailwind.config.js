/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Direct top-level tokens matching the spec
        forest: {
          DEFAULT: '#1F2A24',
          dark: '#151D19',
          light: '#2B3A32'
        },
        olive: {
          DEFAULT: '#34483D',
          hover: '#28382F',
          dark: '#1F2A24',
          light: '#E9ECE9'
        },
        sage: {
          DEFAULT: '#687C6B',
          light: '#E5ECE6',
          dark: '#54735B'
        },
        copper: {
          DEFAULT: '#B68B5E',
          hover: '#9F7549',
          light: '#F7EFE6',
          dark: '#8C643B'
        },
        sand: {
          DEFAULT: '#D8C6A5',
          light: '#ECE3D0',
          dark: '#C2AF8C'
        },
        cream: {
          DEFAULT: '#F5F0E6',
          light: '#FAF7F0',
          dark: '#EFE9DC'
        },
        bg: {
          DEFAULT: '#FCFAF5',
          page: '#FCFAF5'
        },
        amber: {
          DEFAULT: '#C9822B',
          light: '#FDF4E7',
          hover: '#B57224'
        },
        // Aliases for backwards compatibility with any existing prefixes
        clay: {
          forest: '#1F2A24',
          olive: '#34483D',
          'olive-hover': '#28382F',
          'olive-light': '#E9ECE9',
          sage: '#687C6B',
          'sage-light': '#E5ECE6',
          copper: '#B68B5E',
          'copper-hover': '#9F7549',
          'copper-light': '#F7EFE6',
          sand: '#D8C6A5',
          'sand-light': '#ECE3D0',
          'sand-dark': '#C2AF8C',
          cream: '#F5F0E6',
          'cream-light': '#FAF7F0',
          bg: '#FCFAF5',
          amber: '#C9822B',
          'amber-light': '#FDF4E7'
        },
        pravaah: {
          forest: '#1F2A24',
          olive: '#34483D',
          sage: '#687C6B',
          copper: '#B68B5E',
          sand: '#D8C6A5',
          cream: '#F5F0E6',
          bg: '#FCFAF5'
        },
        ledger: {
          ivory: '#FCFAF5',
          parchment: '#F5F0E6',
          'parchment-light': '#FAF7F0',
          paper: '#FFFFFF',
          ink: '#1F2A24',
          'ink-soft': '#34483D',
          'ink-muted': '#687C6B',
          border: '#D8C6A5',
          accent: '#B68B5E',
          verified: '#687C6B'
        }
      },
      fontFamily: {
        display: ['Fredoka', 'Nunito', 'sans-serif'],
        rounded: ['Fredoka', 'Nunito', 'sans-serif'],
        sans: ['Nunito', 'DM Sans', 'system-ui', 'sans-serif'],
        handwritten: ['Kalam', 'Caveat', 'cursive'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      boxShadow: {
        'warm-card': '0 8px 24px rgba(31, 42, 36, 0.08)',
        'warm-card-hover': '0 12px 32px rgba(31, 42, 36, 0.12)',
        'warm-sm': '0 2px 8px rgba(31, 42, 36, 0.05)',
        'warm-floating': '0 12px 36px rgba(31, 42, 36, 0.15)',
        'warm-pill': '0 4px 12px rgba(31, 42, 36, 0.06)',
        'button-primary': '0 4px 12px rgba(52, 72, 61, 0.25)',
        'button-copper': '0 4px 14px rgba(182, 139, 94, 0.35)',
        'button-secondary': '0 2px 6px rgba(31, 42, 36, 0.06)'
      },
      borderRadius: {
        'card': '24px',
        'card-sm': '20px',
        'pill': '9999px'
      }
    },
  },
  plugins: [],
}

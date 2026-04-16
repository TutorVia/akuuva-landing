import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      'var(--bg)',
        bg2:     'var(--bg2)',
        bg3:     'var(--bg3)',
        terra:   'var(--terra)',
        terra2:  'var(--terra2)',
        navy:    'var(--navy)',
        navy2:   'var(--navy2)',
        emerald: 'var(--emerald)',
        emerald2:'var(--emerald2)',
        spark:   'var(--spark)',
        amber:   'var(--amber)',
        danger:  'var(--danger)',
        ink:     'var(--ink)',
        mid:     'var(--mid)',
        sub:     'var(--sub)',
        rule:    'var(--rule)',
        rule2:   'var(--rule2)',
      },
      fontFamily: {
        serif: ['var(--serif)'],
        body:  ['var(--body)'],
        mono:  ['var(--mono)'],
      },
      borderRadius: {
        sm:   'var(--r-sm)',
        md:   'var(--r-md)',
        lg:   'var(--r-lg)',
        xl:   'var(--r-xl)',
        full: 'var(--r-full)',
      },
      spacing: {
        '2xs': 'var(--sp-2xs)',
        'xs':  'var(--sp-xs)',
        'sm':  'var(--sp-sm)',
        'md':  'var(--sp-md)',
        'lg':  'var(--sp-lg)',
        'xl':  'var(--sp-xl)',
        '2xl': 'var(--sp-2xl)',
        '3xl': 'var(--sp-3xl)',
      },
      transitionDuration: {
        micro:  'var(--dur-micro)',
        short:  'var(--dur-short)',
        medium: 'var(--dur-medium)',
        long:   'var(--dur-long)',
      },
    },
  },
  plugins: [],
}

export default config

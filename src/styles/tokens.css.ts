import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#3973a8',
    primaryHover: '#2d5e8a',
    secondary: '#e5e7eb',
    secondaryHover: '#d1d5db',
    danger: '#b54141',
    dangerHover: '#963535',
    text: '#222222',
    surface: '#ffffff',
    page: '#f3f3f3',
    border: '#cccccc',
    successBg: '#e4f1e7',
    successText: '#28613a',
    warningBg: '#f8efd9',
    warningText: '#795b13',
    errorBg: '#f6e2e0',
    errorText: '#8b302b',
  },
  space: {
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
  },
  radius: {
    control: '0.25rem',
    card: '0.25rem',
    pill: '999px',
  },
  shadow: {
    card: '0 1px 3px rgba(0, 0, 0, 0.12)',
  },
  font: {
    body: 'Arial, sans-serif',
  },
})

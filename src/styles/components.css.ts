import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from './tokens.css'

const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  border: '1px solid transparent',
  borderRadius: vars.radius.control,
  fontWeight: 700,
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },
})

export const buttonVariants = styleVariants({
  primary: [
    buttonBase,
    {
      background: vars.color.primary,
      color: vars.color.surface,
      selectors: {
        '&:not(:disabled):hover': { background: vars.color.primaryHover },
      },
    },
  ],
  secondary: [
    buttonBase,
    {
      borderColor: vars.color.border,
      background: vars.color.secondary,
      color: vars.color.text,
      selectors: {
        '&:not(:disabled):hover': { background: vars.color.secondaryHover },
      },
    },
  ],
  danger: [
    buttonBase,
    {
      background: vars.color.danger,
      color: vars.color.surface,
      selectors: {
        '&:not(:disabled):hover': { background: vars.color.dangerHover },
      },
    },
  ],
})

export const buttonSizes = styleVariants({
  small: {
    minHeight: '2rem',
    padding: `0 ${vars.space[3]}`,
    fontSize: '0.875rem',
  },
  large: {
    minHeight: '2.5rem',
    padding: `0 ${vars.space[4]}`,
    fontSize: '1rem',
  },
})

export const card = style({
  padding: vars.space[4],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.card,
  background: vars.color.surface,
  boxShadow: vars.shadow.card,
})

const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '1.75rem',
  padding: `0 ${vars.space[3]}`,
  borderRadius: vars.radius.pill,
  fontSize: '0.75rem',
  fontWeight: 700,
})

export const badgeVariants = styleVariants({
  success: [
    badgeBase,
    { background: vars.color.successBg, color: vars.color.successText },
  ],
  warning: [
    badgeBase,
    { background: vars.color.warningBg, color: vars.color.warningText },
  ],
  error: [
    badgeBase,
    { background: vars.color.errorBg, color: vars.color.errorText },
  ],
})

export const section = style({
  display: 'grid',
  gap: vars.space[3],
  '@media': {
    '(min-width: 700px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
  marginTop: vars.space[3],
})

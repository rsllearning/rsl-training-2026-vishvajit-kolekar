import { style } from '@vanilla-extract/css'
import { vars } from './tokens.css'

export const main = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: vars.space[4],
})

export const heading = style({
  margin: `0 0 ${vars.space[4]}`,
  fontSize: '1.5rem',
})

export const subtitle = style({
  margin: `0 0 ${vars.space[3]}`,
  fontSize: '1.125rem',
})

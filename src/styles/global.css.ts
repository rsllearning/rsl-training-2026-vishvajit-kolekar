import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  minWidth: '320px',
  background: vars.color.page,
  color: vars.color.text,
  fontFamily: vars.font.body,
})

globalStyle('button', {
  font: 'inherit',
})

globalStyle('button:focus-visible', {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: '2px',
})

import type { ButtonHTMLAttributes } from 'react'
import { buttonSizes, buttonVariants } from '../styles/components.css'

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export default function Button({
  variant = 'primary',
  size = 'large',
  className,
  ...props
}: ButtonProps) {
  const classes = [buttonVariants[variant], buttonSizes[size], className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} {...props} />
}

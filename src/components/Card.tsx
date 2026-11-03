import type { HTMLAttributes } from 'react'
import { card } from '../styles/components.css'

type CardProps = HTMLAttributes<HTMLElement>

export default function Card({ className, ...props }: CardProps) {
  return <article className={[card, className].filter(Boolean).join(' ')} {...props} />
}

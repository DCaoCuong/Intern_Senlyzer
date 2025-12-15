'use client'
import styled from 'styled-components'
import { ReactNode } from 'react'

interface ButtonProps {
  primary?: boolean;
  children?: ReactNode;
}

const Button = styled.button<ButtonProps>`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 12px 24px;
  border: 2px solid blue;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`

export default function StyledButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>
}
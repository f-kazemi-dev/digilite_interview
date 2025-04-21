import React from 'react'
import { Button as AntButton } from 'antd'
import { ButtonProps } from 'antd/lib'

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode
}

export const Button: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>
}

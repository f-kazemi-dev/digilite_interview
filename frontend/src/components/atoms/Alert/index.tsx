import React from 'react'
import { Alert as AntAlert, AlertProps } from 'antd'

export interface CustomAlertProps extends AlertProps {
  children?: React.ReactNode
  message?: string | null
  type: 'success' | 'info' | 'warning' | 'error'
  showIcon?: boolean
  style?: React.CSSProperties
}

export const Alert: React.FC<CustomAlertProps> = ({ children, ...props }) => {
  return <AntAlert {...props}>{children}</AntAlert>
}

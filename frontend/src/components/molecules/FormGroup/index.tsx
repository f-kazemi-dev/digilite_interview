import React from 'react'
import { Form as AntForm } from 'antd'
import { FormProps } from 'antd/lib'

export interface FormGroupProps extends FormProps {
  children: React.ReactNode
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, ...props }) => {
  return <AntForm {...props}>{children}</AntForm>
}

import React from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib'

export interface CustomFormItemProps extends FormItemProps {
  children: React.ReactNode
  label?: string
}

export const FormItem: React.FC<CustomFormItemProps> = ({ children, label, ...props }) => {
  return (
    <Form.Item label={label} {...props}>
      {children}
    </Form.Item>
  )
}

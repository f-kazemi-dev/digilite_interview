import React from 'react'
import { Input as AntInput } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'

interface CustomTextAreaProps extends TextAreaProps {
  label?: React.ReactNode | React.ReactElement
  rows?: number
}

export const TextArea: React.FC<CustomTextAreaProps> = ({ label, rows = 4, ...props }) => {
  return (
    <div className='textarea-wrapper'>
      {!!label && <label>{label}</label>}
      <AntInput.TextArea rows={rows} {...props} />
    </div>
  )
}

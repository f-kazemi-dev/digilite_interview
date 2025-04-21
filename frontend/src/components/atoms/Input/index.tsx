import React from 'react'
import { Input as AntInput } from 'antd'
import { InputProps } from 'antd/lib'

interface CustomInputProps extends InputProps {
  label?: React.ReactNode | React.ReactElement
}

export const Input: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className='input-wrapper'>
      {!!label && <label>{label}</label>}
      <AntInput {...props} />
    </div>
  )
}

import React from 'react'
import { Tag as AntTag } from 'antd'
import { TagProps } from 'antd/lib'

export interface CustomTagProps extends TagProps {
  children: React.ReactNode
}

export const Tag: React.FC<CustomTagProps> = ({ children, ...props }) => {
  return <AntTag {...props}>{children}</AntTag>
}

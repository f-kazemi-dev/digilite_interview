import React from 'react'
import { Typography } from 'antd'
import { TitleProps } from 'antd/lib/typography/Title'
const { Title } = Typography

export interface CustomTitleProps extends TitleProps {
  children: React.ReactNode
}

export const Titlee: React.FC<CustomTitleProps> = ({ children, ...props }) => {
  return <Title {...props}>{children}</Title>
}

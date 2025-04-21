import React from 'react'
import { Typography } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'
const { Text } = Typography

export interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  strong?: boolean;
}

export const Textt: React.FC<CustomTextProps> = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>
}

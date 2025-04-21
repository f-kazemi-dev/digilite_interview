import React from 'react'
import { Card as AntCard } from 'antd'
import { CardProps } from 'antd/lib'

export interface CustomCardProps extends CardProps {
  children: React.ReactNode
  bordered?: boolean
  style?: React.CSSProperties
}

export const Card: React.FC<CustomCardProps> = ({ children, ...props }) => {
  return <AntCard {...props}>{children}</AntCard>
}

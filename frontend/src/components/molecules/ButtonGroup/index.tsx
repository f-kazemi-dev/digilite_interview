import React from 'react'
import { Button as AntButton } from 'antd'
import { ButtonGroupProps } from 'antd/lib/button'
import { Button } from '../../atoms/Button'
const { Group } = AntButton

export interface CustomButtonGroupProps extends ButtonGroupProps {
  // children: React.ReactNode,
  buttons: { type: 'default' | 'primary'; onClick: () => void; value: string }[]
}

export const ButtonGroup: React.FC<CustomButtonGroupProps> = ({ children, buttons, ...props }) => {
  return (
    <Group {...props}>
      {buttons.map(({ value, type, onClick }, index) => (
        <Button key={index} type={type} onClick={onClick}>
          {value}
        </Button>
      ))}
    </Group>
  )
}

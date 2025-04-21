import React from 'react'
import { Comment } from '@ant-design/compatible'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Textt } from '../../atoms/Text'

export interface ReplyData {
  id: number
  message: string
  createdAt: string
  userId?: number;
  user: {
    id: number
    email: string
    role: string
  }
}

interface ReplyItemProps {
  style: React.CSSProperties
  reply: ReplyData
}

export const ReplyItem: React.FC<ReplyItemProps> = ({ style, reply }) => {
  const { message, createdAt, user } = reply

  const formattedDate = new Date(createdAt).toLocaleString()
  return (
    <Comment
      style={style}
      author={
        <Textt strong>
          {user.id===1?"admin@example.com":(user.id===2?"agent@example.com":"Unknown")} ({user.id===1?"admin":(user.id===2?"agent":"unknown")})
        </Textt>
      }
      avatar={<Avatar icon={<UserOutlined />} />}
      content={<p>{message}</p>}
      datetime={<span>{formattedDate}</span>}
    />
  )
}

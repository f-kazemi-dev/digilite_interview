import React from 'react'
import { List } from 'antd'
import { ReplyData, ReplyItem } from '../../molecules/ReplyItem'

interface CustomReplyListProps {
  replies: ReplyData[]
}

export const ReplyList: React.FC<CustomReplyListProps> = ({ replies }) => {
  return (
    <List
      itemLayout='vertical'
      dataSource={replies}
      renderItem={(reply: any) => (
        <ReplyItem
          reply={reply}
          style={{
            padding: '0 11px',
            marginBottom: '11px',
          }}
        />
      )}
    />
  )
}

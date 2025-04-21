import React from 'react'
import { Card } from '../../atoms/Card'
import { Tag } from '../../atoms/Tag'
import { Typography, Space } from 'antd'
import { Textt } from '../../atoms/Text'

const { Title } = Typography

export interface ReplyData {
  id: number
  message: string
  ticketId: number
  userId: number
  createdAt: string
  updatedAt: string
}

export interface TicketData {
  id: number
  title: string
  status: 'open' | 'closed'
  createdAt: string
  replies?: ReplyData[]
}

interface TicketCardProps {
  ticket: TicketData
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { id, title, status, createdAt, ...res } = ticket

  const formattedDate = new Date(createdAt).toLocaleString()

  return (
    <Card
      title={<Title level={5}></Title>}
      extra={
        <Tag color={status === 'open' ? 'green' : 'red'}>
          {status === 'open' ? 'Open' : 'Closed'}
        </Tag>
      }
      style={{
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      bodyStyle={{ padding: 16 }}
      hoverable
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)' // Stronger shadow on hover
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)' // Reset shadow
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
      }}
    >
      <Space direction='vertical' style={{ width: '100%', padding: '17px 16px' }}>
        <Title level={5}>{title}</Title>
        <Textt type='secondary' style={{ fontSize: '0.9rem' }}>
          ID: {id} | Created: {formattedDate}
        </Textt>
        <Textt style={{ fontSize: '1rem', fontWeight: 500 }}>{title}</Textt>
        <Textt type='secondary' style={{ fontSize: '0.9rem' }}>
          {res.replies?.length ?? 0} replies
        </Textt>
      </Space>
      {/* <Link to={`/tickets/${id}`}>
        <Button type="primary">View Details</Button>
      </Link> */}
    </Card>
  )
}

// For a mid-level project, this simple formatting doesn't need useMemo
// unless it's proven to be a performance bottleneck
// export default React.memo(TicketCard);
export { TicketCard }

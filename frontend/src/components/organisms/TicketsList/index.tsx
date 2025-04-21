import React, { useCallback, useState } from 'react'
import { Row, Empty, Space, Input, Col } from 'antd'
import { TicketCard, TicketData } from '../../molecules/TicketCard'
import { Link } from 'react-router-dom'
import { ButtonGroup } from '../../molecules/ButtonGroup'

interface TicketsListProps {
  tickets: TicketData[]
  onFilterChange?: (status: 'all' | 'open' | 'closed') => void
  loading?: boolean
}

const TicketsList: React.FC<TicketsListProps> = ({ tickets, onFilterChange, loading = false }) => {
  const [selectedFilter, setSelectedFilter] = useState<number>(0)

  const handleFilterChange = useCallback(
    (value: string) => {
      if (onFilterChange) {
        onFilterChange(value as 'all' | 'open' | 'closed')

        setSelectedFilter(value === 'all' ? 0 : value === 'open' ? 1 : 2)
      }
    },
    [onFilterChange],
  )

  const emptyState = <Empty description='No tickets found' />

  return (
    <div style={{ maxWidth: 1200, margin: '0' }}>
      <Space
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Input.Search
          placeholder='Search tickets'
          style={{ width: 200, marginRight: 16 }}
          onSearch={(value: any) => console.log('Search:', value)}
          enterButton
          allowClear
        />

        {/* **********************************
           <List
            itemLayout='vertical'
            dataSource={>>>buttons<<<}
            renderItem={(btn: any) => (
              <Button
                {...btn}
              />
            )}
          /> ...
          ************************************* */}
        <ButtonGroup
          buttons={[
            {
              type: selectedFilter === 0 ? 'primary' : 'default',
              onClick: () => handleFilterChange('all'),
              value: 'All Tickets',
            },
            {
              type: selectedFilter === 1 ? 'primary' : 'default',
              onClick: () => handleFilterChange('open'),
              value: 'Open',
            },
            {
              type: selectedFilter === 2 ? 'primary' : 'default',
              onClick: () => handleFilterChange('closed'),
              value: 'Closed',
            },
          ]}
        />
      </Space>
      <div style={{ minHeight: 400 }}>
        {tickets.length === 0 ? (
          emptyState
        ) : (
          <Row gutter={[16, 16]}>
            {tickets.map((ticket) => (
              <Col xs={24} key={ticket.id}>
                <Link to={`/tickets/${ticket.id}`}>
                  <TicketCard ticket={ticket} />
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

// For a mid-level project, this simple formatting doesn't need useMemo
// unless it's proven to be a performance bottleneck
// export default React.memo(TicketsList);
export { TicketsList }

import React, { useEffect, useState, useCallback } from 'react'
import { AppLayout } from '../components/templates/AppLayout'
import { TicketsList } from '../components/organisms/TicketsList'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { Titlee } from '../components/atoms/Title'
import { Button } from '../components/atoms/Button'
import { Spin } from 'antd'
import { useTickets } from '../contexts/TicketContext'
import { useUI } from '../contexts/UIContext'

const TicketsListPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')
  const { tickets, loading, error, fetchTickets } = useTickets()
  const { showErrorMessage } = useUI()

  const handleFilterChange = useCallback((value: 'all' | 'open' | 'closed') => {
    setFilter(value)
  }, [])

  useEffect(() => {
    fetchTickets(filter)
  }, [fetchTickets, filter])

  useEffect(() => {
    if (error) {
      showErrorMessage(error)
    }
  }, [error, showErrorMessage])

  return (
    <AppLayout>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Titlee level={2}>Support Tickets</Titlee>
          <Link to='/tickets/create'>
            <Button type='primary' icon={<PlusOutlined />}>
              Add Ticket
            </Button>
          </Link>
        </div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <Spin size='large' tip='Loading tickets...' />
          </div>
        ) : (
          <TicketsList tickets={tickets} onFilterChange={handleFilterChange} loading={loading} />
        )}
      </div>
    </AppLayout>
  )
}

export default TicketsListPage

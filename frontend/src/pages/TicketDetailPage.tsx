import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Divider, Space, Skeleton } from 'antd'
import { AppLayout } from '../components/templates/AppLayout'
import { Button } from '../components/atoms/Button'
import { Tag } from '../components/atoms/Tag'
import { ReplyForm } from '../components/organisms/ReplyForm'
// import { useAuth } from '../contexts/AuthContext'
import { useTickets } from '../contexts/TicketContext'
import { useUI } from '../contexts/UIContext'
import { ReplyData } from '../components/molecules/ReplyItem'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { ReplyList } from '../components/organisms/ReplyList'
import { Textt } from '../components/atoms/Text'

const { Title, Paragraph } = Typography

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  // const { user } = useAuth()
  const {
    currentTicket: ticket,
    ticketLoading: loading,
    replies,
    fetchTicket,
    changeTicketStatus,
    addReply,
  } = useTickets()
  const { showSuccessMessage, showErrorMessage } = useUI()

  const [submitting, setSubmitting] = useState(false)
  const ticketId = parseInt(id || '0')

  useEffect(() => {
    if (ticketId) {
      fetchTicket(ticketId)
    }
  }, [ticketId, fetchTicket])

  const handleReplySubmit = useCallback(
    async (values: { message: string }) => {
      if (!ticketId) return

      setSubmitting(true)
      try {
        await addReply({
          ticketId,
          message: values.message,
        })
        showSuccessMessage('Reply added successfully')
      } catch (error) {
        showErrorMessage('Failed to add reply')
        console.error('Error submitting reply:', error)
      } finally {
        setSubmitting(false)
      }
    },
    [ticketId, addReply, showSuccessMessage, showErrorMessage],
  )

  const handleStatusChange = useCallback(async () => {
    if (!ticket) return

    const newStatus = ticket.status === 'open' ? 'closed' : 'open'

    try {
      await changeTicketStatus(ticketId, newStatus)
      showSuccessMessage(`Ticket ${newStatus === 'open' ? 'reopened' : 'closed'} successfully`)
    } catch (error) {
      showErrorMessage('Failed to update ticket status')
      console.error('Error updating ticket status:', error)
    }
  }, [ticket, ticketId, changeTicketStatus, showSuccessMessage, showErrorMessage])

  if (loading) {
    return (
      <AppLayout>
        <Skeleton active />
        <Skeleton active />
      </AppLayout>
    )
  }

  if (!ticket) {
    return (
      <AppLayout>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Title level={3}>Ticket not found</Title>
          <Button onClick={() => navigate('/tickets')}>Back to Tickets</Button>
        </div>
      </AppLayout>
    )
  }

  const formattedReplies: ReplyData[] = replies.map((reply) => ({
    id: reply.id,
    message: reply.message,
    createdAt: reply.createdAt,
    user: reply.user || { id: reply.userId ?? 0, email: 'Unknown', role: 'unknown' },
  }))

  return (
    <AppLayout>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Space
            style={{
              marginTop: 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to='/tickets' style={{ marginRight: 8 }}>
              <ArrowLeftOutlined style={{ marginRight: 4 }} />
              Back to tickets
            </Link>
          </Space>
          <Space
            style={{
              marginBottom: 16,
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={2}>{ticket.title}</Title>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag color={ticket.status === 'open' ? 'green' : 'red'}>
                {ticket.status === 'open' ? 'Open' : 'Closed'}
              </Tag>
              <Button
                type={ticket.status === 'open' ? 'primary' : 'default'}
                danger={ticket.status === 'open'}
                onClick={handleStatusChange}
              >
                {ticket.status === 'open' ? 'Close Ticket' : 'Reopen Ticket'}
              </Button>
            </div>
          </Space>

          <Space
            direction='vertical'
            style={{
              width: '100%',
              padding: 16,
              background: '#ffffff',
              // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: 4,
              margin: '10px 0',
            }}
          >
            <Paragraph>
              <Textt type='secondary'>Created at {new Date(ticket.createdAt).toLocaleString()}</Textt>
            </Paragraph>
            <Paragraph>{ticket.description}</Paragraph>
          </Space>

          <Divider orientation='left'>Replies</Divider>

          {formattedReplies.length === 0 ? (
            <Paragraph type='secondary' style={{ textAlign: 'center', padding: '15px 7px' }}>
              No replies yet.
            </Paragraph>
          ) : (
            <ReplyList replies={formattedReplies} />
          )}

          <ReplyForm ticketId={ticketId} onSubmit={handleReplySubmit} loading={submitting} />
        </div>
      </div>
    </AppLayout>
  )
}

export default TicketDetailPage

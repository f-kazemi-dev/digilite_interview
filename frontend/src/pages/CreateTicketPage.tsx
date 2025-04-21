import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/templates/AppLayout'
import { Input } from '../components/atoms/Input'
import { TextArea } from '../components/atoms/TextArea'
import { Button } from '../components/atoms/Button'
import { useTickets } from '../contexts/TicketContext'
import { useUI } from '../contexts/UIContext'
import { FormItem } from '../components/atoms/FormItem'
import { FormGroup } from '../components/molecules/FormGroup'
import { Titlee } from '../components/atoms/Title'

const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate()
  const { addTicket, loading } = useTickets()
  const { showSuccessMessage, showErrorMessage } = useUI()

  const handleSubmit = useCallback(
    async (values: { title: string; description: string }) => {
      try {
        await addTicket(values)
        showSuccessMessage('Ticket created successfully')
        navigate('/tickets')
      } catch (error) {
        showErrorMessage('Failed to create ticket')
        console.error('Error creating ticket:', error)
      }
    },
    [addTicket, navigate, showSuccessMessage, showErrorMessage],
  )

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', borderRadius: 4 }}>
        <Titlee level={2}>Create New Support Ticket</Titlee>
        <p style={{ color: 'gray' }}>
          Please provide details about the issue you're experiencing. Our support team will respond
          as soon as possible.
        </p>
        <FormGroup
          layout='vertical'
          onFinish={handleSubmit}
          style={{ background: '#fff', padding: 24, borderRadius: 4 }}
        >
          <FormItem
            label='Title'
            name='title'
            rules={[
              { required: true, message: 'Please enter a title' },
              { min: 5, message: 'Title must be at least 5 characters' },
            ]}
          >
            <Input placeholder='Enter a title for your ticket' disabled={loading} />
          </FormItem>

          <FormItem
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please enter a description' },
              { min: 20, message: 'Description must be at least 20 characters' },
            ]}
          >
            <TextArea placeholder='Describe your issue in detail' rows={6} disabled={loading} />
          </FormItem>

          <FormItem>
            <Button type='primary' htmlType='submit' loading={loading}>
              Create Ticket
            </Button>
            <Button
              onClick={() => navigate('/tickets')}
              style={{ marginLeft: 8 }}
              disabled={loading}
            >
              Cancel
            </Button>
          </FormItem>
        </FormGroup>
      </div>
    </AppLayout>
  )
}

export default CreateTicketPage

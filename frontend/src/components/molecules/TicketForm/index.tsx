import React from 'react'
import { Form } from 'antd'
import { Input } from '../../../components/atoms/Input'
import { TextArea } from '../../../components/atoms/TextArea'
import { Button } from '../../../components/atoms/Button'

interface TicketFormProps {
  onSubmit: (values: { title: string; description: string }) => void
  initialValues?: { title: string; description: string }
}

export const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: { title: string; description: string }) => {
    onSubmit(values)
    form.resetFields()
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit} initialValues={initialValues}>
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please input the ticket title!' }]}
      >
        <Input placeholder='Enter ticket title' />
      </Form.Item>

      <Form.Item
        name='description'
        label='Description'
        rules={[{ required: true, message: 'Please input the ticket description!' }]}
      >
        <TextArea placeholder='Enter ticket description' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

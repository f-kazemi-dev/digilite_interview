import React, { useCallback } from 'react'
import { Form } from 'antd'
import { Button } from '../../atoms/Button'
import { TextArea } from '../../atoms/TextArea'
import { FormGroup } from '../../molecules/FormGroup'
import { FormItem } from '../../atoms/FormItem'

interface ReplyFormProps {
  ticketId: number
  onSubmit: (values: { message: string }) => void
  loading?: boolean
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ ticketId, onSubmit, loading = false }) => {
  const [form] = Form.useForm()

  // Use useCallback to memoize the form submission function
  const handleSubmit = useCallback(
    (values: { message: string }) => {
      onSubmit(values)
      form.resetFields()
    },
    [onSubmit, form],
  )

  return (
    <FormGroup form={form} layout='vertical' onFinish={handleSubmit} style={{ marginTop: 24 }}>
      <FormItem
        label='Reply'
        name='message'
        rules={[
          { required: true, message: 'Please enter your reply' },
          { min: 10, message: 'Reply must be at least 10 characters' },
        ]}
      >
        <TextArea rows={4} placeholder='Type your reply here...' disabled={loading} />
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit' loading={loading}>
          Submit Reply
        </Button>
      </FormItem>
    </FormGroup>
  )
}

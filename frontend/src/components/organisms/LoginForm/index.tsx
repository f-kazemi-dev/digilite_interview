import React from 'react'
import { FormGroup } from '../../molecules/FormGroup'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert } from '../../atoms/Alert'
import { FormProps } from 'antd/lib'
import { Input } from '../../atoms/Input'
import { Button } from '../../atoms/Button'
import { FormItem } from '../../atoms/FormItem'

export interface LoginFormProps extends FormProps {
  children?: React.ReactNode | React.ReactElement
  loading: boolean
  authError?: string | null
}

export const LoginForm: React.FC<LoginFormProps> = ({ children, loading, authError, ...props }) => {
  return (
    <FormGroup {...props}>
      {authError && (
        <Alert
          message={authError}
          type='error'
          showIcon={true}
          style={{ marginBottom: 24, margin: '0 24px 24px' }}
        />
      )}
      <FormItem
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Email' disabled={loading} />
      </FormItem>

      <FormItem
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type='password'
          placeholder='Password'
          disabled={loading}
        />
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit' loading={loading} style={{ width: '100%' }}>
          Login
        </Button>
      </FormItem>

      {children}
    </FormGroup>
  )
}

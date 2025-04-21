import React, { createContext, useContext, useCallback, useState, useMemo } from 'react'
import { message } from 'antd'

type ThemeMode = 'light' | 'dark'

interface UIContextType {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  themeMode: ThemeMode
  toggleTheme: () => void
  showSuccessMessage: (content: string) => void
  showErrorMessage: (content: string) => void
  showInfoMessage: (content: string) => void
  showWarningMessage: (content: string) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const showSuccessMessage = useCallback((content: string) => {
    message.success(content)
  }, [])

  const showErrorMessage = useCallback((content: string) => {
    message.error(content)
  }, [])

  const showInfoMessage = useCallback((content: string) => {
    message.info(content)
  }, [])

  const showWarningMessage = useCallback((content: string) => {
    message.warning(content)
  }, [])

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar,
      themeMode,
      toggleTheme,
      showSuccessMessage,
      showErrorMessage,
      showInfoMessage,
      showWarningMessage,
    }),
    [
      sidebarCollapsed,
      toggleSidebar,
      themeMode,
      toggleTheme,
      showSuccessMessage,
      showErrorMessage,
      showInfoMessage,
      showWarningMessage,
    ],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = (): UIContextType => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

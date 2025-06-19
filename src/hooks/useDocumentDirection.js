import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useDocumentDirection() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Check localStorage for saved direction
    const savedDirection = localStorage.getItem('i18n-direction')
    const initialDirection = 
      savedDirection || 
      (i18n.language === 'ar' ? 'rtl' : 'ltr')
    
    document.documentElement.dir = initialDirection
    document.documentElement.lang = i18n.language

    // Cleanup function
    return () => {
      // You might want to save the current direction on unmount
      localStorage.setItem('i18n-direction', document.documentElement.dir)
    }
  }, [i18n.language])
}
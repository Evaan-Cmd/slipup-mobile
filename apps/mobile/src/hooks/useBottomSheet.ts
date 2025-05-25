import { useRef, useCallback } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export const useBottomSheet = () => {
  const helpSheetRef = useRef<BottomSheetModal>(null)
  const settingsSheetRef = useRef<BottomSheetModal>(null)
  const profileSheetRef = useRef<BottomSheetModal>(null)

  const openHelpSheet = useCallback(() => {
    helpSheetRef.current?.present()
  }, [])

  const openSettingsSheet = useCallback(() => {
    settingsSheetRef.current?.present()
  }, [])

  const openProfileSheet = useCallback(() => {
    profileSheetRef.current?.present()
  }, [])

  const closeHelpSheet = useCallback(() => {
    helpSheetRef.current?.dismiss()
  }, [])

  const closeSettingsSheet = useCallback(() => {
    settingsSheetRef.current?.dismiss()
  }, [])

  const closeProfileSheet = useCallback(() => {
    profileSheetRef.current?.dismiss()
  }, [])

  return {
    helpSheetRef,
    settingsSheetRef,
    profileSheetRef,
    openHelpSheet,
    openSettingsSheet,
    openProfileSheet,
    closeHelpSheet,
    closeSettingsSheet,
    closeProfileSheet,
  }
} 
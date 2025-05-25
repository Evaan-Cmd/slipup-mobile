import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, CameraType } from 'expo-camera'
import { FlashMode } from 'expo-camera/build/legacy/Camera.types'
import { X, Zap, ZapOff, RotateCcw } from 'lucide-react-native'
import { IconButton, colors, spacing, fontSize } from '@slipup/ui-kit'

export default function CameraScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState(FlashMode.off)
  const cameraRef = useRef<Camera>(null)

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        })
        
        Alert.alert(
          'Photo Captured!',
          'Receipt scanned successfully. Processing...',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        )
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo')
      }
    }
  }

  const toggleFlash = () => {
    setFlashMode(
      flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
    )
  }

  const toggleCameraType = () => {
    setType(
      type === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Requesting camera permissions...</Text>
      </SafeAreaView>
    )
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        ref={cameraRef}
      >
        {/* Header Controls */}
        <SafeAreaView style={styles.header}>
          <IconButton
            icon={X}
            variant="ghost"
            size="lg"
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          />
          <Text style={styles.headerTitle}>Scan Receipt</Text>
          <View style={styles.headerSpacer} />
        </SafeAreaView>

        {/* Camera Controls */}
        <View style={styles.controls}>
          <View style={styles.topControls}>
            <IconButton
              icon={flashMode === FlashMode.off ? ZapOff : Zap}
              variant="ghost"
              size="lg"
              onPress={toggleFlash}
              style={styles.controlButton}
            />
            <IconButton
              icon={RotateCcw}
              variant="ghost"
              size="lg"
              onPress={toggleCameraType}
              style={styles.controlButton}
            />
          </View>

          <View style={styles.bottomControls}>
            <View style={styles.captureButton} />
            <IconButton
              icon={() => <View style={styles.captureButtonInner} />}
              variant="ghost"
              size="lg"
              onPress={takePicture}
              style={styles.captureButtonOuter}
            />
            <View style={styles.captureButton} />
          </View>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  camera: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: fontSize.lg,
    color: colors.gray[600],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
  },
  headerSpacer: {
    width: 44,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing[8],
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing[8],
    marginBottom: spacing[8],
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing[8],
  },
  captureButton: {
    width: 44,
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
}) 
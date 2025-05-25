import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HelpCircle, Settings, User } from 'lucide-react-native'
import { Button, Card, IconButton, colors, spacing, fontSize } from '@slipup/ui-kit'
import { useBottomSheet } from '../hooks/useBottomSheet'

export default function DashboardScreen() {
  const { openHelpSheet, openSettingsSheet, openProfileSheet } = useBottomSheet()

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with action buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerActions}>
          <IconButton
            icon={HelpCircle}
            variant="ghost"
            size="sm"
            onPress={openHelpSheet}
          />
          <IconButton
            icon={Settings}
            variant="ghost"
            size="sm"
            onPress={openSettingsSheet}
          />
          <IconButton
            icon={User}
            variant="ghost"
            size="sm"
            onPress={openProfileSheet}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Card 
          title="Welcome to SlipUp" 
          description="Manage your receipts and expenses with ease"
        >
          <Button
            title="Get Started"
            variant="default"
            size="lg"
            onPress={() => console.log('Get started pressed')}
          />
        </Card>

        <Card 
          title="Recent Activity" 
          description="Your latest transactions and receipts"
        >
          <Text style={styles.placeholder}>No recent activity</Text>
        </Card>

        <Card 
          title="Quick Actions" 
          description="Common tasks you can perform"
        >
          <View style={styles.quickActions}>
            <Button
              title="Scan Receipt"
              variant="outline"
              size="default"
              style={styles.actionButton}
              onPress={() => console.log('Scan receipt')}
            />
            <Button
              title="Add Expense"
              variant="outline"
              size="default"
              style={styles.actionButton}
              onPress={() => console.log('Add expense')}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.gray[900],
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  placeholder: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    textAlign: 'center',
    paddingVertical: spacing[4],
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  actionButton: {
    flex: 1,
  },
}) 
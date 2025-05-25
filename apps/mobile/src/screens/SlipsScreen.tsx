import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus, Filter, Search } from 'lucide-react-native'
import { Button, Card, IconButton, colors, spacing, fontSize } from '@slipup/ui-kit'

// Mock data
const mockSlips = [
  {
    id: '1',
    title: 'Grocery Store Receipt',
    amount: '$45.67',
    date: '2025-01-24',
    category: 'Groceries',
  },
  {
    id: '2',
    title: 'Gas Station',
    amount: '$32.10',
    date: '2025-01-23',
    category: 'Transportation',
  },
  {
    id: '3',
    title: 'Coffee Shop',
    amount: '$8.50',
    date: '2025-01-22',
    category: 'Food & Drink',
  },
]

export default function SlipsScreen() {
  const renderSlipItem = ({ item }: { item: typeof mockSlips[0] }) => (
    <Card style={styles.slipCard}>
      <View style={styles.slipHeader}>
        <Text style={styles.slipTitle}>{item.title}</Text>
        <Text style={styles.slipAmount}>{item.amount}</Text>
      </View>
      <View style={styles.slipFooter}>
        <Text style={styles.slipCategory}>{item.category}</Text>
        <Text style={styles.slipDate}>{item.date}</Text>
      </View>
    </Card>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with actions */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Slips</Text>
        <View style={styles.headerActions}>
          <IconButton
            icon={Search}
            variant="ghost"
            size="sm"
            onPress={() => console.log('Search pressed')}
          />
          <IconButton
            icon={Filter}
            variant="ghost"
            size="sm"
            onPress={() => console.log('Filter pressed')}
          />
          <IconButton
            icon={Plus}
            variant="default"
            size="sm"
            onPress={() => console.log('Add slip pressed')}
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {mockSlips.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No slips yet</Text>
            <Text style={styles.emptyDescription}>
              Start by scanning a receipt or adding an expense manually
            </Text>
            <Button
              title="Add Your First Slip"
              variant="default"
              size="lg"
              onPress={() => console.log('Add first slip')}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <FlatList
            data={mockSlips}
            renderItem={renderSlipItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
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
  },
  listContainer: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  slipCard: {
    marginBottom: spacing[3],
  },
  slipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  slipTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.gray[900],
    flex: 1,
    marginRight: spacing[2],
  },
  slipAmount: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.primary[600],
  },
  slipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slipCategory: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 4,
  },
  slipDate: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  emptyTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  emptyDescription: {
    fontSize: fontSize.base,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing[6],
    lineHeight: 24,
  },
  emptyButton: {
    minWidth: 200,
  },
}) 
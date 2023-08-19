import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Front Pull-Down', 'Bent-Over Row'],
    },
    {
      title: '27.08.22',
      data: ['One-Arm Row, Deadlift'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="History" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            There are no registered exercises yet. {'\n'}
            Are we training today?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}

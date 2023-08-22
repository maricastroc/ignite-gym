import { Heading, SectionList, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  useFocusEffect(
    useCallback(() => {
      async function fetchHistory() {
        try {
          setIsLoading(true)
          const response = await api.get('/history')

          setExercises(response.data)
        } catch (error) {
          const isAppError = error instanceof AppError
          const title = isAppError ? error.message : 'Unable to load history'

          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500',
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchHistory()
    }, [toast]),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="History" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
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
      )}
    </VStack>
  )
}

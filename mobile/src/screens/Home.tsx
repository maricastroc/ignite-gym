/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  const [groups, setGroups] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState('back')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const [isLoading, setIsLoading] = useState(true)

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${selectedGroup}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Error loading exercises'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await api.get('/groups')
        setGroups(response.data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Error loading muscle groups'

        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500',
        })
      }
    }
    fetchGroups()
  }, [toast])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [selectedGroup]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            title={item}
            isActive={
              selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView nestedScrollEnabled={true}>
          <VStack px={8}>
            <HStack justifyContent="space-between" mb={5}>
              <Heading color="gray.200" fontSize="md" fontFamily="heading">
                Exercises
              </Heading>

              <Text color="gray.200" fontSize="sm">
                {exercises.length}
              </Text>
            </HStack>

            <View pb={12}>
              {exercises.map((item) => {
                return (
                  <ExerciseCard
                    key={item.id}
                    onPress={() => handleOpenExerciseDetails(item.id)}
                    data={item}
                  />
                )
              })}
            </View>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}

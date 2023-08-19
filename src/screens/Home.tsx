import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  const [activeGroup, setActiveGroup] = useState('back')
  const [groups, setGroups] = useState([
    'back',
    'biceps',
    'triceps',
    'shoulder',
  ])
  const [exercises, setExercises] = useState([
    'Front Pull-Down',
    'Bent-Over Row',
    'One-Arm Row',
    'Deadlift',
  ])

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
              activeGroup.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setActiveGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercises
          </Heading>
          <Text color="gray.200" fontSize="md">
            {exercises?.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}

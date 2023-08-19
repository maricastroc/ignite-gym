import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepsSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="headiing"
          >
            Front Pull-Down
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Back
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            source={{
              uri: 'https://www.nfpt.com/wp-content/uploads/one-arm-row-800x565.jpg',
            }}
            alt="Exercise Image"
            w="full"
            h={80}
            rounded="lg"
            mb={3}
            resizeMode="cover"
          />
          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  3 series
                </Text>
              </HStack>
              <HStack>
                <RepsSvg />
                <Text color="gray.200" ml="2">
                  12 reps
                </Text>
              </HStack>
            </HStack>
            <Button title="Check as finished" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

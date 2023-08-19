import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import * as FileSystem from 'expo-file-system'

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/maricastroc.png',
  )

  const toast = useToast()

  async function handleUserPhotoSelected() {
    setPhotoIsLoading(true)

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (selectedPhoto.canceled) {
        return
      }

      if (selectedPhoto?.assets[0]?.uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size) {
          const fileSizeInMB = photoInfo.size / (1024 * 1024)

          if (fileSizeInMB > 5) {
            return toast.show({
              title: 'This image is too big. Please, choose a photo up to 5MB.',
              placement: 'top',
              bgColor: 'red.500',
            })
          }

          setUserPhoto(selectedPhoto.assets[0].uri)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto source={{ uri: userPhoto }} alt="User Photo" size={33} />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
              fontFamily="heading"
              onPress={handleUserPhotoSelected}
            >
              Change Photo
            </Text>
          </TouchableOpacity>
          <Input placeholder="Name" bgColor="gray.600" />
          <Input
            bgColor="gray.600"
            value="marianacastrorc@gmail.com"
            isDisabled
          />
          <Heading
            color="gray.200"
            alignSelf="flex-start"
            fontSize="md"
            mb={2}
            mt={12}
            fontFamily="heading"
          >
            Change Password
          </Heading>
          <Input
            bgColor="gray.600"
            placeholder="Actual password"
            secureTextEntry
          />
          <Input
            bgColor="gray.600"
            placeholder="New password"
            secureTextEntry
          />
          <Input
            bgColor="gray.600"
            placeholder="Confirm new password"
            secureTextEntry
          />
          <Button title="Update Password" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
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
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

type FormDataProps = {
  name: string
  email: string
  old_password: string | null | undefined
  password: string | null | undefined
  passwordConfirm: string | null | undefined
}

const profileSchema = yup.object({
  name: yup.string().required('Please, inform your name.'),
  email: yup.string().required('Please, inform your email.'),
  old_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.nullable().required('Please, insert your actual password.'),
    }),
  password: yup
    .string()
    .min(6, 'Password must have at least 6 digits.')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  passwordConfirm: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('password'), null], 'Passwords do not match.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.nullable().required('Please, confirm your new password.'),
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const { user, updateUserProfile } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  })

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

          const fileExtension = selectedPhoto.assets[0].uri.split('.').pop()

          const photoFile = {
            name: `${user.name}.${fileExtension}`.toLowerCase(),
            uri: selectedPhoto.assets[0].uri,
            type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
          } as any

          const userPhotoUploadForm = new FormData()

          userPhotoUploadForm.append('avatar', photoFile)

          const avatarUpdatedResponse = await api.patch(
            '/users/avatar',
            userPhotoUploadForm,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )

          const userUpdated = user

          userUpdated.avatar = avatarUpdatedResponse.data.avatar

          await updateUserProfile(userUpdated)

          toast.show({
            title: 'Photo successfuly updated!',
            placement: 'top',
            bgColor: 'green.500',
          })
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)
      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Profile successfully updated!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Unable to update data. Please, try again later.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsUpdating(false)
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
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhotoImg
              }
              alt="User Photo"
              size={33}
            />
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
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
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
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Actual Password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="New Password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />
          <Button
            title="Update Password"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}

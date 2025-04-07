import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logoignite.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

const signInSchema = yup.object({
  email: yup.string().required('Please, inform your e-mail.'),
  password: yup.string().required('Please, inform your password.'),
})

type FormDataProps = {
  email: string
  password: string
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  const { signIn } = useAuth()

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Error creating account. Please, try again later'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      setIsLoading(false)
    }
  }

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          alt="People training"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Train your mind and your body.
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Access your account
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignIn)}
                errorMessage={errors.password?.message}
                returnKeyType="send"
              />
            )}
          />
          <Button
            title={isLoading ? 'Loading...' : 'Access'}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
          <Center mt={24}>
            <Text color="gray.100" fontSize="sm" fontFamily="body" mb={3}>
              Still don&apos;t have access?
            </Text>
          </Center>
          <Button
            title="Create your Account"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}

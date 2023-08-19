import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logoignite.svg'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

const signUpSchema = yup.object({
  name: yup.string().required('Please, inform your name.'),
  email: yup
    .string()
    .required('Please, inform your e-mail.')
    .email('Invalid e-mail.'),
  password: yup
    .string()
    .required('Please, inform your password.')
    .min(6, 'Password must have at least 6 digits.'),
  passwordConfirm: yup
    .string()
    .required('Please, confirm your password.')
    .oneOf([yup.ref('password'), ''], 'Passwords do not match'),
})

type FormDataProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export function SignUp() {
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({
    name,
    email,
    password,
    passwordConfirm,
  }: FormDataProps) {
    console.log({ name, email, password, passwordConfirm })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="People training"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
        />
        <Center my={20}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Train your mind and your body.
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Create your account
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
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
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                value={value}
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
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                errorMessage={errors.passwordConfirm?.message}
                returnKeyType="send"
              />
            )}
          />
          <Button
            title="Create and Access"
            onPress={handleSubmit(handleSignUp)}
          />
          <Button
            title="Back to Login"
            variant="outline"
            mt={12}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}

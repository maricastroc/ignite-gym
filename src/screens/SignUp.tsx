import { VStack, Image, Center, Text, Heading, ScrollView } from 'native-base'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logoignite.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
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
          <Input placeholder="Name" />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Password" secureTextEntry />
          <Input placeholder="Confirm Password" secureTextEntry />
          <Button title="Access" />
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

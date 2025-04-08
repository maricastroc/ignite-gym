// @components/Input.tsx
import { FormControl, WarningOutlineIcon } from 'native-base'
import { TextInput, Text, TextInputProps, StyleSheet, View } from 'react-native'

type Props = TextInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, style, ...rest }: Props) {
  const invalid = !!errorMessage

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <TextInput
        style={[
          styles.input,
          invalid && styles.inputError,
          style
        ]}
        placeholderTextColor="#A0AEC0"
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />

      {invalid && (
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
          _text={{ color: 'red.500' }}
        >
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 0,
    width: '100%',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#E53E3E',
  },
})

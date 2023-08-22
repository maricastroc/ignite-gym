import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from '@storage/storageConfig'

export async function saveStorageAuthToken(token: string) {
  await AsyncStorage.setItem(AUTH_STORAGE, token)
}

export async function getStorageAuthToken() {
  const token = await AsyncStorage.getItem(AUTH_STORAGE)

  return token
}

export async function removeStorageAuthToken() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}

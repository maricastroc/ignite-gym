/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable dot-notation */
/* eslint-disable no-useless-catch */
import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  getStorageAuthToken,
  removeStorageAuthToken,
  saveStorageAuthToken,
} from '@storage/storageAuthToken'
import {
  getStorageUser,
  removeStorageUser,
  saveStorageUser,
} from '@storage/storageUser'
import { useToast } from 'native-base'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorageData: boolean
  signOut: () => void
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const toast = useToast()

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    setIsLoadingUserStorageData(true)

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(userData)
  }

  async function saveStorageUserAndToken(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      setIsLoadingUserStorageData(true)

      await saveStorageUser(userData)
      await saveStorageAuthToken({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token && data.refresh_token) {
        await saveStorageUserAndToken(data.user, data.token, data.refresh_token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)

      await removeStorageUser()
      await removeStorageAuthToken()

      toast.show({
        title: 'User successfully signed out!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await saveStorageUser(userUpdated)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        setIsLoadingUserStorageData(true)

        const isUserLogged = await getStorageUser()
        const { token } = await getStorageAuthToken()

        if (isUserLogged && token) {
          userAndTokenUpdate(isUserLogged, token)
        }
      } catch (error) {
        throw error
      } finally {
        setIsLoadingUserStorageData(false)
      }
    }

    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

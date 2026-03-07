import {createContext} from 'react'

const ctx = {
  allUserFiles: [],
  newNameFile: '',
  linkFile: ''
}

export const AuthContext = createContext(ctx)
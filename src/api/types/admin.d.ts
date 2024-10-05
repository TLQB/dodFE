export interface ICreateAdminRequest {
  name: string
  email: string
  password: string
  isSuper: boolean
  isMailauthCompleted: boolean
  config: object
}

export interface IAdminListItemData {
  id: number
  name: string
  email: string
  password: string
  isSuper: boolean
  isMailauthCompleted: boolean
  config: object
}

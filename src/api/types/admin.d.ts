export interface ICreateAdminRequest {
  name: string
  email: string
  password: string
  isSuper: boolean
  isMailauthCompleted: boolean
  config: object
}

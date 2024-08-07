import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, getDetailAdmin, checkToken } from '@/api/admin'
import { getAcToken, setAcToken, removeToken, removeAcToken, decodeToken, setRfToken, removeRfToken } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getAcToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action({ rawError: true })
  public async Login(userInfo: { username: string, password: string}) {
    try {
      let { username, password } = userInfo
      username = username.trim()
      const { data } = await login({ username, password })
      setAcToken(data.access_token)
      setRfToken(data.refresh_token)
      this.SET_TOKEN(data.refresh_token)
      this.SET_ROLES(['admin'])
      PermissionModule.GenerateRoutes()
    } catch (error) {
      console.log('Login error in store:', error)
      throw error // Ném lỗi để có thể xử lý ở component
    }
  }

  @Action({ rawError: true })
  public ResetToken() {
    removeToken()
    removeAcToken()
    removeRfToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action({ rawError: true })
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const tokenInfo = decodeToken(this.token)
    const id = tokenInfo.user_id
    const email = tokenInfo.email
    const name = tokenInfo.name
    const data = await getDetailAdmin(id)
    const roles = ['admin']
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    // const { roles, name, avatar, introduction, email } = data.user
    // // roles must be a non-empty array
    // if (!roles || roles.length <= 0) {
    //   throw Error('GetUserInfo: roles must be a non-null array!')
    // }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    // this.SET_AVATAR(avatar)
    // this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }

  // @Action({ rawError: true })
  // public async ChangeRoles() {
  //   // resetRouter()
  //   // Generate dynamic accessible routes based on roles
  //   console.log("????>>>>::::")
  //   PermissionModule.GenerateRoutes()

  //   TagsViewModule.delAllViews()
  // }

  @Action({ rawError: true })
  public async CheckToken(refreshToken: string) {
    const { data } = await checkToken({ refresh_token: refreshToken })
    console.log(data.access_token, 'wwwwwwwwwwww')
    if (data.access_token) {
      setAcToken(data.access_token)
      return data.access_token
      // this.SET_AC_TOKEN(data.access_token)
    } else {
      // await logout()
      removeAcToken()
      removeRfToken()
      resetRouter()
    }
  }

  @Action({ rawError: true })
  public async LogOut() {
    // if (this.token === '') {
    //   throw Error('LogOut: token is undefined!')
    // }
    // removeToken()
    removeAcToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)

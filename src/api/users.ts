import request from '@/utils/request'

export const login = (data: any) =>
  request({
    url: '/admins/login/',
    method: 'post',
    data
  })

export const checkToken = (data: any) =>
  request({
    url: '/admins/check/',
    method: 'post',
    data
  })

export const getListAdmin = (params: any) =>
  request({
    url: '/admins/',
    method: 'get',
    params

  })

export const getDetailAdmin = (id: number) =>
  request({
    url: `/admins/${id}/`,
    method: 'get'

  })

export const updateAdmin = (id: number) =>
  request({
    url: `/admins/${id}/`,
    method: 'patch'

  })

export const createAdmin = (data: any) =>
  request({
    url: '/admins/',
    method: 'post',
    data

  })

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })

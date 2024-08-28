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

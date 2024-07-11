import request from '@/utils/request'

export function getListAdmin(params) {
  return request({
    url: '/admins/',
    method: 'get',
    params
  })
}

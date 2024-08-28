import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)

// User
const tokenKey = 'testabc'
const acTokenKey = 'ac_token'
const rfTokenKey = 'rf_token'

export const getToken = () => Cookies.get(tokenKey)
export const getAcToken = () => localStorage.getItem(acTokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const setAcToken = (token: string) => localStorage.setItem(acTokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
export const removeAcToken = () => localStorage.removeItem(acTokenKey)

export const getRfToken = () => {
  return localStorage.getItem(rfTokenKey)
}
export const setRfToken = (token: string) => {
  localStorage.setItem(rfTokenKey, token)
}
export const removeRfToken = () => {
  localStorage.removeItem(rfTokenKey)
}

export const decodeToken = (token: string): any => {
  return jwtDecode(token)
}

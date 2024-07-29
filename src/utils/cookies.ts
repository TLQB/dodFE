import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
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
export const getToken = () => Cookies.get(tokenKey)
export const getAcToken = () => localStorage.getItem(acTokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const setAcToken = (token: string) => localStorage.setItem(acTokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
export const removeAcToken = () => localStorage.removeItem(acTokenKey)
export const decodeToken = (token: string): any => {
  return jwt_decode(token)
}

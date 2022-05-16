import { Method } from 'axios'

export const getUnauthenticatedRequestConfig = ({
  url,
  method,
  additionalHeaders,
  tenantKey,
}: {
  url: string
  method: Method
  additionalHeaders: { [key: string]: string | number }
  tenantKey: string
}): {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
} => {
  return {
    url,
    method,
    headers: {
      tenantKey: tenantKey,
      ...additionalHeaders,
    },
  }
}
export const getAuthenticatedRequestConfig = ({
  url,
  method,
  params,
  data,
  additionalHeaders,
}: {
  url: string
  method: Method
  params?: { [key: string]: string | number | boolean }
  data?: { [key: string]: string | number | unknown }
  additionalHeaders?: { [key: string]: string | number }
}): {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
  params?: { [key: string]: string | number | boolean }
  data?: { [key: string]: string | number | unknown }
} => {
  const token = localStorage.getItem('token') as string
  const tenantKey = localStorage.getItem('tenantKey') as string
  return {
    url,
    method,
    headers: {
      tenantKey: tenantKey,
      'X-Auth-Token': token,
      ...additionalHeaders,
    },
    params,
    data,
  }
}

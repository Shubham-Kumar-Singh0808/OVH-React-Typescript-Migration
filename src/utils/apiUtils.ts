import axios, { Method, ResponseType } from 'axios'
import { AuthenticatedRequestConfig } from '../types/apiTypes'

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
      tenantKey,
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
  responseType,
}: {
  url: string
  method: Method
  params?: { [key: string]: string | number | boolean | undefined }
  data?:
    | { [key: string]: string | number | unknown }
    | unknown
    | string
    | number
  additionalHeaders?: { [key: string]: string | number }
  responseType?: ResponseType
}): AuthenticatedRequestConfig => {
  const token = localStorage.getItem('token') as string
  const tenantKey = localStorage.getItem('tenantKey') as string
  return {
    url,
    method,
    headers: {
      tenantKey,
      'X-Auth-Token': token,
      ...additionalHeaders,
    },
    params,
    responseType,
    data,
  }
}

export const useAxios = async (
  requestConfig: AuthenticatedRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
): Promise<any> => {
  try {
    const response = await axios(requestConfig)

    if (response.status === 200) {
      return response
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response.status === 401) {
      localStorage.clear()
      location.href = '/'
    }
    throw err
  }
}

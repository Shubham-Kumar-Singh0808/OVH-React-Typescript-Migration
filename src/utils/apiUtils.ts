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

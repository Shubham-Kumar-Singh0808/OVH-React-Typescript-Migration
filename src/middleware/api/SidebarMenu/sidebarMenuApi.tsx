import { createAsyncThunk } from '@reduxjs/toolkit'
import { AllowedHttpMethods, sideMenuApiConfig } from '../../api/apiList'
import { SidebarMenuReturnApi } from '../../../types/SidebarMenu/sidebarMenuType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'

export const getSidebarMenu = createAsyncThunk<
  SidebarMenuReturnApi[],
  string | number
>('sidebarMenu/doFetchSidebarMenu', async (employeeId: string | number) => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sideMenuApiConfig.getMenuData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data as SidebarMenuReturnApi[]
})

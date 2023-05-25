import {
  AddVendor,
  Department,
} from '../../../../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import { AllowedHttpMethods, vendorListApiConfig } from '../../../apiList'

const getDepartment = async (): Promise<Department[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.getDepartmentNameList,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewVendor = async (
  newVendorDetails: AddVendor,
): Promise<string | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: vendorListApiConfig.addVendorDetails,
    method: AllowedHttpMethods.post,
    data: newVendorDetails,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewVendorApi = {
  getDepartment,
  addNewVendor,
  //checkClientOrgExist,
}

export default addNewVendorApi

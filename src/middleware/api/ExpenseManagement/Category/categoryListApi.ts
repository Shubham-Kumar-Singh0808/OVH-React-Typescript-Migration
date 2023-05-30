import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, categoryListApiConfig } from '../../apiList'

const getExpenseCategories = async (
  props: CategoryListApiProps,
): Promise<GetAllVendorDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoryListApiConfig.getCategoryList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      vendorName: props.vendorName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

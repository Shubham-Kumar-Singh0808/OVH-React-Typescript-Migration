import { CreditCardList } from '../../../../types/ExpenseManagement/CreditCardList/creditCardListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { CreditCardListApiConfig, AllowedHttpMethods } from '../../apiList'

const getCreditCardsList = async (): Promise<CreditCardList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CreditCardListApiConfig.getCardsList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const creditCardListApi = {
  getCreditCardsList,
}

export default creditCardListApi

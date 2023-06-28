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

const addCreditCardDetails = async ({
  cardName,
  cardNumber,
}: {
  cardName: string
  cardNumber: string
}): Promise<CreditCardList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CreditCardListApiConfig.addCardDetails,
    method: AllowedHttpMethods.post,
    data: { cardName, cardNumber },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const editCreditCardList = async (cardId: number): Promise<CreditCardList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CreditCardListApiConfig.editCardDetails,
    method: AllowedHttpMethods.get,
    params: { cardId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateCreditCardDetails = async (
  data: CreditCardList,
): Promise<CreditCardList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CreditCardListApiConfig.updateCardDetails,
    method: AllowedHttpMethods.put,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCreditCardDetails = async (
  cardId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CreditCardListApiConfig.deleteCardData,
    method: AllowedHttpMethods.delete,
    params: { cardId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const creditCardListApi = {
  getCreditCardsList,
  addCreditCardDetails,
  editCreditCardList,
  updateCreditCardDetails,
  deleteCreditCardDetails,
}

export default creditCardListApi

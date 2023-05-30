import {
  AssetTransactionListProps,
  GetAssetTransactionList,
} from '../../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, assetTransactionListConfig } from '../../apiList'

const getAssetTransactionList = async (
  props: AssetTransactionListProps,
): Promise<GetAssetTransactionList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assetTransactionListConfig.getAssetTransactionList,
    method: AllowedHttpMethods.post,
    params: {
      dateSelection: props.dateSelection ?? '',
      endIndex: props.endIndex ?? 20,
      from: props.from ?? '',
      startIndex: props.startIndex ?? 0,
      to: props.to ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const assetTransactionalListApi = {
  getAssetTransactionList,
}

export default assetTransactionalListApi

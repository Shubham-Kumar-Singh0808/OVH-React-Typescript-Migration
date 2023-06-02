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
  prepareObject: AssetTransactionListProps,
): Promise<GetAssetTransactionList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assetTransactionListConfig.getAssetTransactionList,
    method: AllowedHttpMethods.post,
    data: {
      assetId: prepareObject.assetId ?? '',
      multipleSearch: prepareObject.multipleSearch ?? '',
      productId: prepareObject.productId ?? '',
      searchByEmpName: prepareObject.searchByEmpName ?? false,
      status: prepareObject.status ?? '',
    },
    params: {
      dateSelection: prepareObject.dateSelection ?? '',
      endIndex: prepareObject.endIndex ?? 20,
      from: prepareObject.from ?? '',
      startIndex: prepareObject.startIndex ?? 0,
      to: prepareObject.to ?? '',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const assetTransactionalListApi = {
  getAssetTransactionList,
}

export default assetTransactionalListApi

import { AssetTransactionListProps } from '../../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import { GetWarrantyAssetsList } from '../../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, assetWarrantyReportConfig } from '../../apiList'

const getAssetTransactionList = async (
  props: AssetTransactionListProps,
): Promise<GetWarrantyAssetsList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assetWarrantyReportConfig.getWarrantyAssetsList,
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

const assetsWarrantyListApi = {
  getAssetTransactionList,
}

export default assetsWarrantyListApi

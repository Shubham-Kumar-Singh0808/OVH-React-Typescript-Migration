import {
  AssetsWarrantyListProps,
  GetWarrantyAssetsList,
} from '../../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, assetWarrantyReportConfig } from '../../apiList'

const getAssetsWarrantyList = async (
  props: AssetsWarrantyListProps,
): Promise<GetWarrantyAssetsList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assetWarrantyReportConfig.getWarrantyAssetsList,
    method: AllowedHttpMethods.post,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      dateSelection: props.dateSelection ?? '',
      from: props.from ?? '',
      to: props.to ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const assetsWarrantyListApi = {
  getAssetsWarrantyList,
}

export default assetsWarrantyListApi

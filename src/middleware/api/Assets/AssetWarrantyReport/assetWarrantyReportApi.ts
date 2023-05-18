import {
  AssetsWarrantyListProps,
  ExportAssetWarrantyListProps,
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

const getExportAssetsWarrantyList = async (
  props: ExportAssetWarrantyListProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: assetWarrantyReportConfig.downloadExportAssetWarrantyList,
    method: AllowedHttpMethods.get,
    params: {
      startIndex: props.startIndex,
      endIndex: props.endIndex,
      from: props.from,
      to: props.to,
      dateSelection: props.dateSelection,
      token: props.token,
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const assetsWarrantyListApi = {
  getAssetsWarrantyList,
  getExportAssetsWarrantyList,
}

export default assetsWarrantyListApi

import { LoadingState } from '../../commonTypes'

export type ProductSpecifications = {
  replace(removeTag: string, arg1: string): unknown
  id: number
  productId: number
  productName: string
  manufacturerId: number
  manufacturerName: string
  productSpecification: string
  assetTypeId: number
  assetType: string
  roleId: null
  departmentId: null
  departmentName: null
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}
export type GetProductSpecificationListDetails = {
  size: number
  list: ProductSpecifications[]
}
export type ProductSpecificationListSliceState = {
  listSize: number
  productSpecifications: ProductSpecifications[]
  getProductSpecificationListDetails: GetProductSpecificationListDetails
  isLoading: LoadingState
}
export type ProductSpecificationListProps = {
  endIndex: number
  productName: string
  startIndex: number
  specificationSearch?: string
  token?: string
}
export type ProductSpecificationListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  updateaccess?: boolean
}
// export type GetassetTypeList = {
//   id: number
//   assetType: string
// }
// export type GetmanufacturerList = {}

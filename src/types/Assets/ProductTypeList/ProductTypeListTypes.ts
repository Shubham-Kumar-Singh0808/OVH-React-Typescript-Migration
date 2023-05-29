import {
  AssetTypeList,
  ManufacturerList,
} from './addproducttype/AddProductType'
import { LoadingState } from '../../commonTypes'

export type ProductTypeListType = {
  assetTypeId: number
  assetType: string
  createdBy: string
  createdDate: string
  departmentId: string | null
  departmentName: string | null
  productId: number
  productName: string
  updatedBy: string
  updatedDate: string
}

export type ProductTypeListResponse = {
  list: ProductTypeListType[]
  size: number
}

export type ProductTypeListSLiceState = {
  ProductTypeListModel: ProductTypeListType[]
  listSize: number
  isLoading: LoadingState
  productTypeResponse: ProductTypeListResponse
  manufacturerList: ManufacturerList
}

export type ProductTypeListProps = {
  endIndex: number
  productName: string
  startIndex: number
}

export type ProductTypeListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditProductType: React.Dispatch<React.SetStateAction<ProductTypeListType>>
  editButtonHandler?: (productId: number) => void
}

export type exportProductListDownload = {
  productSearch: string
  token: string
}

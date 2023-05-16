import { LoadingState } from '../../commonTypes'

export type WarrantyAssetsList = {
  id: number
  poNumber: string
  vendorId: number
  productSpecificationId: number
  manufacturerId: number
  productId: number
  pSpecification: string
  productName: string
  manufacturerName: string
  assetNumber: string
  otherAssetNumber: string
  invoiceNumber: string
  purchasedDate: string
  receivedDate: string
  notes: null
  employeeName: string
  employeeId: number
  description: null
  status: string
  assetTypeId: number
  assetType: string
  productSpecification: null
  otherNumber: null
  warrantyStartDate: string
  warrantyEndDate: string
  searchByEmpName: null
  departmentId: null
  departmentName: null
  location: string
  vendorName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  referenceNumber: string
  amount: string
  countryId: number
}

export type GetWarrantyAssetsList = {
  size: number
  list: WarrantyAssetsList[]
}

export type WarrantyAssetsListSliceState = {
  warrantyAssetsDetails: WarrantyAssetsList[]
  getWarrantyAssetsList: GetWarrantyAssetsList
  listSize: number
  isLoading: LoadingState
}

// type AssetsWarrantyListProps = {
//     dateSelection: string;
//     endIndex: number;
//     from: string;
//     startIndex: number;
//     to: string;
//   };

//   const AssetsWarrantyListProps: React.FC<AssetsWarrantyListProps> = ({
//     dateSelection,
//     endIndex,
//     from,
//     startIndex,
//     to,
//   }) => {
//     // Your component logic here
//   };

//   export default AssetsWarrantyListProps;

export type AssetsWarrantyListProps = {
  dateSelection: string
  endIndex: number
  from: string
  startIndex: number
  to: string
}

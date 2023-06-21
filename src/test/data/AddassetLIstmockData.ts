import { number } from 'prop-types'
import {
  AssetTypeAddList,
  UpdateAssetListSliceState,
  typeChangeSpecificationsList,
} from '../../types/Assets/AssetList/addEditListTypes'

export const mockassetData: AssetTypeAddList[] = [
  {
    amount: '500',
    assetNumber: 'RBTTesting',
    assetTypeId: '1',
    countryId: 2,
    invoiceNumber: '3000',
    manufacturerId: '22',
    notes: 'Test',
    otherAssetNumber: '1000',
    pSpecification: 'AMD A4-6320 APU with Radeon(tm) HD graphics 3.80 GHz.',
    poNumber: '98765',
    productId: '1',
    purchasedDate: '08/06/2023',
    receivedDate: '15/56/2023',
    status: 'working',
    vendorId: '2',
    warrantyEndDate: '15/06/2023',
    warrantyStartDate: '15/06/2023',
  },
]

export const mockupdateAddAsset: UpdateAssetListSliceState[] = [
  {
    amount: '234222',
    assetNumber: 'RBTTest1',
    assetType: 'Utilities',
    assetTypeId: 3,
    countryId: 3,
    createdBy: 'Thriveni Bathula',
    createdDate: '19/06/2023',
    departmentId: 33,
    departmentName: 'null',
    description: 'null',
    employeeId: 1076,
    employeeName: 'Srinivas Suppala',
    id: 4110,
    invoiceNumber: '32342',
    location: 'INDIA',
    manufacturerId: 138,
    manufacturerName: 'Battery stand vendor',
    notes: 'testing Thriveni trial',
    otherAssetNumber: '12132',
    otherNumber: '12213',
    pSpecification: 'Battery stand for UPS batteries.',
    poNumber: '21324',
    productId: 115,
    productName: 'Battery Stand',
    productSpecification: '@@@',
    productSpecificationId: 211,
    purchasedDate: '28/05/2023',
    receivedDate: '07/06/2023',
    referenceNumber: '  ',
    searchByEmpName: 'null',
    status: 'Not Working',
    updatedBy: 'Pavani Paska',
    updatedDate: '21/06/2023',
    vendorId: 17,
    vendorName: 'Aluminium Vendor',
    warrantyEndDate: '05/07/2023',
    warrantyStartDate: '19/06/2023',
  },
]
export const mocktypeChangeSpecifications: typeChangeSpecificationsList = [
  {
    id: 69,
    productId: 30,
    productName: 'CSS3 Suite for UI designers',
    manufacturerId: 28,
    manufacturerName: 'Adobe',
    productSpecification: 'Adobe Key for CSS3',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: '',
    updatedBy: '',
    createdDate: '',
    updatedDate: '',
  },
]

import {
  AddVendor,
  Department,
} from '../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'

export const mockDepartmentName: Department[] = [
  {
    id: 1,
    name: 'Networking',
  },
  {
    id: 2,
    name: 'Administrative',
  },
  {
    id: 3,
    name: 'HR',
  },
  {
    id: 4,
    name: 'Accounts',
  },
]

export const mockAddNewVendor: AddVendor = {
  departmentId: '2',
  isExpenseVendor: true,
  vendorAddress: 'Hyderabad',
  vendorBankDetails: 'Hyderabad',
  vendorCity: 'Hyderabad',
  vendorCountry: 'India',
  vendorEmailId: 'ksrikanthmy1756@gmail.com',
  vendorFaxNumber: '1234567890',
  vendorGSTNumber: 'GSTIN1231231',
  vendorName: 'Future Technologies',
  vendorPhoneNumber: '9550801571',
  vendorPincode: '500033',
  vendorState: 'Hyderabad',
}

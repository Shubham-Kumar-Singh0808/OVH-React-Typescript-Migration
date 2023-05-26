import EditVendorDetails from './EditVendorDetails'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render } from '../../../../test/testUtils'
import {
  GetAllVendorDetails,
  VendorDetails,
} from '../../../../types/Assets/VendorList/vendorListTypes'

const mockSetTogglePage = jest.fn()

describe('Vendor Details without data', () => {
  beforeEach(() => {
    render(
      <EditVendorDetails
        setToggle={mockSetTogglePage}
        editVendorInfo={{
          createdBy: '',
          createdDate: '',
          departmentId: 0,
          departmentName: '',
          isExpenseVendor: false,
          updatedBy: '',
          updatedDate: '',
          vendorAddress: '',
          vendorBankDetails: '',
          vendorCity: '',
          vendorCountry: '',
          vendorEmailId: '',
          vendorFaxNumber: '',
          vendorGSTNumber: '',
          vendorId: 0,
          vendorName: '',
          vendorPhoneNumber: '',
          vendorPincode: '',
          vendorState: '',
        }}
        setEditVendorInfo={mockSetTogglePage}
      />,
      {
        preloadedState: {
          EditVendorDetails: {
            vendors: [],
            listSize: 0,
            getAllVendorDetails: {} as GetAllVendorDetails,
            isLoading: ApiLoadingState.succeeded,
            getVendorById: {} as VendorDetails,
          },
        },
      },
    )
  })
})

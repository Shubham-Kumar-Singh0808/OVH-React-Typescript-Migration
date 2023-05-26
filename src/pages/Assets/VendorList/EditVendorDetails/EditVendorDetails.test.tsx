/* eslint-disable react/react-in-jsx-scope */
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EditVendorDetails from './EditVendorDetails'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
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
          departmentName: 'Accounts',
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
  test('should be able to render  Vendor Details  Title', () => {
    expect(screen.getByText('Edit Vendor Details')).toBeInTheDocument()
  })
  test('should render edit Vendor Details component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Back Button', () => {
    const backBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(backBtnElement).toBeEnabled()
    userEvent.click(backBtnElement)
  })
  test('should be able to click update button element', () => {
    const updateBtnElement = screen.getByTestId('updateBtn')
    expect(updateBtnElement).toBeInTheDocument()
    userEvent.click(updateBtnElement)
  })
  test('should render Vendor List component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should render with data ', () => {
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Address:')).toBeInTheDocument()
    expect(screen.getByText('Bank Details:')).toBeInTheDocument()
    expect(screen.getByText('GST Number:')).toBeInTheDocument()
    expect(screen.getByText('City:')).toBeInTheDocument()
    expect(screen.getByText('State:')).toBeInTheDocument()
    expect(screen.getByText('Pincode:')).toBeInTheDocument()
    expect(screen.getByText('Country:')).toBeInTheDocument()
    expect(screen.getByText('Email ID:')).toBeInTheDocument()
    expect(screen.getByText('Phone Number:')).toBeInTheDocument()
    expect(screen.getByText('Fax Number:')).toBeInTheDocument()
    expect(screen.getByText('Department:')).toBeInTheDocument()
    expect(screen.getByText('Expense Vendor:')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const name = screen.getByTestId('name')
    userEvent.type(name, 'Srikanth')

    const gstNumber = screen.getByTestId('vendorGSTNumber')
    userEvent.type(gstNumber, '636188754099')

    const city = screen.getByTestId('vendorCity')
    userEvent.type(city, 'Hyderabad')

    const state = screen.getByTestId('vendorState')
    userEvent.type(state, 'Telangana')

    const pincode = screen.getByTestId('vendorPincode')
    userEvent.type(pincode, '123456')

    const country = screen.getByTestId('vendorCountry')
    userEvent.type(country, 'India')

    const emailId = screen.getByTestId('vendorEmailId')
    userEvent.type(emailId, 'enterprises@mailinator.com')

    const phoneNumber = screen.getByTestId('vendorPhoneNumber')
    userEvent.type(phoneNumber, '1234567890')

    const faxNumber = screen.getByTestId('vendorFaxNumber')
    userEvent.type(faxNumber, '1234567890')

    const departmentName = screen.getByTestId('departmentName')
    userEvent.type(departmentName, 'Accounts')
  })
})

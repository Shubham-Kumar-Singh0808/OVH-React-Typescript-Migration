/* eslint-disable react/react-in-jsx-scope */
// Todd: remove eslint and fix error
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddVendorDetails from './AddVendorDetails'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetAllVendorDetails,
  VendorDetails,
} from '../../../../types/Assets/VendorList/vendorListTypes'
import { mockVendorDetails } from '../../../../test/data/vendorListData'

const mockSetTogglePage = jest.fn()

describe('Add Vendor Details without data', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <AddVendorDetails setToggle={mockSetTogglePage} />,
      {
        preloadedState: {
          AddVendorDetails: {
            vendors: [],
            listSize: 0,
            getAllVendorDetails: {} as GetAllVendorDetails,
            isLoading: ApiLoadingState.succeeded,
            getVendorById: mockVendorDetails,
          },
        },
      },
    )
  })
  test('should be able to render  Vendor Details Title', () => {
    expect(screen.getByText('Add Vendor Details')).toBeInTheDocument()
  })
  test('should render add Vendor Details component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Add',
    })
    expect(addBtnElement).toBeDisabled()
    userEvent.click(addBtnElement)
  })
  test('should be able to click edit button element', () => {
    const addBtnElement = screen.getByTestId('save-btn')
    expect(addBtnElement).toBeInTheDocument()
    userEvent.click(addBtnElement)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('clear-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render  Add Vendor Details component with out crashing', () => {
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
    // expect(screen.getByText('Expense Vendor :')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const name = screen.getByTestId('vendorName')
    userEvent.type(name, 'Srikanth')

    const address = screen.getByTestId('vendorAddress')
    userEvent.type(address, 'Hyderabad')
    // // Assert that the address change callback has been called
    // expect(editorChange).toHaveBeenCalledWith('Hyderabad')

    // const bankDetails = screen.getByTestId('vendorBankDetails')
    // userEvent.type(bankDetails, 'SBI')

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

    const departmentName = screen.getByTestId('departmentId')
    userEvent.type(departmentName, 'Accounts')
  })
})

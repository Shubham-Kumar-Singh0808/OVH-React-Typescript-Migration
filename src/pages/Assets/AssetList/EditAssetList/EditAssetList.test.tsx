/* eslint-disable react/react-in-jsx-scope */
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EditAssetList from './EditAssetList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import {
  GetAllVendorDetails,
  VendorDetails,
} from '../../../../types/Assets/VendorList/vendorListTypes'
import { AddEditSliceState } from '../../../../types/Assets/AssetList/addEditListTypes'
import { mockassetData } from '../../../../test/data/AddassetLIstmockData'
import { mockAllAssetListData } from '../../../../test/data/AssetListData'

const mockSetTogglePage = jest.fn()

describe('Vendor Details without data', () => {
  beforeEach(() => {
    render(
      <EditAssetList
        setToggle={mockSetTogglePage}
        setEditAddAssetList={mockSetTogglePage}
        selectDate={''}
        searchInput={undefined}
        searchByEmployee={false}
        editAddAssetList={{
          id: 0,
          poNumber: '',
          vendorId: 0,
          productSpecificationId: 0,
          manufacturerId: 0,
          productId: 0,
          pSpecification: '',
          productName: '',
          manufacturerName: '',
          assetNumber: '',
          otherAssetNumber: '',
          invoiceNumber: '',
          purchasedDate: '',
          receivedDate: '',
          notes: null,
          employeeName: '',
          employeeId: 0,
          description: '',
          status: '',
          assetTypeId: 0,
          assetType: '',
          productSpecification: '',
          otherNumber: '',
          warrantyStartDate: '',
          warrantyEndDate: '',
          searchByEmpName: '',
          departmentId: 0,
          departmentName: '',
          location: '',
          vendorName: '',
          createdBy: '',
          updatedBy: '',
          createdDate: '',
          updatedDate: '',
          referenceNumber: '',
          amount: null,
          countryId: null,
        }}
      />,
      {
        preloadedState: {
          EditVendorDetails: {
            vendors: [],
            listSize: 0,
            AddEditSliceState: {} as AddEditSliceState,
            isLoading: ApiLoadingState.succeeded,
            getassetById: mockassetData,
          },
        },
      },
    )
  })
  test('should be able to render  Vendor Details  Title', () => {
    expect(screen.getByText('Edit Asset')).toBeInTheDocument()
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
    const updateBtnElement = screen.getByTestId('update-btn')
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
    expect(screen.getByText('PO Number:')).toBeInTheDocument()
    expect(screen.getByText('Asset Number:')).toBeInTheDocument()
    expect(screen.getByText('License/Asset No:')).toBeInTheDocument()
    expect(screen.getByText('Invoice Number:')).toBeInTheDocument()
    expect(screen.getByText('Amount:')).toBeInTheDocument()
    expect(screen.getByText('Date of Purchase :')).toBeInTheDocument()
    expect(screen.getByText('Received Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty End Date :')).toBeInTheDocument()
  })
  test('should render on every input of vendor name ', () => {
    const vendorNameInput = screen.getByPlaceholderText('Select Vendor Name')
    userEvent.type(vendorNameInput, '')
    expect(vendorNameInput).toHaveValue('')
  })
  test('should render on every input of asset type', () => {
    const AssetNameInput = screen.getByPlaceholderText('Select Asset Type')
    userEvent.type(AssetNameInput, '')
    expect(AssetNameInput).toHaveValue('')
  })
  test('should render on every input of product type', () => {
    const roomNameInput = screen.getByPlaceholderText('Select Product Type')
    userEvent.type(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should render on every input of manufacturer Name', () => {
    const roomNameInput = screen.getByPlaceholderText(
      'Select Manufacturer Name',
    )
    userEvent.type(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should render on every input of Asset status', () => {
    const roomNameInput = screen.getByPlaceholderText('Select Status')
    userEvent.type(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should render on every input of Country', () => {
    const roomNameInput = screen.getByPlaceholderText('Select Country')
    userEvent.type(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should able to render every element', () => {
    const poNumber = screen.getByTestId('poNumber')
    userEvent.type(poNumber, '5467738')

    const assetNumber = screen.getByTestId('assetNumber')
    userEvent.type(assetNumber, 'RBTtest34')

    const otherAssetNumber = screen.getByTestId('licenseNumber')
    userEvent.type(otherAssetNumber, '76yt54e3')

    const invoiceNumber = screen.getByTestId('invoiceNumber')
    userEvent.type(invoiceNumber, '8765430')

    const amount = screen.getByTestId('amount')
    userEvent.type(amount, '4536')
  })
})

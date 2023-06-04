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

const mockSetTogglePage = jest.fn()

describe('Vendor Details without data', () => {
  beforeEach(() => {
    render(
      <EditAssetList
        setToggle={mockSetTogglePage}
        editAddAssetList={{
          amount: '876746',
          assetNumber: 'RBT46444',
          assetTypeId: 0,
          countryId: 1,
          invoiceNumber: 'tyeytey',
          manufacturerId: 0,
          notes: 'geghgdh',
          otherAssetNumber: '5422yeyhe',
          pSpecification:
            'AC1750 Dual Band Gigabit<div>Ceiling Mount Access Point </div>',
          poNumber: '4748444',
          productId: 0,
          purchasedDate: '04/06/2023',
          receivedDate: '05/06/2023',
          status: 'working',
          vendorId: 0,
          warrantyEndDate: '20/06/2023',
          warrantyStartDate: '11/06/2023',
        }}
        setEditAddAssetList={mockSetTogglePage}
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
    expect(screen.getByText('PO Number:')).toBeInTheDocument()
    // expect(screen.getByText('Vendor Name:')).toBeInTheDocument()
    // expect(screen.getByText(' Asset Type:')).toBeInTheDocument()
    // expect(screen.getByText('Product Type:')).toBeInTheDocument()
    // expect(screen.getByText('Manufacturer Name:')).toBeInTheDocument()
    expect(screen.getByText('Asset Number:')).toBeInTheDocument()
    expect(screen.getByText('License/Asset No:')).toBeInTheDocument()
    expect(screen.getByText('Invoice Number:')).toBeInTheDocument()
    expect(screen.getByText('Amount:')).toBeInTheDocument()
    expect(screen.getByText('Date of Purchase :')).toBeInTheDocument()
    expect(screen.getByText('Received Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty End Date :')).toBeInTheDocument()
    // expect(screen.getByText('Asset Status:')).toBeInTheDocument()
    // expect(screen.getByText('Country:')).toBeInTheDocument()
    // expect(screen.getByText('Notes:')).toBeInTheDocument()
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

    // const purchasedDate = screen.getByTestId('datePurchase')
    // userEvent.type(purchasedDate, '04/06/2023')

    // const receivedDate = screen.getByTestId('receivedDate')
    // userEvent.type(receivedDate, '05/06/2023')

    // const warrantyStartDate = screen.getByTestId('warrantyStartDate')
    // userEvent.type(warrantyStartDate, '08/06/2023')

    // const warrantyEndDate = screen.getByTestId('warrantyEndDate')
    // userEvent.type(warrantyEndDate, '16/06/2023')
  })
})

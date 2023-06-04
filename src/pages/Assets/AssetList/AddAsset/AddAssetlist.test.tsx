/* eslint-disable react/react-in-jsx-scope */
// Todd: remove eslint and fix error
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddAssetList from './AddAssetList'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { GetAllVendorDetails } from '../../../../types/Assets/VendorList/vendorListTypes'
import { AddEditSliceState } from '../../../../types/Assets/AssetList/addEditListTypes'
import { mockassetData } from '../../../../test/data/AddassetLIstmockData'

const mockSetTogglePage = jest.fn()

describe('Add Asset list  Details without data', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <AddAssetList setToggle={mockSetTogglePage} />,
      {
        preloadedState: {
          AddAssetList: {
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
  test('should be able to render Add Asset List Title', () => {
    expect(screen.getByText('Add New Asset')).toBeInTheDocument()
  })
  test('should render add Asset List component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should be able to click edit button element', () => {
    const addBtnElement = screen.getByTestId('Confirm-btn')
    expect(addBtnElement).toBeInTheDocument()
    userEvent.click(addBtnElement)
  })
  test('should be able to click Clear button element', () => {
    const deleteBtnElement = screen.getByTestId('clear-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render  Add Asset list component with out crashing', () => {
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

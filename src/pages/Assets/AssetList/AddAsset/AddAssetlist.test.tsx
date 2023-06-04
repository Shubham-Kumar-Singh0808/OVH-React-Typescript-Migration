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
          AddVendorDetails: {
            vendors: [],
            listSize: 0,
            AddEditSliceState: {} as AddEditSliceState,
            isLoading: ApiLoadingState.succeeded,
            getVendorById: mockassetData,
          },
        },
      },
    )
  })
  test('should be able to render Add Asset List Title', () => {
    expect(screen.getByText('Add ASset list')).toBeInTheDocument()
  })
  test('should render add Asset List component with out crashing', () => {
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
    const addBtnElement = screen.getByTestId('Confirm-btn')
    expect(addBtnElement).toBeInTheDocument()
    userEvent.click(addBtnElement)
  })
  test('should be able to click edit button element', () => {
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
    expect(screen.getByText('Vendor Name:')).toBeInTheDocument()
    expect(screen.getByText(' Asset Type:')).toBeInTheDocument()
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name:')).toBeInTheDocument()
    expect(screen.getByText('Asset Number:')).toBeInTheDocument()
    expect(screen.getByText('License/Asset No:')).toBeInTheDocument()
    expect(screen.getByText('Invoice Number:')).toBeInTheDocument()
    expect(screen.getByText('Amount:')).toBeInTheDocument()
    expect(screen.getByText('Date of Purchase :')).toBeInTheDocument()
    expect(screen.getByText('Received Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Warranty End Date :')).toBeInTheDocument()
    expect(screen.getByText('Asset Status:')).toBeInTheDocument()
    expect(screen.getByText('Country:')).toBeInTheDocument()
    expect(screen.getByText('Notes:')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const poNumber = screen.getByTestId('poNumber')
    userEvent.type(poNumber, '5467738')

    const vendorId = screen.getByTestId('vendorName')
    userEvent.type(vendorId, '42')

    const assetTypeId = screen.getByTestId('assetType')
    userEvent.type(assetTypeId, '1')

    const productId = screen.getByTestId('productType')
    userEvent.type(productId, '164')

    const manufacturerId = screen.getByTestId('manufacturerName')
    userEvent.type(manufacturerId, '164')

    const assetNumber = screen.getByTestId('assetNumber')
    userEvent.type(assetNumber, 'RBTtest34')

    const otherAssetNumber = screen.getByTestId('licenseNumber')
    userEvent.type(otherAssetNumber, '76yt54e3')

    const invoiceNumber = screen.getByTestId('invoiceNumber')
    userEvent.type(invoiceNumber, '76yt54e3')

    const amount = screen.getByTestId('amount')
    userEvent.type(amount, '1234567890')

    const purchasedDate = screen.getByTestId('datePurchase')
    userEvent.type(purchasedDate, '04/06/2023')

    const receivedDate = screen.getByTestId('receivedDate')
    userEvent.type(receivedDate, '05/06/2023')

    const warrantyStartDate = screen.getByTestId('warrantyStartDate')
    userEvent.type(warrantyStartDate, '08/06/2023')

    const warrantyEndDate = screen.getByTestId('warrantyEndDate')
    userEvent.type(warrantyEndDate, '16/06/2023')

    const assetStatus = screen.getByTestId('assetStatus')
    userEvent.type(assetStatus, 'Not Working')
  })
})

/* eslint-disable react/react-in-jsx-scope */
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddAssetList from './AddAssetList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mocktypeChangeSpecifications } from '../../../../test/data/AddassetLIstmockData'

const mockSetTogglePage = jest.fn()

describe('Add Asset list  Details without data', () => {
  beforeEach(() => {
    render(<AddAssetList setToggle={mockSetTogglePage} RBT={false} />, {
      preloadedState: {
        addAssetList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          typeChangeSpecificationsData: mocktypeChangeSpecifications,
        },
      },
    })
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
    userEvent.selectOptions(vendorNameInput, '')
    expect(vendorNameInput).toHaveValue('')
  })
  test('should enable  after selecting form option', () => {
    const assetTypeSelect = screen.getByTestId('assetType')
    fireEvent.select(assetTypeSelect, ['Software'])
    expect(assetTypeSelect).toHaveValue('')

    const productTypeSelect = screen.getByTestId('productType')
    fireEvent.select(productTypeSelect, ['CSS3 Suite for UI designers'])
    expect(productTypeSelect).toHaveValue('')

    const manufacturerSelect = screen.getByTestId('manufacturerName')
    fireEvent.select(manufacturerSelect, ['Adobe'])
    expect(manufacturerSelect).toHaveValue('')
  })
  test('should render on every input of Asset status', () => {
    const roomNameInput = screen.getByPlaceholderText('Select Status')
    userEvent.selectOptions(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should render on every input of Country', () => {
    const roomNameInput = screen.getByPlaceholderText('Select Country')
    userEvent.selectOptions(roomNameInput, '')
    expect(roomNameInput).toHaveValue('')
  })
  test('should render on Date Of Purchase ', async () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '30 Aug, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '07 Sep, 2022' },
      }),
    )
  })
  test('should render on Received  Date', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '18 June, 2023' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '25 July, 2023' },
      }),
    )
  })

  test('should render on Warranty Start Date ', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '16 June, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '17 Sep, 2022' },
      }),
    )
  })
  test('should render on Warranty End Date', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '14 March, 2023' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '29 September, 2023' },
      }),
    )
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

    const amount = screen.getByTestId('assetNumber')
    userEvent.type(amount, '4536')
  })
})

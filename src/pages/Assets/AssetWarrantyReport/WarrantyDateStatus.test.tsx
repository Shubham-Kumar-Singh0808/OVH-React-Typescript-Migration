import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import WarrantyDateStatus from './WarrantyDateStatus'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockAssetsWarrantyList } from '../../../test/data/AssetsWarrantyData'
import assetsWarrantyListApi from '../../../middleware/api/Assets/AssetWarrantyReport/assetWarrantyReportApi'

const mockSetSelect = jest.fn()
const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <WarrantyDateStatus
      selectDate={'Custom'}
      setSelectDate={mockSetSelect}
      pageSize={0}
      currentPage={0}
      fromDate={undefined}
      setFromDate={jest.fn()}
      toDate={undefined}
      setToDate={jest.fn()}
    />
  </div>
)
describe('Assets Warranty List List Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        assetsWarrantyList: {
          warrantyAssetsDetails: mockAssetsWarrantyList.list,
          listSize: mockAssetsWarrantyList.size,
        },
      },
    })
  })
  screen.debug()
  // eslint-disable-next-line sonarjs/no-duplicate-string
  const date = '29 Oct, 2019'
  test('should able to select values for options for respective select element', async () => {
    const select = screen.getByTestId('form-select1')
    userEvent.selectOptions(select, ['Custom'])
    expect(select).toHaveValue('Custom')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: date },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: date },
      }),
    )
    expect(datePickers[0]).toHaveValue('29 Oct, 2019')
    expect(datePickers[1]).toHaveValue('29 Oct, 2019')
    const viewBtnElement = screen.getByRole('button', { name: 'View' })
    userEvent.click(viewBtnElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clear-btn'))
    expect(datePickers[0]).toHaveValue('29 Oct, 2019')
    expect(datePickers[1]).toHaveValue('29 Oct, 2019')
  })
  test('should be able to click View button element', () => {
    const addBtn = screen.getByRole('button', { name: 'View' })
    userEvent.click(addBtn)
    expect(addBtn).toBeInTheDocument()
  })
  test('should render Export button in the component', () => {
    expect(screen.getByTestId('export-button')).toBeTruthy()
  })
})

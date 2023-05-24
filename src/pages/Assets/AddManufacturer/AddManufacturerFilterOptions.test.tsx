import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddManuFactureFilterOptions from './AddManuFactureFilterOptions'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { render, screen } from '../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('Manufracturer List without data', () => {
  beforeEach(() => {
    render(<AddManuFactureFilterOptions setToggle={jest.fn()} />, {
      preloadedState: {
        ManufacturerList: {
          isLoading: ApiLoadingState.idle,
          listSize: 0,
          getAllManufacturerName: {},
          manufacturerList: {},
          manufacturerDetails: [],
        },
      },
    })
  })

  test('should render add Manufacturer component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('save-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('clear-btn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render  Add Manufacturer component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })
  test('should render with data ', () => {
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const ManufacturerId = screen.getByTestId('form-select')
    userEvent.type(ManufacturerId, '1')

    const ManufacturerName = screen.getByTestId('ManufacturerName')
    userEvent.type(ManufacturerName, 'Microsoft')
  })
})

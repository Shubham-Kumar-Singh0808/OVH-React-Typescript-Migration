import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddManuFactureFilterOptions from './AddManuFactureFilterOptions'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { mockManufactureGetLookup } from '../../../test/data/EditManufacturerMockData'

const mockSetTogglePage = jest.fn()

describe('Manufacturer List without data', () => {
  beforeEach(() => {
    render(<AddManuFactureFilterOptions setToggle={jest.fn()} />, {
      preloadedState: {
        manufacturerList: {
          isLoading: ApiLoadingState.idle,
          listSize: 0,
          getAllManufacturerName: {},
          manufacturerList: mockManufactureGetLookup,
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
  test('should render with data ', () => {
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('form-select')
    fireEvent.change(productNameInput, ['MS Office 2007'])
    expect(productNameInput).toHaveValue('')
    const assetType = screen.getByTestId('manufacturerName')
    userEvent.type(assetType, 'test')

    const ClearButton = screen.getByTestId('clear-btn')
    expect(ClearButton).toBeEnabled()
  })
})

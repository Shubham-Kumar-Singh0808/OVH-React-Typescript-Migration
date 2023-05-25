import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EditManufacturerList from './EditManufacturerList'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { render, screen } from '../../../test/testUtils'
import { mockManufactureGetLookup } from '../../../test/data/EditManufacturerMockData'

const mockSetTogglePage = jest.fn()

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <EditManufacturerList
        setToggle={mockSetTogglePage}
        editManufacturerData={{
          manufacturerId: 0,
          manufacturerName: '',
          productId: 0,
          productName: '',
          departmentId: null,
          departmentName: null,
          createdBy: '',
          updatedBy: '',
          createdDate: '',
          updatedDate: '',
        }}
        setEditManufacturerData={mockSetTogglePage}
      />,
      {
        preloadedState: {
          ManufacturerList: {
            isLoading: ApiLoadingState.idle,
            listSize: 0,
            getAllManufacturerName: {},
            manufacturerList: {},
            manufacturerDetails: mockManufactureGetLookup,
          },
        },
      },
    )
  })
  test('should be able to render  edit Manufacturer List Title', () => {
    expect(screen.getByText('Edit Manufacturer Name')).toBeInTheDocument()
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
    const deleteBtnElement = screen.getByTestId('updateBtn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render component with out crashing', () => {
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
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
  test('should able to render every element', () => {
    const ManufacturerId = screen.getByTestId('productId')
    userEvent.type(ManufacturerId, '1')

    const ManufacturerName = screen.getByTestId('ManufacturerName')
    userEvent.type(ManufacturerName, 'Microsoft')
  })
})

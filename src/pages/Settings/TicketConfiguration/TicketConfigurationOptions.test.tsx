import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockDepartments,
  mockTicketConfigurationCategory,
  mockTicketConfigurationSubCategoryList,
} from '../../../test/data/ticketConfigurationData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const addButtonElement = 'addSubCategory-btn'
const exportButtonElement = 'export-button'
const viewButtonElement = 'view-button'
const clearButtonElement = 'clear-button'
const selectDepartment = 'dept-name'
const selectCategory = 'category-name'
const selectSubCategory = 'sub-category-name'
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketConfigurationOptions
      setFilterByDepartment={jest.fn()}
      setFilterByCategory={jest.fn()}
      setFilterBySubCategory={jest.fn()}
      setIsTableView={jest.fn()}
    />
  </div>
)
describe('Ticket Configurations Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ticketConfiguration: {
          isLoading: ApiLoadingState.succeeded,
          subCategoryList: mockTicketConfigurationSubCategoryList,
          departments: mockDepartments,
          categories: mockTicketConfigurationCategory,
          subCategories: mockTicketConfigurationCategory,
          listSize: 11,
          isLoadingFilterOptions: ApiLoadingState.succeeded,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Departments filter', () => {
    const departments = screen.findByTestId(selectDepartment)
    expect(departments).toBeTruthy()
  })
  test('should render Categories filter', () => {
    const categoryName = screen.findByTestId(selectCategory)
    expect(categoryName).toBeTruthy()
  })
  test('should render sub-category name select filter', () => {
    const subCategoryNameSelect = screen.findByTestId(selectSubCategory)
    expect(subCategoryNameSelect).toBeTruthy()
  })
  jest.retryTimes(3)
  test('should render add button', () => {
    const addButton = screen.findByTestId(addButtonElement)
    expect(addButton).toBeTruthy()
  })
  test('should render view button', () => {
    const viewButton = screen.findByTestId('view-button')
    expect(viewButton).toBeTruthy()
  })
  test('should render clear button', () => {
    const clearButton = screen.findByTestId(clearButtonElement)
    expect(clearButton).toBeTruthy()
  })
  test('should render click to export', () => {
    const deptNameEl = screen.getByTestId(selectDepartment)
    userEvent.selectOptions(deptNameEl, ['Networking'])
    expect(deptNameEl).toHaveValue('1')

    const viewButtonEl = screen.getByTestId(viewButtonElement)
    userEvent.click(viewButtonEl)
    const exportBtnEl = screen.getByTestId(exportButtonElement)
    expect(exportBtnEl).toBeInTheDocument()
  })
  test('should enable view button on the selection of filters', () => {
    const deptNameEle = screen.getByTestId(selectDepartment)
    userEvent.selectOptions(deptNameEle, ['Networking'])
    expect(deptNameEle).toHaveValue('1')

    const viewButtonEle = screen.getByTestId(viewButtonElement)
    expect(viewButtonEle).toBeEnabled()
  })
  test('should disable view button upon clicking clear button', () => {
    const deptNameElement = screen.getByTestId(selectDepartment)
    userEvent.selectOptions(deptNameElement, ['Administrative'])
    expect(deptNameElement).toHaveValue('2')

    const viewButtonEle = screen.getByTestId(viewButtonElement)
    const clearButtonEle = screen.getByTestId(clearButtonElement)
    userEvent.click(clearButtonEle)
    userEvent.selectOptions(deptNameElement, ['Select Department'])
    expect(viewButtonEle).toBeDisabled()
  })
})

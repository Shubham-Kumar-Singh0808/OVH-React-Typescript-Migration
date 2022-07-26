import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditNewEmployee from '.'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockEmployeeTypeDetails } from '../../../../test/data/employeeDetail'
import { mockAllTechnology } from '../../../../test/data/certificateTypeData'
import { listComposer } from '../../../../utils/helper'
import { mockCountries } from '../../../../test/data/visaListData'
import { mockEmploymentType } from '../../../../test/data/employmentTypeData'
import { mockJobTypes } from '../../../../test/data/JobTypesData'

const editBtnId = 'edit-employee'

const composedTechnologyList = listComposer(
  mockAllTechnology as [],
  'id',
  'name',
)

describe('Edit Employee Testing', () => {
  beforeEach(() => {
    render(<EditNewEmployee />, {
      preloadedState: {
        employee: {
          isLoading: ApiLoadingState.succeeded,
          editEmployee: mockEmployeeTypeDetails,
        },
        getAllTechnology: {
          isLoading: ApiLoadingState.succeeded,
          technologies: composedTechnologyList,
        },
        country: {
          isLoading: ApiLoadingState.succeeded,
          countries: mockCountries,
        },
        getAllEmploymentType: {
          employments: mockEmploymentType,
        },
        getJobTypes: {
          jobTypes: mockJobTypes,
        },
      },
    })
  })

  test('should be able to render Edit employee button', () => {
    expect(screen.getByTestId(editBtnId)).toBeInTheDocument()
  })

  test('should be able to update employee', () => {
    const staatusSelector = screen.getByTestId('formRelievingDate')
    userEvent.selectOptions(staatusSelector, ['Active'])

    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
  })

  test('should be able to select Technology and update employee', () => {
    const OSelectListSelector = screen.getByTestId('formTechnology')
    userEvent.selectOptions(OSelectListSelector, ['Java'])

    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
  })

  test('should be able to select Country and update employee', () => {
    const OSelectListSelector = screen.getByTestId('formCountry')
    userEvent.selectOptions(OSelectListSelector, ['INDIA'])

    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
  })

  test('should be able to select Employment Type and update employee', () => {
    const OSelectListSelector = screen.getByTestId('formEmploymentType')
    userEvent.selectOptions(OSelectListSelector, ['Temporary'])

    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
  })

  test('should be able to select Job Type and update employee', () => {
    const OSelectListSelector = screen.getByTestId('formJobType')
    userEvent.selectOptions(OSelectListSelector, ['External Vendor'])

    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
  })

  test('should stay disable edit employee button when rendered', () => {
    render(<EditNewEmployee />, {
      preloadedState: {
        employee: {
          isLoading: ApiLoadingState.succeeded,
          editEmployee: {},
        },
      },
    })

    const updateBtn = screen.getAllByTestId(editBtnId)
    expect(updateBtn[1]).toHaveAttribute('disabled')
  })

  test('should render "Edit Employee" title', () => {
    expect(screen.getByText('Edit Employee')).toBeInTheDocument()
  })
})

describe('Edit Employee Testing without state', () => {
  beforeEach(() => {
    render(<EditNewEmployee />)
  })

  test('should render loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})

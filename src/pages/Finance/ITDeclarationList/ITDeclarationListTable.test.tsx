import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ITDeclarationListTable from './ITDeclarationListTable'
import { initialITForm } from './ITDeclarationListHelpers'
import { act, cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockInvestmentCycles,
} from '../../../test/data/itDeclarationListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import ITDeclarationFormViewTable from '../ITDeclarationListFormView/ITDeclarationFormViewTable'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationListTable
      paginationRange={[1, 2, 3]}
      currentPage={1}
      setCurrentPage={mockSetCurrentPage}
      pageSize={1}
      setPageSize={mockSetPageSize}
      viewDeclarationFormButtonHandler={jest.fn()}
    />
  </div>
)

describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeId: 1880,
          },
        },
        itDeclarationList: {
          isLoading: ApiLoadingState.succeeded,
          cycles: mockInvestmentCycles,
          itDeclarationForms: mockDeclarationList.itforms,
          listSize: 15,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the "IT DeclarationList" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee ID' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'My Saving' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
  })
  test('should render view DeclarationForm button in the Actions', () => {
    const viewButtonEl = screen.getByTestId('viewItDeclarationForm-btn0')
    expect(viewButtonEl).toBeInTheDocument()
  })
  test('should render correct number of page records', () => {
    // 16 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(16)
  })
  test('should render View IT DeclarationForm upon clicking view button', () => {
    const viewButtonEle = screen.getByTestId('viewItDeclarationForm-btn1')
    userEvent.click(viewButtonEle)
    expect(
      render(
        <ITDeclarationFormViewTable viewDeclarationForm={initialITForm} />,
      ),
    ).toBeTruthy()
  })
  test('edit button functionality', () => {
    act(() => {
      userEvent.click(screen.getByTestId('itDecFormEditBtn-0'))
    })
  })
})

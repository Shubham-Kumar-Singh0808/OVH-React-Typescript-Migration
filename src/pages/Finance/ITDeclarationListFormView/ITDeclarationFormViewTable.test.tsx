import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ITDeclarationFormViewTable from './ITDeclarationFormViewTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockInvestmentCycles,
} from '../../../test/data/itDeclarationListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import ITDeclarationList from '../ITDeclarationList/ITDeclarationList'
import { ITForm } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationList />
  </div>
)

const mockITForm: ITForm = {
  itDeclarationFormId: 102,
  employeeId: 1889,
  employeeName: 'Sravan Bachu',
  panNumber: 'AJOPB1100B',
  designation: 'Module Lead',
  formSectionsDTOs: [
    {
      itSectionsId: 260,
      sectionId: 1,
      sectionName: '80 C',
      isOld: true,
      maxLimit: 150000,
      formInvestmentDTO: [
        {
          formInvestmentId: 382,
          investmentId: 5,
          investmentName: 'Principal repayment of Home LoanTestB',
          customAmount: 150000,
        },
      ],
    },
    {
      itSectionsId: 264,
      sectionId: 9,
      sectionName: '24',
      isOld: true,
      maxLimit: 200000,
      formInvestmentDTO: [
        {
          formInvestmentId: 387,
          investmentId: 14,
          investmentName: 'Interest on Home LoanTestC',
          customAmount: 166000,
        },
      ],
    },
  ],
  organisationName: 'CTE',
  fromDate: '01/04/2018',
  toDate: '01/06/2018',
  isAgree: null,
  grandTotal: 316000,
  filePath: null,
  cycleId: 2,
}

describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(<ITDeclarationFormViewTable viewDeclarationForm={mockITForm} />, {
      preloadedState: {
        itDeclarationList: {
          isLoading: ApiLoadingState.succeeded,
          cycles: mockInvestmentCycles,
          itDeclarationForms: mockDeclarationList.itforms,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the "IT DeclarationForm View" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Sections' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Investment' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Saving Amount' }),
    ).toBeTruthy()
  })
  test('should render back button in the Page and redirect to `ITDeclarationList` upon clicking', () => {
    const backButtonEl = screen.getByTestId('back-btn')
    expect(backButtonEl).toBeInTheDocument()
    userEvent.click(backButtonEl)
    expect(render(toRender)).toBeTruthy()
  })
  test('should be able to render IT DeclarationForm view Title', () => {
    expect(screen.getByText('IT Declaration Form View')).toBeInTheDocument()
  })
  test('should able to render Deduction available for Salaried employees under Income Tax Act 1961 Title', () => {
    expect(
      screen.getByText(
        'Deduction available for Salaried employees under Income Tax Act 1961',
      ),
    ).toBeInTheDocument()
  })
  test('should render Employee Details', () => {
    expect(
      screen.getByText(mockITForm.employeeId.toString()),
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockITForm.employeeName.toString()),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        mockITForm.panNumber ? mockITForm.panNumber?.toString() : '',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(mockITForm.designation)).toBeInTheDocument()
  })
  test('should render Sections added by the Employee', () => {
    expect(screen.getByText('80 C')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
  })
  test('should render Investments added by the Employee', () => {
    expect(
      screen.getByText('Principal repayment of Home LoanTestB'),
    ).toBeInTheDocument()
    expect(screen.getByText('Interest on Home LoanTestC')).toBeInTheDocument()
  })
  test('should render Grand_total added by the Employee', () => {
    expect(screen.getByTestId('viewITForm-grand-total')).toHaveTextContent(
      `Grand Total: ${mockITForm.grandTotal.toLocaleString('en-IN')}`,
    )
  })
})

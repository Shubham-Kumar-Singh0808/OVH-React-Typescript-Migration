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

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationList />
  </div>
)
describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(
      <ITDeclarationFormViewTable
        viewDeclarationForm={{
          fromDate: '',
          grandTotal: 316000,
          isAgree: null,
          itDeclarationFormId: 0,
          organisationName: '',
          panNumber: 'ABC123EF',
          toDate: '',
          cycleId: 0,
          designation: 'Software Engineer',
          employeeId: 1983,
          employeeName: 'Sai Banothu',
          filePath: null,
          formSectionsDTOs: [
            {
              itSectionsId: 488,
              sectionId: 1,
              sectionName: '80 C',
              isOld: true,
              maxLimit: 150000,
              formInvestmentDTO: [
                {
                  formInvestmentId: 689,
                  investmentId: 82,
                  investmentName: 'Test',
                  customAmount: 10000,
                },
                {
                  formInvestmentId: 690,
                  investmentId: 1,
                  investmentName: 'LIC',
                  customAmount: 20000,
                },
              ],
            },
            {
              itSectionsId: 489,
              sectionId: 6,
              sectionName: '80 E',
              isOld: true,
              maxLimit: 100000,
              formInvestmentDTO: [
                {
                  formInvestmentId: 691,
                  investmentId: 10,
                  investmentName:
                    'Interest on Education Loan for Higher Studies',
                  customAmount: 25000,
                },
              ],
            },
          ],
        }}
      />,
      {
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
      },
    )
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
    expect(screen.getByText('1983')).toBeInTheDocument()
    expect(screen.getByText('Sai Banothu')).toBeInTheDocument()
    expect(screen.getByText('ABC123EF')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })
  test('should render Sections added by the Employee', () => {
    expect(screen.getByText('80 C')).toBeInTheDocument()
    expect(screen.getByText('80 E')).toBeInTheDocument()
  })
  test('should render Investments added by the Employee', () => {
    expect(screen.getByText('LIC')).toBeInTheDocument()
    expect(
      screen.getByText('Interest on Education Loan for Higher Studies'),
    ).toBeInTheDocument()
  })
  test('should render Savings Amount added by the Employee', () => {
    expect(screen.getByText('10,000')).toBeInTheDocument()
    expect(screen.getByText('25,000')).toBeInTheDocument()
  })
  test('should render Sub_total amount for each Section added by the Employee', () => {
    expect(screen.getByText('Sub Total: 30000')).toBeInTheDocument()
    expect(screen.getByText('Sub Total: 25000')).toBeInTheDocument()
  })
  test('should render Max_amount for each Section added by the Employee', () => {
    expect(screen.getByText('Max-Amount: 100,000')).toBeInTheDocument()
    expect(screen.getByText('Max-Amount: 150,000')).toBeInTheDocument()
  })
  test('should render Grand_total added by the Employee', () => {
    expect(screen.getAllByText('Grand Total: 316,000')[0]).toBeInTheDocument()
  })
})

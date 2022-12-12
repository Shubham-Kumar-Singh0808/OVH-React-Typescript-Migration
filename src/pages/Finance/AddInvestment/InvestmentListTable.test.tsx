import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import InvestmentListTable from './InvestmentListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/investmentCheckListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <InvestmentListTable />
  </div>
)
describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        itDeclarationList: {
          isLoading: ApiLoadingState.succeeded,
          sections: mockSections,
          investments: mockInvestments,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the "Investments" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Section' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Investment' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Required Documents' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Limits' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
  })
  test('should render Delete Buttons in the Actions', () => {
    const delButtonEl = screen.getByTestId('investment-delete-btn0')
    expect(delButtonEl).toBeInTheDocument()
  })
  test('should render edit Buttons in the Actions', () => {
    const editButtonEl = screen.getByTestId('investment-edit-btn0')
    expect(editButtonEl).toBeInTheDocument()
  })
  test('should render correct number of page records', () => {
    // 16 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(11)
  })
  it('should render Delete modal popup upon clicking delete button from Actions', async () => {
    const deleteButtonEl = screen.getByTestId('investment-delete-btn1')
    userEvent.click(deleteButtonEl)
    await waitFor(() => {
      expect(screen.getByText('Delete Investment')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should close modal popup after clicking Yes option from the modal', () => {
    const deleteButtonElement = screen.getByTestId('investment-delete-btn2')
    userEvent.click(deleteButtonElement)
    const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonEle)
  })
  test('should open modal when clicking on description link', async () => {
    const descLinkElement = screen.getByTestId('desc-comments1')
    userEvent.click(descLinkElement)
    const description = screen.getAllByText('.')
    await waitFor(() => {
      expect(description[0]).toBeInTheDocument()
    })
  })
  test('should open modal when clicking on required documents link', async () => {
    const reqDocsLinkElement = screen.getByTestId('req-docs-desc1')
    userEvent.click(reqDocsLinkElement)
    const requiredDocsDetails = screen.getAllByText(
      'Investment Document to be Subm...',
    )
    await waitFor(() => {
      expect(requiredDocsDetails[0]).toBeInTheDocument()
    })
  })
})

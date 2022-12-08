import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import SectionListTable from './SectionListTable'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockSections } from '../../../../test/data/investmentCheckListData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SectionListTable editSectionButtonHandler={jest.fn()} />
  </div>
)
describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        itDeclarationList: {
          isLoading: ApiLoadingState.succeeded,
        },
        investmentCheckList: {
          sections: mockSections,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the "Sections" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Section' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Limit' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
  })
  test('should render Delete Buttons in the Actions', () => {
    const delButtonEl = screen.getByTestId('section-delete-btn0')
    expect(delButtonEl).toBeInTheDocument()
  })
  test('should render edit Buttons in the Actions', () => {
    const editButtonEl = screen.getByTestId('section-edit-btn0')
    expect(editButtonEl).toBeInTheDocument()
  })
  test('should render correct number of page records', () => {
    // 16 including the heading
    expect(screen.queryAllByRole('row')).toHaveLength(10)
  })
  it('should render Delete modal popup upon clicking delete button from Actions', async () => {
    const deleteButtonEl = screen.getByTestId('section-delete-btn1')
    userEvent.click(deleteButtonEl)
    await waitFor(() => {
      expect(screen.getByText('Delete Section')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should close modal popup after clicking Yes option from the modal', () => {
    const deleteButtonElement = screen.getByTestId('section-delete-btn2')
    userEvent.click(deleteButtonElement)
    const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonEle)
  })
})

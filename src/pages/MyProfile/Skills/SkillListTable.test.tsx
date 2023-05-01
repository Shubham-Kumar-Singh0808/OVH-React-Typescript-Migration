import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import SkillListTable from './SkillListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockSkills } from '../../../test/data/skillListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SkillListTable />
  </div>
)

describe('Tracker List Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render the table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })
})

describe('Add Tracker List Table without data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        skill: {
          skills: mockSkills,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render with data ', () => {
    expect(screen.getByText('skillMock1')).toBeInTheDocument()
  })
  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('category-delete-btn1')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Delete' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockSkills.length),
    ).toBeInTheDocument()
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MileStoneTable from './MileStoneTable'
import { mockMileStonesList } from '../../../../../test/data/projectMilestoneData'
import { render, screen, waitFor } from '../../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <MileStoneTable />,
  </div>
)
describe('MileStoneTable component with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectMileStone: {
          mileStonesList: mockMileStonesList,
        },
      },
    })
  })
  test('should open modal when clicking on subject link', () => {
    const linkElement = screen.getByTestId('title-test')
    userEvent.click(linkElement)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
  jest.retryTimes(3)
  test('should open modal when clicking on description link', () => {
    const linkElement = screen.getByTestId('comments-test')
    userEvent.click(linkElement)
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockMileStonesList.size),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render employee Reportees table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)
      expect(screen.getAllByRole('row')).toHaveLength(2)
    })
  })
})

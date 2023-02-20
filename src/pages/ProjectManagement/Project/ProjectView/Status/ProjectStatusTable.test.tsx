import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectStatusTable from './ProjectStatusTable'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockProjectStatusList } from '../../../../../test/data/projectStatusTabData'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectStatusTable
      paginationRange={[1, 2, 3]}
      currentPage={1}
      setCurrentPage={jest.fn()}
      pageSize={20}
      setPageSize={jest.fn()}
      setToggle={jest.fn()}
      setEditCurrentWeekDate={jest.fn()}
      setEditNextWeekDate={jest.fn()}
      setEditNextWeekStatus={jest.fn()}
      setEditCurrentWeekStatus={jest.fn()}
      setStatusId={jest.fn()}
    />
    ,
  </div>
)

describe('ProjectStatusTable component with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectStatus: {
          statusReportList: mockProjectStatusList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockProjectStatusList.size),
    ).toBeInTheDocument()
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render ProjectStatusTable component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(23)
    })
  })
  test('should open modal when clicking on ticket description link', () => {
    const linkElement = screen.getAllByTestId('subject-comments')
    fireEvent.click(linkElement[0], '')
    expect(linkElement).toBeTruthy()
  })
  test('should open modal when clicking on next week status link', () => {
    const linkElement = screen.getAllByTestId('dsc-comments')
    fireEvent.click(linkElement[0], '')
    expect(linkElement).toBeTruthy()
  })
  test('should click on delete button ', () => {
    const deleteElement = screen.getAllByTestId('delete-btn')
    expect(deleteElement[0]).toBeInTheDocument()
    userEvent.click(deleteElement[0])
    const confirmDeleteBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDeleteBtn)
    expect(confirmDeleteBtn)
  })
  test('should click on edit button  ', () => {
    const editElement = screen.getAllByTestId('edit-btn')
    userEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
  })
})

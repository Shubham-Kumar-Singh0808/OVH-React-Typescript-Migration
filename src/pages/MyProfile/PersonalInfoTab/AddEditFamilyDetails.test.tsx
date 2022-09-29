import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { mockFamilyTableDetails } from '../../../test/data/familyTableData'

const mockBackbuttonhandler = jest.fn()

describe('Family Table component with data', () => {
  beforeEach(() => {
    render(
      <AddEditFamilyDetails
        headerTitle={''}
        confirmButtonText={''}
        backButtonHandler={mockBackbuttonhandler}
      />,
      {
        preloadedState: {
          personalInfoDetails: {
            employeeFamilyDetails: mockFamilyTableDetails,
          },
        },
      },
    )
  })
  test('should click on delete button ', () => {
    const deleteElement = screen.getAllByTestId('delete-family')
    expect(deleteElement[0]).toBeInTheDocument()
    userEvent.click(deleteElement[0])
    const confirmDeleteBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDeleteBtn)
    expect(confirmDeleteBtn)
  })
  test('should click on edit button  ', () => {
    const editElement = screen.getAllByTestId('edit-family')
    userEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
  })

  test('should render with data ', () => {
    expect(screen.getByText('vinesh')).toBeInTheDocument()
    expect(screen.getByText('Brother')).toBeInTheDocument()
    expect(screen.getByText('970150987')).toBeInTheDocument()
    expect(screen.getByText('23/03/2022')).toBeInTheDocument()
  })
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockFamilyTableDetails.length),
    ).toBeInTheDocument()
  })
})

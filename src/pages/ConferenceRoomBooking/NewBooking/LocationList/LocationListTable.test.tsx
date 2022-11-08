import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocationListTable from './LocationListTable'
import { render, screen } from '../../../../test/testUtils'
import { mockLocationNames } from '../../../../test/data/addLocationListData'

describe('Add Location List Table without data', () => {
  beforeEach(() => {
    render(<LocationListTable userDeleteAccess={true} />, {
      preloadedState: {
        addLocationList: {
          meetingLocations: mockLocationNames,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Add LocationList component with data', () => {
    expect(screen.getByText('RayBusiness-1')).toBeInTheDocument()
    expect(screen.getByText('Business room')).toBeInTheDocument()
    expect(screen.getByText('Skype')).toBeInTheDocument()
    expect(screen.getByText('Meeting Room 1')).toBeInTheDocument()
    expect(screen.getByText('hgh')).toBeInTheDocument()
    expect(screen.getByText('dfd')).toBeInTheDocument()
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-delete10')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
})

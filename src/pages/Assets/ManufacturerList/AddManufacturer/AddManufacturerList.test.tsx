import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddManufacturerList from './AddManufacturerList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen } from '../../../../test/testUtils'

describe('Manufracturer List without data', () => {
  beforeEach(() => {
    render(<AddManufacturerList setToggle={jest.fn()} />, {
      preloadedState: {
        ManufacturerList: {
          isLoading: ApiLoadingState.idle,
          listSize: 0,
          getAllManufacturerName: {},
          manufacturerList: {},
          manufacturerDetails: [],
        },
      },
    })
  })
  test('should be able to render  Manufacturer List  Title', () => {
    expect(screen.getByText('Add Manufacturer Name')).toBeInTheDocument()
  })
})

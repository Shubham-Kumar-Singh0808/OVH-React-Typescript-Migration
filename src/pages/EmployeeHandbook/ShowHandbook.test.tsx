import '@testing-library/jest-dom'
import React from 'react'
import ShowHandbook from './ShowHandbook'
import { render, screen, waitFor } from '../../test/testUtils'
import { mockHandbookList } from '../../test/data/handbookListData'

describe('Show Handbook Component Testing', () => {
  test('should render SHow Handbook screen and back button without crashing', async () => {
    render(<ShowHandbook />, {
      preloadedState: {
        showHandbook: {
          handbook: mockHandbookList,
        },
      },
    })
    await waitFor(() => {
      expect(screen.queryByTestId('back-button')).toBeInTheDocument()
    })
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import ShowHandbook from './ShowHandbook'
import { render, screen, waitFor } from '../../test/testUtils'

describe('Show Handbook Component Testing', () => {
  test('should render SHow Handbook screen and back button without crashing', async () => {
    render(<ShowHandbook />)
    await waitFor(() =>
      expect(screen.getByTestId('back-button')).toBeInTheDocument(),
    )
  })
})

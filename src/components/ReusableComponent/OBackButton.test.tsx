import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import OBackButton from './OBackButton'
import { render, screen, waitFor } from '../../test/testUtils'

let history: any

describe('OBackButton Component', () => {
  describe('Should be able to render component', () => {
    beforeEach(() => {
      history = createMemoryHistory()
      render(<OBackButton destination={'/'} name={'back'} />)
    })

    test('should be able to render OBackButton Component Name', () => {
      expect(screen.getByText('back')).toBeInTheDocument()
    })

    test('should be able to render OBackButton Component destination', async () => {
      const backBtn = screen.getByTestId('back-btn')
      userEvent.click(backBtn)

      await waitFor(() => {
        expect(history.location.pathname).toBe('/')
      })
    })
  })
})

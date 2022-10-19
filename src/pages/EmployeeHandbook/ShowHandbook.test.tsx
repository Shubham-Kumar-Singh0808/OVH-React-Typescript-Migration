import '@testing-library/jest-dom'
import React from 'react'
import ShowHandbook from './ShowHandbook'
import { render, screen, waitFor } from '../../test/testUtils'
import { mockHandbookList } from '../../test/data/handbookListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ShowHandbook />
  </div>
)

describe('Show Handbook Component Testing', () => {
  test('should render SHow Handbook screen and back button without crashing', async () => {
    render(toRender, {
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

import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Proposal from './Proposal'
import { render, screen } from '../../../../../test/testUtils'
import { mockProjectProposals } from '../../../../../test/data/projectProposalsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Proposal />
  </div>
)

describe('ProjectProposals Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectProposals: {
          projectProposal: mockProjectProposals,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const notesLink = screen.getByTestId('proposal-link')
    userEvent.type(notesLink, 'testing')
    expect(notesLink).toHaveValue('testing')

    const postBtnElement = screen.getByRole('button', { name: 'Post' })
    expect(postBtnElement).toBeEnabled()
    userEvent.click(postBtnElement)
  })

  test('should be able to click post button element', () => {
    const toggleBtn = screen.getByRole('button', { name: 'Post' })
    userEvent.click(toggleBtn)
    expect(toggleBtn).toBeInTheDocument()
  })
})
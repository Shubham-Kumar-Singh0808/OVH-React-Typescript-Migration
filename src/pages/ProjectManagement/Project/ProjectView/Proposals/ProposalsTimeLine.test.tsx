import React from 'react'
import '@testing-library/jest-dom'
import ProposalsTimeLine from './ProposalsTimeLine'
import { render, screen } from '../../../../../test/testUtils'
import { mockProjectProposals } from '../../../../../test/data/projectProposalsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProposalsTimeLine />
  </div>
)

describe('ProposalsTimeLine Component Testing', () => {
  describe('should render ProposalsTimeLine Component without data', () => {
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
    test('should render ', () => {
      mockProjectProposals.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.postedBy)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
  })
})

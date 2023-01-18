import React from 'react'
import '@testing-library/jest-dom'
import ProjectNotesTimeLine from './ProjectNotesTimeLine'
import { render, screen } from '../../../../../test/testUtils'
import { mockProjectNotes } from '../../../../../test/data/projectNotesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectNotesTimeLine />
  </div>
)

describe('ProjectNotesTimeLine Component Testing', () => {
  describe('should render ProjectNotesTimeLine Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectNotes: {
            projectNotesTimeLine: mockProjectNotes,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockProjectNotes.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.postDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
  })
})

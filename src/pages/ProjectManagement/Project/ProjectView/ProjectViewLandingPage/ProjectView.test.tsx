import '@testing-library/jest-dom'
import React from 'react'
import ProjectView from './ProjectView'
import { render, screen } from '../../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectView />
  </div>
)

describe('ProjectView Component Testing', () => {
  test('should render ProjectView component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Project Details')).toBeInTheDocument()
  })
})

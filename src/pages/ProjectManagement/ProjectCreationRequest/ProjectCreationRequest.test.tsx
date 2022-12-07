import '@testing-library/jest-dom'
import React from 'react'
import ProjectCreationRequest from './ProjectCreationRequest'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectCreationRequest />
  </div>
)

describe('ProjectCreationRequest Component Testing', () => {
  test('should render ProjectCreationRequest component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Project Request Report')).toBeInTheDocument()
  })
})

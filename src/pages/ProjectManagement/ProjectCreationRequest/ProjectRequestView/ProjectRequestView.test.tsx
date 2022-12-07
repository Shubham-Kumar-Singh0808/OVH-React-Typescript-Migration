import '@testing-library/jest-dom'
import React from 'react'
import ProjectRequestView from './ProjectRequestView'
import { render, screen } from '../../../../test/testUtils'

const setToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectRequestView setToggle={setToggle} />
  </div>
)

describe('ProjectRequestView Component Testing', () => {
  test('should render ProjectRequestView component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Project Request History')).toBeInTheDocument()
  })
})

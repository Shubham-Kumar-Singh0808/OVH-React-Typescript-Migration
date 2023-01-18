import '@testing-library/jest-dom'
import React from 'react'
import ProjectHistoryDetails from './ProjectHistoryDetails'
import { render, screen } from '../../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectHistoryDetails />
  </div>
)

describe('Project History Details Component Testing', () => {
  test('should render Project History Details component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Project History Details')).toBeInTheDocument()
  })
})

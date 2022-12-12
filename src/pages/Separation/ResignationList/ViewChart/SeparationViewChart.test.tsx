import '@testing-library/jest-dom'
import React from 'react'
import SeparationViewChart from './SeparationViewChart'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SeparationViewChart />
  </div>
)

describe('SeparationViewChart Component Testing', () => {
  test('should render SeparationViewChart component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Resignation List')).toBeInTheDocument()
  })
})

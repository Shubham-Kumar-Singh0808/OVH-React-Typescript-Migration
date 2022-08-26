import '@testing-library/jest-dom'

import React from 'react'
import Clients from './Clients'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Clients />
  </div>
)

describe('Clients Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  screen.debug()
  test('should render clients component with out crashing', () => {
    expect(screen.getByText('Clients')).toBeInTheDocument()
  })
})

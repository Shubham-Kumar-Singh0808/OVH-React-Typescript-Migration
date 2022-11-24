import '@testing-library/jest-dom'
import React from 'react'
import EditConfigurationOptions from './EditConfigurationOptions'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditConfigurationOptions />
  </div>
)

describe('Edit Configuration Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should be able to render  Edit Configuration  Title', () => {
    expect(screen.getByText('Edit Configuration')).toBeInTheDocument()
  })
})

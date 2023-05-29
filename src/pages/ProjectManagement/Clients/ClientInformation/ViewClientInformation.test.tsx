import React from 'react'
import ViewClientInformation from './ViewClientInformation'
import { render, screen } from '../../../../test/testUtils'
import '@testing-library/jest-dom'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<ViewClientInformation />)
  })
  test('should render "Client Information" title', () => {
    const clientInformationTitle = screen.getByRole('heading', {
      name: 'Client Information',
    })
    expect(clientInformationTitle).toBeTruthy()
  })
  test('should render Back button', () => {
    expect(screen.getByTestId('back-btn')).toBeTruthy()
  })
})

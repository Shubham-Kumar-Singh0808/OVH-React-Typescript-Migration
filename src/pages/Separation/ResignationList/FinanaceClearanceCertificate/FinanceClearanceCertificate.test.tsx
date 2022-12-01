import '@testing-library/jest-dom'
import React from 'react'
import FinanceClearanceCertificate from './FinanceClearanceCertificate'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <FinanceClearanceCertificate />
  </div>
)

describe('FinanceClearanceCertificate Component Testing', () => {
  test('should render FinanceClearanceCertificate component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Clearance Certificate')).toBeInTheDocument()
  })
})

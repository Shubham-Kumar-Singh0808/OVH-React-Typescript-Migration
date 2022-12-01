import '@testing-library/jest-dom'
import React from 'react'
import HRClearanceCertificate from './HRClearanceCertificate'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <HRClearanceCertificate />
  </div>
)

describe('HRClearanceCertificate Component Testing', () => {
  test('should render HRClearanceCertificate component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Clearance Certificate')).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import ITClearanceCertificate from './ITClearanceCertificate'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITClearanceCertificate />
  </div>
)

describe('ITClearanceCertificate Component Testing', () => {
  test('should render ITClearanceCertificate component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Clearance Certificate')).toBeInTheDocument()
  })
})

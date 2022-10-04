import '@testing-library/jest-dom'

import React from 'react'
import CertificatesList from './CertificatesList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <CertificatesList />
  </div>
)

describe('Certificates List Component Testing', () => {
  test('should render certificates list component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Certificate Details')).toBeInTheDocument()
  })
})

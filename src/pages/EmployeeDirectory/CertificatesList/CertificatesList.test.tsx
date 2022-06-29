import '@testing-library/jest-dom'

import React from 'react'
import CertificatesList from './CertificatesList'
import { render, screen } from '../../../test/testUtils'

describe('Certificates List Component Testing', () => {
  test('should render certificates list component with out crashing', () => {
    render(<CertificatesList />)
    expect(screen.getByText('Certificate Details')).toBeInTheDocument()
  })
})

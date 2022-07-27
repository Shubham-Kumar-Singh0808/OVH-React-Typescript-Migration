import '@testing-library/jest-dom'

import React from 'react'
import CertificateType from './CertificateType'
import { render, screen } from '../../../../test/testUtils'

describe('Certificate Type Component Testing', () => {
  test('should render certificate type component with out crashing', () => {
    render(<CertificateType />)
    expect(screen.getByText('Certificate Type')).toBeInTheDocument()
  })
})

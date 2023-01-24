import '@testing-library/jest-dom'
import React from 'react'
import AdminClearanceCertificate from './AdminClearanceCertificate'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AdminClearanceCertificate />
  </div>
)

describe('AdminClearanceCertificate Component Testing', () => {
  test('should render AdminClearanceCertificate component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Clearance Certificate')).toBeInTheDocument()
  })
})

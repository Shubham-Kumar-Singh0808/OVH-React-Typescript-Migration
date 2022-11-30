import '@testing-library/jest-dom'
import React from 'react'
import ManagerClearanceCertificate from './ManagerClearanceCertificate'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ManagerClearanceCertificate />
  </div>
)

describe('ManagerClearanceCertificate Component Testing', () => {
  test('should render ManagerClearanceCertificate component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Clearance Certificate')).toBeInTheDocument()
  })
})
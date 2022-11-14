import '@testing-library/jest-dom'
import React from 'react'
import AddNewCertificateType from './AddNewCertificateType'
import { render, screen } from '../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { mockAllTechnology } from '../../../../test/data/certificateTypeData'

const mockTechnology = {
  id: 1,
  name: 'Java',
}

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Technology:')).toBeInTheDocument()
  expect(screen.getByText('Certificate:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}

describe('Add New CertificateType Testing', () => {
  beforeEach(() => {
    render(
      <AddNewCertificateType
        selectedTechnologyId={0}
        setSelectedTechnologyId={jest.fn()}
      />,
      {
        preloadedState: {
          employeeCertifications: {
            getAllTechnologies: mockAllTechnology,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  test('should render add new CertificateType form without crashing', () => {
    expectComponentToBeRendered()
  })

  test('should find add and clear buttons in the form', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should render select element', () => {
    expect(screen.getByText('Technology:')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
  })

  test('should correctly set default option', () => {
    expect(
      screen.getByRole('option', { name: 'Select Technology' }).selected,
    ).toBe(true)
  })

  it('should be fetched from the server and put in the store', () => {
    expect(mockTechnology.name).toHaveLength(4)
  })
})

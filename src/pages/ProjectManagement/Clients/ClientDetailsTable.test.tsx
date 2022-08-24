import React from 'react'
import '@testing-library/jest-dom'
import ClientDetailsTable from './ClientDetailsTable'
import { render, screen } from '../../../test/testUtils'
import { mockProjectsUnderClient } from '../../../test/data/clientsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ClientDetailsTable />
  </div>
)

describe('Client Details Table Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render the "Clients Details" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(
      screen.getByRole('columnheader', { name: 'Project Code' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Project Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Pricing Model' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Resources' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Project Manager' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Delivery Manager' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Start Date' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'End Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
  })

  describe('Client Details Table Component with data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          clients: {
            projectsUnderClient: mockProjectsUnderClient,
          },
        },
      })
    })
    test('should render client details table component with data', () => {
      mockProjectsUnderClient.forEach((project) => {
        expect(screen.getByText(project.projectName)).toBeInTheDocument()
      })
    })
  })
})

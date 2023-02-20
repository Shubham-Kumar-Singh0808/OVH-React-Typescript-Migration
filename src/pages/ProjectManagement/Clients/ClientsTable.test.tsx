import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ClientsTable from './ClientsTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockClientsData } from '../../../test/data/clientsData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockClientsData.clients[i].clientCode),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ClientsTable
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      currentPage={1}
      pageSize={20}
      paginationRange={[1, 2, 3]}
      selectedClientStatus={''}
    />
  </div>
)

describe('Clients Table Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  test('should render the "clients" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Code' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Organization' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Client' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Contact Person' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Country' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'F.P' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'R.P' })).toBeTruthy()
  })

  describe('Clients Table Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          clients: {
            clientsList: mockClientsData,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render clients Table component with data without crashing', async () => {
      expectPageSizeToBeRendered(20)
      await waitFor(() => {
        userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
        expect(mockSetPageSize).toHaveBeenCalledTimes(1)
        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
      })
    })
    test('should render delete modal', () => {
      const deleteElement = screen.getAllByTestId('client-delete-btn18')
      expect(deleteElement[0]).toBeInTheDocument()
      userEvent.click(deleteElement[0])
      const confirmDeleteBtn = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(confirmDeleteBtn)
      expect(confirmDeleteBtn)
    })
  })
})

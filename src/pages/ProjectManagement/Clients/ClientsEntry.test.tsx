import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ClientsEntry from './ClientsEntry'
import { render, screen } from '../../../test/testUtils'

const mockClient = {
  id: 40,
  clientCode: '129',
  name: 'Adventist Risk Management',
  address: '12501 Old Columbia Pike Silver Spring,\nMD 20904',
  personName: 'Brad Woodruff',
  email: 'bwoodruff@adventistrisk.org',
  country: 'USA',
  phone: '1-30168068',
  description: null,
  organization: 'Adventist Risk Management Inc.',
  totalFixedBids: 2,
  totalRetainers: 1,
  clientStatus: true,
  gstCode: null,
}

const mockOnDeleteBtnClick = jest.fn()
const mockSetSelectedClientId = jest.fn()
const mockSetIsIconVisible = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ClientsEntry
      id={40}
      client={mockClient}
      key={1}
      selectedClientId={40}
      setSelectedClientId={mockSetSelectedClientId}
      onDeleteBtnClick={mockOnDeleteBtnClick}
      isIconVisible={true}
      setIsIconVisible={mockSetIsIconVisible}
    />
  </div>
)
describe('Clients Entry Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should show the correct client code', () => {
    const clientCode = screen.getByRole('cell', {
      name: mockClient.clientCode,
    })
    expect(clientCode).toBeTruthy()
  })
  test('should show the correct client name', () => {
    const clientName = screen.getByRole('cell', {
      name: mockClient.name,
    })
    expect(clientName).toBeTruthy()
  })
  test('should show the correct contact person', () => {
    const clientContactPerson = screen.getByRole('cell', {
      name: mockClient.personName,
    })
    expect(clientContactPerson).toBeTruthy()
  })
  test('should show the correct email id', () => {
    const clientEmailId = screen.getByRole('cell', {
      name: mockClient.email,
    })
    expect(clientEmailId).toBeTruthy()
  })
  test('should show the correct country', () => {
    const clientCountry = screen.getByRole('cell', {
      name: mockClient.country,
    })
    expect(clientCountry).toBeTruthy()
  })
  test('should render expandIcon', () => {
    const rowExpandIcon = screen.getByTestId('expandIcon')
    userEvent.click(rowExpandIcon)
    expect(rowExpandIcon).toBeTruthy()
  })

  describe('Clients Entry Component testing with different data', () => {
    beforeEach(() => {
      render(
        <div>
          <div id="backdrop-root"></div>
          <div id="overlay-root"></div>
          <div id="root"></div>
          <ClientsEntry
            id={40}
            client={mockClient}
            key={1}
            selectedClientId={40}
            setSelectedClientId={mockSetSelectedClientId}
            onDeleteBtnClick={mockOnDeleteBtnClick}
            isIconVisible={false}
            setIsIconVisible={mockSetIsIconVisible}
          />
        </div>,
      )
    })
    test('should render collapseIcon', () => {
      const rowCollapseIcon = screen.getByTestId('collapseIcon')
      userEvent.click(rowCollapseIcon)
      expect(rowCollapseIcon).toBeTruthy()
    })
  })
})

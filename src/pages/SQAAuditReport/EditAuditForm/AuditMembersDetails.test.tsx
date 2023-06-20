import '@testing-library/jest-dom'
import React from 'react'
import AuditMembersDetails from './AuditMembersDetails'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { mockEmployeeNames } from '../../../test/data/allocateEmployeeData'

const toRenderAuditors = (
  <AuditMembersDetails
    auditLabel={'Auditors :'}
    options={mockEmployeeNames}
    placeholder={[]}
    selectedValues={[]}
    handleOnSelect={jest.fn()}
    handleOnRemove={jest.fn()}
  />
)

describe('should render Auditors component without crashing', () => {
  beforeEach(() => {
    render(toRenderAuditors, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
        },
      },
    })
  })
  test('should render Auditors multi-select dropdown field', () => {
    const dropdown = screen.getByRole('textbox')
    fireEvent.click(dropdown)
    fireEvent.click(screen.getByText('Admin Rbt'))
    fireEvent.click(screen.getByText('Eugene Paden'))
  })
})

const toRenderAuditees = (
  <AuditMembersDetails
    auditLabel={'Auditees :'}
    options={mockEmployeeNames}
    placeholder={[]}
    selectedValues={[]}
    handleOnSelect={jest.fn()}
    handleOnRemove={jest.fn()}
  />
)

describe('should render Auditee component without crashing', () => {
  beforeEach(() => {
    render(toRenderAuditees, {
      preloadedState: {
        allocateEmployee: {
          getAllEmployees: mockEmployeeNames,
        },
      },
    })
  })
  test('should render Auditees multi-select dropdown field', () => {
    const dropdown = screen.getByRole('textbox')
    fireEvent.click(dropdown)
    fireEvent.click(screen.getByText('Ajit Pradhan'))
    fireEvent.click(screen.getByText('Divya Tadisetti'))
  })
})

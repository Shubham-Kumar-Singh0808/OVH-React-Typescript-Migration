import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeeSkillsTable from './EmployeeSkillsTable'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { mockEmployeeSkills } from '../../../../test/data/employeeSkillsData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const userAccessToSkill = mockUserAccessToFeaturesData?.find(
  (feature) => feature.name === 'My Profile-Skills',
)
describe('Employee Skills Table Component Testing', () => {
  beforeEach(() => {
    render(
      <EmployeeSkillsTable
        striped={false}
        bordered={false}
        tableClassName={''}
        isFieldDisabled={true}
        userAccess={userAccessToSkill}
      />,
      {
        preloadedState: {
          employeeSkill: {
            skillDetails: mockEmployeeSkills,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render the "EmployeeSkills" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Category' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Skill' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Experience' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(6)
  })
  test('should render edit button in the Actions', () => {
    expect(screen.getByTestId('skill-edit-button0')).toHaveClass(
      'btn btn-info btn-ovh me-1',
    )
  })
  test('should render delete button in the Actions', () => {
    expect(screen.getByTestId('skill-delete-button0')).toHaveClass(
      'btn btn-danger btn-ovh me-1',
    )
  })
  it('should render Delete Skill modal popup on clicking delete button from Actions', async () => {
    const delSkillButtonEl = screen.getByTestId('skill-delete-button1')
    userEvent.click(delSkillButtonEl)
    await waitFor(() => {
      expect(screen.getByText('Delete Skill')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })

  it('should close modal popup after clicking Yes option from the modal', async () => {
    const delButtonElement = screen.getByTestId('skill-delete-button3')
    userEvent.click(delButtonElement)
    const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonEle)
    await waitFor(() => {
      expect(yesButtonEle).not.toBeInTheDocument()
    })
  })
})

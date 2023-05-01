import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddProjectRequestForm from './AddProjectRequestForm'
import { render, fireEvent, screen } from '../../../../test/testUtils'
import { mockProjectClient } from '../../../../test/data/projectClientData'
import {
  mockManager,
  mockPlatform,
  mockProject,
  mockDomain,
} from '../../../../test/data/projectManagerData'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('ApproveProjectForm Testing', () => {
  beforeEach(() => {
    render(
      <AddProjectRequestForm
        projectRequest={{
          bcc: '',
          billingContactPerson: '',
          billingContactPersonEmail: '',
          cc: '',
          chelist: [],
          client: '',
          description: '',
          domain: '',
          enddate: '',
          intrnalOrNot: false,
          managerId: 0,
          model: '',
          platform: '',
          projectContactEmail: '',
          projectContactPerson: '',
          projectName: '',
          projectRequestMilestoneDTO: [],
          requiredResources: '',
          startdate: '',
          status: '',
          technology: '',
          type: '',
        }}
        setProjectRequest={jest.fn()}
        checkList={[]}
        setCheckList={jest.fn()}
        projectMileStone={[]}
        setProjectMileStone={jest.fn()}
        projectManager={''}
        setProjectManager={jest.fn()}
        projectName={''}
        setProjectName={jest.fn()}
        showEditor={false}
        setShowEditor={jest.fn()}
        descriptionError={false}
        customerContactName={''}
        setCustomerContactName={jest.fn()}
        setEmailError={jest.fn()}
        setBillingContactPersonEmailError={jest.fn()}
        billingContactName={''}
        setBillingContactName={jest.fn()}
        setCheckListValid={jest.fn()}
        setDescriptionError={jest.fn()}
        setIsAddMileStoneButtonEnabled={jest.fn()}
        checkListValid={false}
        isAddMilestoneButtonEnabled={false}
        emailError={false}
        billingContactPersonEmailError={false}
      />,
      {
        preloadedState: {
          projectManagement: {
            projectClients: mockProjectClient,
            domains: mockDomain,
            managers: mockManager,
            platForms: mockPlatform,
            project: mockProject,
            isLoading: true,
          },
        },
      },
    )
  })

  test('should render input components', () => {
    const names = screen.getAllByPlaceholderText('Name')
    expect(screen.getByPlaceholderText('Client')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Name')).toBeInTheDocument()
    expect(names[0]).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(names[1]).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Manager')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Java' }).selected).toBe(false)
    expect(screen.getByRole('option', { name: 'Banking' }).selected).toBe(false)

    const dates = screen.getAllByPlaceholderText('dd/mm/yyyy')
    expect(dates[0]).toBeInTheDocument()
    expect(dates[1]).toBeInTheDocument()
  })

  test('should able to Add Project project', () => {
    // Client Organization
    const autocomplete = screen.getByPlaceholderText('Client')
    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(autocomplete, { target: { value: 'a' } })
    const dropdownOptions = screen.getAllByTestId('option')
    fireEvent.click(dropdownOptions[2])

    // Project Name
    const projectName = screen.getByPlaceholderText('Project Name')
    projectName.click()
    projectName.focus()
    userEvent.type(projectName, 'test')
    projectName.blur()

    // Customer Contact Name
    const customerContactName = screen.getAllByPlaceholderText('Name')
    customerContactName[0].click()
    customerContactName[0].focus()

    // Customer Contact Email
    const customerContactEmail = screen.getByPlaceholderText('Email')
    customerContactEmail.click()
    customerContactEmail.focus()

    // Billing Contact Person
    const billingContactPerson = screen.getAllByPlaceholderText('Name')
    billingContactPerson[1].click()
    billingContactPerson[1].focus()

    // Internal Project
    const internalProject = screen.getByRole('checkbox', {
      name: 'Internal Project',
    }) as HTMLInputElement
    userEvent.click(internalProject)
    expect(internalProject.checked).toEqual(false)

    // Project Manager
    const projectManager = screen.getByPlaceholderText('Project Manager')
    projectManager.click()
    projectManager.focus()

    // Project Platform
    const platformSelectList = screen.getByTestId('formplatform')
    userEvent.selectOptions(platformSelectList, ['Java'])

    // Project Domain
    const domainSelectList = screen.getByTestId('formdomain')
    userEvent.selectOptions(domainSelectList, ['Insurance'])

    // Start Date
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yyyy')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
})

import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditProject from './EditProject'
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '../../../../../test/testUtils'
import { mockProjectClient } from '../../../../../test/data/projectClientData'
import {
  mockDomain,
  mockManager,
  mockPlatform,
  mockProject,
} from '../../../../../test/data/projectManagerData'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const updateBtnId = 'update-project'

describe('Edit Project Testing', () => {
  beforeEach(() => {
    render(<EditProject />, {
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
    })
  })

  test('should be able to render Update button', () => {
    expect(screen.getByTestId(updateBtnId)).toBeInTheDocument()
  })

  test('should render input components', () => {
    const names = screen.getAllByPlaceholderText('Name')
    expect(screen.getByPlaceholderText('Client')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Name')).toBeInTheDocument()
    expect(names[0]).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(names[1]).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email Id')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'FixedBid' }).selected).toBe(
      false,
    )
    expect(screen.getByRole('option', { name: 'Development' }).selected).toBe(
      true,
    )
    expect(screen.getByPlaceholderText('Project Manager')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Java' }).selected).toBe(true)
    expect(screen.getByRole('option', { name: 'Banking' }).selected).toBe(true)
    expect(screen.getByRole('option', { name: 'In Progress' }).selected).toBe(
      true,
    )
    const dates = screen.getAllByPlaceholderText('dd/mm/yy')
    expect(dates[0]).toBeInTheDocument()
    expect(dates[1]).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Project Name in Hive'),
    ).toBeInTheDocument()
  })

  test('should stay enable update button when input is not empty', () => {
    expect(screen.getByTestId(updateBtnId)).not.toBeDisabled()
  })

  test('should enable disable update button if email is invalid', () => {
    const input = screen.getByPlaceholderText('Email')
    userEvent.type(input, 'ocabaaaa.a.')
    expect(screen.getByTestId(updateBtnId)).toBeDisabled()
  })

  test('should render "Edit Project" title', () => {
    expect(screen.getByText('Edit Project')).toBeInTheDocument()
  })

  test('should able to update project', () => {
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

    // Billing Contact Email
    const billingContactEmail = screen.getByPlaceholderText('Email Id')
    billingContactEmail.click()
    billingContactEmail.focus()

    // Internal Project
    const internalProject = screen.getByRole('checkbox', {
      name: 'Internal Project',
    }) as HTMLInputElement
    userEvent.click(internalProject)
    expect(internalProject.checked).toEqual(true)

    // Pricing Model
    const OSelectListSelector = screen.getByTestId('formeditPricingModel')
    userEvent.selectOptions(OSelectListSelector, ['Support'])

    // Project Type
    const oTypesSelectList = screen.getByTestId('formeditProjectType')
    userEvent.selectOptions(oTypesSelectList, ['Support'])

    // Project Manager
    const projectManager = screen.getByPlaceholderText('Project Manager')
    projectManager.click()
    projectManager.focus()

    // fireEvent.change(projectManager, { target: { value: '' } })
    const dropdownManagerOptions = screen.getAllByTestId('option')
    fireEvent.click(dropdownManagerOptions[0])

    // Project Platform
    const platformSelectList = screen.getByTestId('formplatform')
    userEvent.selectOptions(platformSelectList, ['Java'])

    // Project Domain
    const domainSelectList = screen.getByTestId('formdomain')
    userEvent.selectOptions(domainSelectList, ['Insurance'])

    // Project Status
    const statusSelectList = screen.getByTestId('formstatus')
    userEvent.selectOptions(statusSelectList, ['In Progress'])

    // Start Date
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
    // Hive
    const hiveProject = screen.getByPlaceholderText('Project Name in Hive')
    hiveProject.click()
    hiveProject.focus()
    userEvent.type(hiveProject, 'test')
    hiveProject.blur()

    expect(screen.getByTestId(updateBtnId)).not.toBeDisabled()

    const addBtn = screen.getByTestId(updateBtnId)
    userEvent.click(addBtn)
  })

  test('should be able to select T&M without crashing', () => {
    // Pricing Model
    const OSelectListSelector = screen.getByTestId('formeditPricingModel')
    userEvent.selectOptions(OSelectListSelector, ['T&M'])
  })
})

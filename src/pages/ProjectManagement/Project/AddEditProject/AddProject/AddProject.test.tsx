import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddProject from './AddProject'
import { render, screen, fireEvent } from '../../../../../test/testUtils'
import { mockProjectClient } from '../../../../../test/data/projectClientData'
import { mockReportingManager } from '../../../../../test/data/reportingManagers'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const clearBtnId = 'clear-project'
const addBtnId = 'add-project'

describe('Add Project Testing', () => {
  beforeEach(() => {
    render(<AddProject />, {
      preloadedState: {
        projectManagement: {
          projectClients: mockProjectClient,
        },
        getAllReportingManagers: {
          reportingManagers: mockReportingManager,
        },
      },
    })
  })

  test('should be able to render Add Family button', () => {
    expect(screen.getByTestId(addBtnId)).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    expect(screen.getByTestId(clearBtnId)).toBeInTheDocument()
  })

  test('should render input components', () => {
    expect(screen.getByPlaceholderText('Client')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project Name')).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: '---Pricing Model---' }).selected,
    ).toBe(true)
    expect(
      screen.getByRole('option', { name: '---Project Type---' }).selected,
    ).toBe(true)
    expect(screen.getByPlaceholderText('Project Manager')).toBeInTheDocument()

    const dates = screen.getAllByPlaceholderText('dd/mm/yyyy')
    expect(dates[0]).toBeInTheDocument()
    expect(dates[1]).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Project Name in Hive'),
    ).toBeInTheDocument()
  })

  test('should stay disable add button when input is empty', () => {
    expect(screen.getByTestId(addBtnId)).toBeDisabled()
  })

  test('should stay disable clear button when input is empty', () => {
    expect(screen.getByTestId(clearBtnId)).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    expect(screen.getByTestId(clearBtnId)).toBeDisabled()
  })

  test('should be able to click clear button when input is not empty', () => {
    const clearBtn = screen.getByTestId(clearBtnId)
    expect(clearBtn).toBeDisabled()

    const autocomplete = screen.getByPlaceholderText('Client')
    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(autocomplete, { target: { value: 'a' } })
    const dropdownOptions = screen.getAllByTestId('option')
    expect(clearBtn).toBeDisabled()
    fireEvent.click(dropdownOptions[2])

    expect(clearBtn).not.toBeDisabled()
    fireEvent.click(clearBtn)
  })

  test('should render "Add Project" title', () => {
    expect(screen.getByText('Add Project')).toBeInTheDocument()
  })

  test('should able to add project', () => {
    // Client Organization
    const clearBtn = screen.getByTestId(clearBtnId)
    expect(clearBtn).toBeDisabled()

    const autocomplete = screen.getByPlaceholderText('Client')
    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(autocomplete, { target: { value: 'a' } })
    const dropdownOptions = screen.getAllByTestId('option')
    expect(clearBtn).toBeDisabled()
    fireEvent.click(dropdownOptions[2])

    // Project Name
    const projectName = screen.getByPlaceholderText('Project Name')
    projectName.click()
    projectName.focus()
    userEvent.type(projectName, 'test')
    projectName.blur()

    // Pricing Model
    const OSelectListSelector = screen.getByTestId('formaddPricingModel')
    userEvent.selectOptions(OSelectListSelector, ['Support'])

    // Project Type
    const oTypesSelectList = screen.getByTestId('formaddProjectType')
    userEvent.selectOptions(oTypesSelectList, ['Support'])

    // Project Manager
    const projectManager = screen.getByPlaceholderText('Project Manager')
    projectManager.click()
    projectManager.focus()

    fireEvent.change(projectManager, { target: { value: 'a' } })
    const dropdownManagerOptions = screen.getAllByTestId('option')
    fireEvent.click(dropdownManagerOptions[2])

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

    expect(screen.getByTestId(addBtnId)).not.toBeDisabled()

    const addBtn = screen.getByTestId(addBtnId)
    userEvent.click(addBtn)
  })
})

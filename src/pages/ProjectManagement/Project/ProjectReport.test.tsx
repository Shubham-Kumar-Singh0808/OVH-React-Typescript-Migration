import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import ProjectReport from './ProjectReport'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const history = createMemoryHistory()

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <ProjectReport />
    </Router>
  </div>
)

describe('Project Report Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })

  test('should render "Project Report" title', () => {
    expect(screen.getByText('Project Report')).toBeInTheDocument()
  })

  test('should be able to render Add Project button', () => {
    expect(screen.getByTestId('addButton')).toBeInTheDocument()
  })

  test('should be able to render Clear Project button', () => {
    expect(screen.getByTestId('clearButton')).toBeInTheDocument()
  })

  test('should redirect to /addProject after clicking add project button', async () => {
    const addBtn = screen.getByTestId('addButton')
    userEvent.click(addBtn)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/addProject')
    })
  })

  test('should render "Select Date" selector', () => {
    expect(screen.getByText('Select:')).toBeInTheDocument()

    const dateSelector = screen.getByTestId('selectDate')
    userEvent.selectOptions(dateSelector, ['Yesterday'])

    expect(dateSelector).toHaveValue('Yesterday')
  })

  test('should render "Status Date" selector', () => {
    expect(screen.getByText('Status:')).toBeInTheDocument()

    const dateSelector = screen.getByTestId('status')
    userEvent.selectOptions(dateSelector, ['New'])

    expect(dateSelector).toHaveValue('NEW')
  })

  test('should render "Price Model" selector', () => {
    expect(screen.getByText('Pricing Model:')).toBeInTheDocument()

    const dateSelector = screen.getByTestId('priceModel')
    userEvent.selectOptions(dateSelector, ['Support'])

    expect(dateSelector).toHaveValue('SUPPORT')
  })

  test('should render "Project Health" selector', () => {
    expect(screen.getByText('Project Health:')).toBeInTheDocument()

    const dateSelector = screen.getByTestId('projectHealth')
    userEvent.selectOptions(dateSelector, ['Good'])

    expect(dateSelector).toHaveValue('Green')
  })

  test('When "Select Date" value is "Custom" should render date range', () => {
    const dateSelector = screen.getByTestId('selectDate')
    userEvent.selectOptions(dateSelector, ['Custom'])

    // Should have date range
    expect(screen.getByText('From:')).toBeInTheDocument()
    expect(screen.getByText('To:')).toBeInTheDocument()

    const dateInputFrom = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInputFrom[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )

    userEvent.type(
      dateInputFrom[1],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })

  test('should be able to Clear Project filter', () => {
    const dateSelector = screen.getByTestId('status')
    userEvent.selectOptions(dateSelector, ['New'])

    // Status filter has value
    expect(dateSelector).toHaveValue('NEW')

    const clearBtn = screen.getByTestId('clearButton')
    userEvent.click(clearBtn)

    // Should have default value of ALL
    expect(dateSelector).toHaveValue('ALL')
  })

  test('should be able to search via multi search', () => {
    const inputField = screen.getByTestId('multi-search-input')
    inputField.click()
    inputField.focus()
    userEvent.type(inputField, 'RETAINER')

    const searchBtn = screen.getByTestId('multi-search-btn')
    userEvent.click(searchBtn)
  })
})

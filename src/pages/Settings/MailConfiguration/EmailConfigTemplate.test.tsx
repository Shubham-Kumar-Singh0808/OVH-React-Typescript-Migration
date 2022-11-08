import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import EmailConfigTemplate from './EmailConfigTemplate'
import { render, screen } from '../../../test/testUtils'
import {
  mockEmailTemplate,
  mockTemplateTypes,
} from '../../../test/data/employeeMailConfigurationData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const exportBtnElement = jest.fn()

describe('Email Configuration Template Component Testing with data', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <EmailConfigTemplate />
      </Router>,
      {
        preloadedState: {
          employeeMailConfiguration: {
            employeeGetEmailTemplate: mockEmailTemplate,
            employeeGetMailTemplateTypes: mockTemplateTypes,
          },
          userAccessToFeatures: {
            isLoading: ApiLoadingState.succeeded,
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  screen.debug()
  it('should render Search button as enabled and Clear Button as disabled', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
  })

  test('should select Template Type dropdown value', () => {
    const selectTemplateType = screen.getByTestId('template-select1')
    userEvent.selectOptions(selectTemplateType, ['testing'])
    expect(selectTemplateType).toHaveValue('5')

    const SearchTemplateType = screen.getByTestId('search-test')
    userEvent.type(SearchTemplateType, 'vinesh')
    expect(SearchTemplateType).toHaveValue('vinesh')

    const searchBtnElement = screen.getByRole('button', { name: 'Search' })
    expect(searchBtnElement).toBeEnabled()
    userEvent.click(searchBtnElement)

    userEvent.click(screen.getByTestId('clearTemplate-btn'))
    userEvent.selectOptions(selectTemplateType, [''])
    userEvent.type(SearchTemplateType, '')
    expect(screen.getByTestId('search-test')).toBeEnabled()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    userEvent.click(exportBtn)
    expect(exportBtnElement).toHaveBeenCalledTimes(0)
  })
  test('should redirect to /mailTemplates when user clicks on Back Button', () => {
    const history = createMemoryHistory()
    userEvent.click(screen.getByRole('button', { name: /Add Template/i }))
    expect(history.location.pathname).toBe('/')
  })
})

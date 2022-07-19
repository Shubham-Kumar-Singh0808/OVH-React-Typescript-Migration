import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EmployeeApplyLeave from './EmployeeApplyLeave'
import { render, screen, waitFor } from '../../test/testUtils'
import { reduxServices } from '../../reducers/reduxServices'
import stateStore from '../../stateStore'
import { mockLeaveType } from '../../test/data/employeeLeaveApplyData'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
describe('Leave Apply Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(<EmployeeApplyLeave />)
    })
    test('should be able to render applyLeave without crashing', () => {
      screen.debug()
    })
    test('should render "Apply For Leave" title', () => {
      const mailTemplateTitle = screen.getByRole('heading', {
        name: 'Apply For Leave',
      })
      expect(mailTemplateTitle).toBeTruthy()
    })
  })
  test('should render Template rich text editor', () => {
    const Comments = screen.findByTestId('ckEditor-component')
    expect(Comments).toBeTruthy()
  })
  it('should render Apply button as enabled and Clear Button as disabled', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getByTestId('btn-save')).toBeDisabled()
    expect(screen.getByTestId('btn-clear')).toBeEnabled()
  })
  test('should clear dropdown and disable button after submitting ', async () => {
    render(<EmployeeApplyLeave />)
    userEvent.type(screen.getByRole('combobox'), '')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /clear/i }))
    })
  })
  test('renders the <CKEditor> component ', () => {
    render(<EmployeeApplyLeave />)
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistElement).not.toBeInTheDocument()
  })
  test('should enabled Apply button when input is not empty', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getByTestId('btn-clear')).not.toBeDisabled()
    expect(screen.getByTestId('btn-save')).toBeDisabled()
  })
  it('should display the correct number of options', () => {
    render(<EmployeeApplyLeave />)
    expect(screen.getAllByRole('option').length).toBe(1)
  })
  test('should correctly set default option', () => {
    render(<EmployeeApplyLeave />)
    expect(
      screen.getByRole('option', { name: 'Select a Leave' }).selected,
    ).toBe(true)
  })
  test('should render date picker', () => {
    const dateInput = screen.findByTestId('date-picker')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', () => {
    const dateInput = screen.getAllByPlaceholderText('Select to date')
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

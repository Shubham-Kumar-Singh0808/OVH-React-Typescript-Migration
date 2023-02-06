import React from 'react'
import '@testing-library/jest-dom'
import AddNewAudit from './AddNewAudit'
import { render, screen } from '../../test/testUtils'

const backButton = 'newAudit-back-btn'
const auditTypeInputElement = 'auditType-input'
const projectTypeDevelopment = 'projType-dev'
const projectTypeSupport = 'projType-support'
const projectNameInputElement = 'projectName-input'
const auditorsOptions = 'auditors-option'
const auditeesOptions = 'auditees-option'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<AddNewAudit />)
  })
  test('should render Add Audit Header Text', () => {
    expect(screen.getByText('Add New Audit')).toBeInTheDocument()
  })
  test('should render Save and Submit Buttons', () => {
    const saveBtnElement = screen.getByRole('button', { name: 'Save' })
    expect(saveBtnElement).toBeTruthy()
    const submitBtnElement = screen.getByRole('button', { name: 'Submit' })
    expect(submitBtnElement).toBeTruthy()
  })
  test('should render back button', () => {
    expect(screen.getByTestId(backButton)).toBeTruthy()
  })
  test('should render auditType Input', () => {
    expect(screen.getByTestId(auditTypeInputElement)).toBeTruthy()
  })
  test('should render development radio button Input', () => {
    expect(screen.getByTestId(projectTypeDevelopment)).toBeTruthy()
  })
  test('should render support radio button Input', () => {
    expect(screen.getByTestId(projectTypeSupport)).toBeTruthy()
  })
  test('should render projectName Input', () => {
    expect(screen.getByTestId(projectNameInputElement)).toBeTruthy()
  })
  test('should render auditors options', () => {
    expect(screen.getByTestId(auditorsOptions)).toBeTruthy()
  })
  test('should render auditees options', () => {
    expect(screen.getByTestId(auditeesOptions)).toBeTruthy()
  })
})

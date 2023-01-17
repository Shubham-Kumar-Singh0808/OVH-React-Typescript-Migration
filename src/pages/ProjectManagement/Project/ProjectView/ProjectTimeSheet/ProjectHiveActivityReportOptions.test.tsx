import '@testing-library/jest-dom'
import React from 'react'
import ProjectHiveActivityReportOptions from './ProjectHiveActivityReportOptions'
import { fireEvent, render, screen } from '../../../../../test/testUtils'

describe('Hive Report Options Component Testing', () => {
  test('should render hive report options component with out crashing', () => {
    render(
      <ProjectHiveActivityReportOptions
        startDate={new Date()}
        setStartDate={jest.fn()}
        viewButtonHandler={jest.fn()}
      />,
    )
    expect(
      screen.getByRole('radio', { name: 'Previous Month' }),
    ).toBeInTheDocument()
  })

  test('upon clicking different radio buttons respective button should be checked', () => {
    render(
      <ProjectHiveActivityReportOptions
        startDate={new Date()}
        setStartDate={jest.fn()}
        viewButtonHandler={jest.fn()}
      />,
    )
    const radioOne = screen.getByLabelText('Current Month') as HTMLInputElement
    const radioTwo = screen.getByLabelText('Previous Month') as HTMLInputElement
    const radioThree = screen.getByLabelText('Other') as HTMLInputElement
    expect(radioOne).toBeChecked()
    expect(radioTwo).not.toBeChecked()
    expect(radioThree).not.toBeChecked()
    fireEvent.click(radioTwo)
    expect(radioOne).not.toBeChecked()
    expect(radioTwo).toBeChecked()
    expect(radioThree).not.toBeChecked()
    fireEvent.click(radioThree)
    expect(radioOne).not.toBeChecked()
    expect(radioTwo).not.toBeChecked()
    expect(radioThree).toBeChecked()
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
  })
})

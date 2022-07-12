import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ExperienceField from '.'
import { screen, render } from '../../../../../../../test/testUtils'

describe('Add Experience Component', () => {
  beforeEach(() => {
    render(
      <ExperienceField
        onExperienceHandler={jest.fn()}
        experienceValue={0}
        dynamicFormLabelProps={jest.fn()}
      />,
    )
  })

  test('should be able to render Experience Component without crashing', () => {
    screen.debug()
  })

  test('should be able to render Experience Component Title', () => {
    expect(screen.getByText('Experience:')).toBeInTheDocument()
  })

  test('should be able to render Experience Component label', () => {
    expect(screen.getByTestId('experienceLabel')).toBeTruthy()
  })

  test('should be able to render Experience Component placeholder', () => {
    expect(screen.getByPlaceholderText('Experience')).toBeInTheDocument()
  })

  test('should be able to enter Experience Component', () => {
    const numberInput = screen.getByTestId('experienceForm')
    userEvent.type(numberInput, '1231231231')

    expect(screen.getByTestId('experienceForm')).toHaveValue('1231231231')
  })
})

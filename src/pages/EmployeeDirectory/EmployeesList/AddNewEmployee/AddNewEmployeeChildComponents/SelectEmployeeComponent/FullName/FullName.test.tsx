import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import FullNameField from '.'
import { screen, render } from '../../../../../../../test/testUtils'

describe('Add FullName Component', () => {
  describe('if isAddDisable is false', () => {
    beforeEach(() => {
      render(
        <FullNameField
          firstNameChangeHandler={jest.fn()}
          lastNameChangeHandler={jest.fn()}
          middleNameChangeHandler={jest.fn()}
          firstNameValue={''}
          lastNameValue={''}
          middleNameValue={''}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render FullName Component without crashing', () => {
      screen.debug()
    })

    test('should be able to render FullName Component Title', () => {
      expect(screen.getByText('Full Name:')).toBeInTheDocument()
    })

    test('should be able to render FullName Component label', () => {
      expect(screen.getByTestId('fullnameLabel')).toBeTruthy()
    })

    test('should be able to render FullName Component placeholder', () => {
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Middle Name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    })

    test('should be able to enter First Name', () => {
      const input = screen.getByTestId('firstname')
      userEvent.type(input, 'Gwapo')
      expect(input).toHaveValue('Gwapo')
    })

    test('should be able to enter Middle Name', () => {
      const input = screen.getByTestId('middlename')
      userEvent.type(input, 'Kaayo')
      expect(input).toHaveValue('Kaayo')
    })

    test('should be able to enter Last Name', () => {
      const input = screen.getByTestId('lastname')
      userEvent.type(input, 'Ko')
      expect(input).toHaveValue('Ko')
    })
  })
})

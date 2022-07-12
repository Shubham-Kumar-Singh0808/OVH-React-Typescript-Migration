import React from 'react'
import '@testing-library/jest-dom'
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

    // test('should be able to enter First Name', () => {
    //   const input = screen.getByTestId('firstnameForm')
    //   userEvent.type(input, 'Gwapo')
    //   expect(screen.getByTestId('firstnameForm')).toHaveValue('Gwapo')
    // })

    // test('should be able to enter Middle Name', () => {
    //   const input = screen.getByTestId('middlenameForm')
    //   userEvent.type(input, 'Kaayo')
    //   expect(screen.getByTestId('middlenameForm')).toHaveValue('Kaayo')
    // })

    // test('should be able to enter Last Name', () => {
    //   const input = screen.getByTestId('lastnameForm')
    //   userEvent.type(input, 'Ko')
    //   expect(screen.getByTestId('lastnameForm')).toHaveValue('Ko')
    // })
  })
})

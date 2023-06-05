import React from 'react'
import '@testing-library/jest-dom'
import OAutoComplete from './OAutoComplete'
import { GetAutoCompleteList } from '../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { screen, render, fireEvent } from '../../test/testUtils'

const testList: GetAutoCompleteList[] = [
  { id: 1, name: 'Test1' },
  { id: 2, name: 'Test2' },
]

describe('AutoComplete component', () => {
  describe('OAutoComplete Component with empty list', () => {
    beforeEach(() => {
      render(
        <OAutoComplete
          list={[]}
          onSelect={jest.fn()}
          shouldReset={false}
          value={''}
          isRequired={false}
          label={'Test Label'}
          placeholder={'Test Placeholder'}
          name={''}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render OAutoComplete Component Title', () => {
      expect(screen.getByText('Test Label :')).toBeInTheDocument()
    })

    test('should be able to render OAutoComplete Component placeholder', () => {
      expect(
        screen.getByPlaceholderText('Test Placeholder'),
      ).toBeInTheDocument()
    })
  })

  describe('Should be able to select OAutoComplete Component value', () => {
    beforeEach(() => {
      render(
        <OAutoComplete
          list={testList}
          onSelect={jest.fn()}
          shouldReset={false}
          value={'Test1'}
          isRequired={false}
          label={'Test Label 2'}
          placeholder={'Test Placeholder two'}
          name={'test'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, 'Test1')
      expect(input).toHaveValue('Test1')
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, 'Test1')
      expect(input).toHaveValue('Test1')
    })
  })

  describe('Should be able to reset OAutoComplete Component value', () => {
    beforeEach(() => {
      render(
        <OAutoComplete
          list={testList}
          onSelect={jest.fn()}
          shouldReset={true}
          value={''}
          isRequired={false}
          label={'Test Label 3'}
          placeholder={'Test Placeholder three'}
          name={'test'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('Should be able to perform autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Test Placeholder three')
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'e' } })
      const dropdownOptions = screen.getAllByTestId('option')
      fireEvent.click(dropdownOptions[1])

      expect(autocomplete).toHaveValue('Test2')
    })
  })
})

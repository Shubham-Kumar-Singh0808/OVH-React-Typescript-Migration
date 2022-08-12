import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import OInputField from './OInputField'
import { screen, render } from '../../test/testUtils'

const onChangeFunction = jest.fn()
const onBlurFunction = jest.fn()

describe('OInputField Component', () => {
  describe('FullName Component with empty value', () => {
    beforeEach(() => {
      render(
        <OInputField
          onChangeHandler={jest.fn()}
          onBlurHandler={jest.fn()}
          value={''}
          isRequired={false}
          label={''}
          name={''}
          placeholder={'Test PlaceHolder'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render OInputField Component placeholder', () => {
      expect(
        screen.getByPlaceholderText('Test PlaceHolder'),
      ).toBeInTheDocument()
    })
  })

  describe('OInputField Component with value of "test"', () => {
    beforeEach(() => {
      render(
        <OInputField
          onChangeHandler={jest.fn()}
          onBlurHandler={jest.fn()}
          value={'test'}
          isRequired={false}
          label={''}
          name={''}
          placeholder={'sample placeholder'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to enter First Name', () => {
      const input = screen.getByPlaceholderText('sample placeholder')
      expect(input).toHaveValue('test')
    })
  })

  describe('Should be able to perform OInputField', () => {
    const placeHolder = 'another test'
    beforeEach(() => {
      render(
        <OInputField
          onChangeHandler={onChangeFunction}
          onBlurHandler={onBlurFunction}
          value={'test'}
          isRequired={true}
          label={'test'}
          name={'test'}
          placeholder={placeHolder}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to trigger the onChange in input field', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      userEvent.type(input, 't')
      expect(onChangeFunction).toBeCalledWith('testt') // testt because we already have test in OInputField value
    })

    test('should be able to trigger the onChange in input field', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      input.click()
      input.focus()
      userEvent.type(input, 'test')
      input.blur()

      expect(onBlurFunction).toBeCalledWith('test')
    })
  })
})

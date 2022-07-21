import React from 'react'
import '@testing-library/jest-dom'
import WorkFrom from './WorkFrom'
import { screen, render, fireEvent } from '../../../../../../test/testUtils'

describe('Add WorkFrom Component', () => {
  describe('WorkFrom Component with empty value', () => {
    beforeEach(() => {
      render(
        <WorkFrom
          onWorkFromHandler={jest.fn()}
          workFromValue={''}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render WorkFrom Component Title', () => {
      expect(screen.getByText('Work From:')).toBeInTheDocument()
    })

    test('should be able to render WorkFrom Component label', () => {
      expect(screen.getByTestId('workFromLabel')).toBeTruthy()
    })

    test('should be able to render radio button Home label', () => {
      expect(screen.getByLabelText('Home')).toBeTruthy()
    })

    test('should be able to render radio button Office label', () => {
      expect(screen.getByLabelText('Office')).toBeTruthy()
    })
  })

  describe('WorkFrom Component with workFromValue value "office"', () => {
    beforeEach(() => {
      render(
        <WorkFrom
          onWorkFromHandler={jest.fn()}
          workFromValue={'office'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to check office if workFromValue is "office"', () => {
      const activeRadio = screen.getByRole('radio', {
        name: 'Office',
      }) as HTMLInputElement

      const inactiveRadio = screen.getByRole('radio', {
        name: 'Home',
      }) as HTMLInputElement

      expect(activeRadio.checked).toEqual(true)
      expect(inactiveRadio.checked).toEqual(false)
    })
  })

  describe('WorkFrom Component with empty value', () => {
    beforeEach(() => {
      render(
        <WorkFrom
          onWorkFromHandler={jest.fn()}
          workFromValue={'Home'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to check office if workFromValue is "Home"', () => {
      const inactiveRadio = screen.getByRole('radio', {
        name: 'Office',
      }) as HTMLInputElement

      const activeRadio = screen.getByRole('radio', {
        name: 'Home',
      }) as HTMLInputElement

      expect(inactiveRadio).not.toBeChecked()
      expect(activeRadio).toBeChecked()

      fireEvent.click(inactiveRadio)

      expect(inactiveRadio).toBeChecked()
    })
  })
})

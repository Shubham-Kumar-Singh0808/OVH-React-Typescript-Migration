import userEvent from '@testing-library/user-event'
import React from 'react'
import AddMileStoneForm from './AddMileStoneForm'
import { render, screen } from '../../../../../../test/testUtils'

describe('AddMileStoneForm Component Testing', () => {
  beforeEach(() => {
    render(<AddMileStoneForm />)
  })
  test('should render tracker select field', () => {
    const selectTitle = screen.getByTestId('select-title')
    userEvent.type(selectTitle, 'testing')
    expect(selectTitle).toHaveValue('testing')
  })
})

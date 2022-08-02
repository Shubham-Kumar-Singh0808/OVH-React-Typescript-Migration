import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddNewMailTemplateType from './AddNewMailTemplateType'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockMailTemplateTypes } from '../../../../test/data/addMailTemplateTypeData'

describe('Add New TemplateType component with data', () => {
  beforeEach(() => {
    render(<AddNewMailTemplateType />, {
      preloadedState: {
        addMailTemplateType: {
          mailTemplateType: mockMailTemplateTypes,
        },
      },
    })
  })

  test('should render input field and button as disabled initially', () => {
    expect(screen.getByTestId('template-input')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('should render input components', () => {
    expect(screen.getByPlaceholderText('Template Type')).toBeInTheDocument()
  })

  test('should enabled add template type button when input is not empty', () => {
    userEvent.type(screen.getByRole('textbox'), 'testing')
    expect(screen.getByRole('button')).not.toBeDisabled()
    userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByRole('textbox')).toHaveValue('')
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should clear input and disable button after submitting and new template type should be added', async () => {
    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('textbox')).toHaveValue('testing')
      expect(screen.getByRole('button')).toBeEnabled()
    })
  })
})

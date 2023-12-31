import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import MailTemplateTypeTable from './MailTemplateTypeTable'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { mockMailTemplateTypes } from '../../../../test/data/addMailTemplateTypeData'

describe('Mail Template Table Component Testing', () => {
  test('should render mailTemplate List Table component with out crashing', () => {
    render(<MailTemplateTypeTable />, {
      preloadedState: {
        addMailTemplateType: {
          mailTemplateType: mockMailTemplateTypes,
        },
      },
    })

    const deleteBtn = screen.getByTestId('btn-delete0')
    userEvent.click(deleteBtn)
    expect(screen.getByText('Delete TemplateType'))
  })
})
describe('Mail Template component with data', () => {
  beforeEach(() => {
    render(<MailTemplateTypeTable />, {
      preloadedState: {
        addMailTemplateType: {
          mailTemplateType: mockMailTemplateTypes,
        },
      },
    })
  })
  it('should render Delete modal on clicking delete button from Actions', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete1')
    userEvent.click(deleteButtonElement)
    await waitFor(() => {
      expect(screen.getByText('Delete TemplateType')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  jest.retryTimes(3)
  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete0')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'No' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
  test('should edit and save employee template details upon edit and save button click respectively', async () => {
    const editButtonElement = screen.getByTestId(`sh-edit-btn1`)
    await fireEvent.click(editButtonElement)
    userEvent.type(screen.getByTestId(`template-input`), 'testing')
    const saveButtonElement = screen.getByTestId(`sh-save-btn1`)
    await fireEvent.click(saveButtonElement)
    await waitFor(() => {
      expect(screen.getByTestId(`template-input`)).toHaveValue('testtesting')
    })
  })
  test('should validate input data after edit button click', async () => {
    const editButtonElement = screen.getByTestId(`sh-edit-btn1`)
    await fireEvent.click(editButtonElement)
    await waitFor(async () => {
      userEvent.type(screen.getByTestId(`template-input`), 'testing2')
      const saveButtonElement = screen.getByTestId(`sh-save-btn1`)
      await fireEvent.click(saveButtonElement)

      expect(screen.getByTestId(`template-input`)).toHaveValue(
        'test2testing2testing2',
      )
    })
  })
})

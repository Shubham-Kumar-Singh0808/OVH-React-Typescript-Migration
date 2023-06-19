import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MailTemplateTypeList from './MailTemplateTypeList'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockMailTemplateTypes } from '../../../../test/data/addMailTemplateTypeData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <MailTemplateTypeList
      headerTitle={''}
      confirmButtonText={''}
      backButtonHandler={jest.fn()}
    />
  </div>
)

describe('Mail Template component with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        addMailTemplateType: {
          mailTemplateType: mockMailTemplateTypes,
        },
      },
    })
  })
  test('should not render the loading spinner when MailTemplate Type is not empty', () => {
    expect(screen.findByTestId('MailTemplate-loading-spinner')).toMatchObject(
      {},
    )
  })
  test('should render delete button', () => {
    expect(screen.getByTestId('btn-delete2')).toHaveClass(
      'btn btn-danger btn-sm',
    )
  })

  test('should render correct number of page records', async () => {
    await waitFor(() => {
      //22 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })

  test('should render correct number of page records base from data', () => {
    userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
    const pageSizeSelect = screen.getByRole('option', {
      name: '40',
    }) as HTMLOptionElement
    expect(pageSizeSelect.selected).toBe(true)

    // 42 including the heading
    expect(screen.getAllByRole('row')).toHaveLength(
      mockMailTemplateTypes.length + 1,
    )
  })

  test('should render first page data only', () => {
    expect(screen.getByRole('rowheader', { name: '20' })).toBeInTheDocument()
    expect(screen.queryByRole('rowheader', { name: '21' })).toBeNull()
  })

  test('should disable first and prev in pagination if first page', () => {
    expect(screen.getByText('« First')).toHaveAttribute('disabled')
    expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
    expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
    expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
  })

  test('should disable last and next in pagination if last page', () => {
    userEvent.click(screen.getByText('Next ›', { exact: true }))

    expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
    expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    expect(screen.getByText('Next ›')).toHaveAttribute('disabled')
    expect(screen.getByText('Last »')).toHaveAttribute('disabled')
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

  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete0')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectNotes from './ProjectNotes'
import { render, screen, waitFor } from '../../../../../test/testUtils'
import { mockProjectNotes } from '../../../../../test/data/projectNotesData'

describe('ProjectNotes Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(<ProjectNotes />, {
      preloadedState: {
        projectNotes: {
          projectNotesTimeLine: mockProjectNotes,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const notesLink = screen.getByTestId('selectSubject')
    userEvent.type(notesLink, 'testing')
    expect(notesLink).toHaveValue('testing')

    const postBtnElement = screen.getByRole('button', { name: 'Post' })
    expect(postBtnElement).toBeEnabled()
    userEvent.click(postBtnElement)
  })

  test('should upload file image', async () => {
    const fileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
      type: 'image/png',
    })
    const uploader = screen.getByTestId('file-upload') as HTMLInputElement

    await waitFor(() => {
      userEvent.upload(uploader, fileToUpload)
    })

    expect(uploader).toBeTruthy()
  })
  test('should be able to click post button element', () => {
    const toggleBtn = screen.getByRole('button', { name: 'Post' })
    userEvent.click(toggleBtn)
    expect(toggleBtn).toBeInTheDocument()
  })
})

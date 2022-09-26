import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import UploadFeedbackForm from './UploadFeedbackForm'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockFeedbackFormList } from '../../../../test/data/feedbackFormListData'

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <UploadFeedbackForm />,
    </Router>
  </div>
)
describe('EventList Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        eventList: {
          isLoading: ApiLoadingState.succeeded,
          feedbackFormDetails: mockFeedbackFormList.list,
          feedbackFormListSize: mockFeedbackFormList.size,
        },
        authentication: {
          authenticatedUser: {
            employeeName: 'admin',
            employeeId: '1982',
            userName: 'admin',
            role: 'admin',
            tenantKey: 'abc',
            token: 'test',
            designation: 'developer',
          },
        },
      },
    })
  })
  screen.debug()
  test('should render Feedback Forms Component without crashing..', () => {
    expect(screen.getByText('Upload Feedback form:')).toBeInTheDocument()
  })
  test('should render upload button as disabled initially', () => {
    expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled()
  })
  test('Clicking on the upload button calls the `handleFileUpload` function', () => {
    const fakeFile = new File(['hello'], 'hello.doc', { type: 'pdf/doc' })
    fireEvent.change(screen.getByTestId('feedback-form'), {
      target: { files: [fakeFile] },
    })
  })
  test('Should be able to upload feedback form', () => {
    const file = new File(['feedbackForm'], 'feedbackForm.docx', {
      type: 'doc/docx/pdf',
    })
    const fileInput = screen.getByTestId('feedback-form')
    userEvent.upload(fileInput, file)

    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files.item(0)).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
    expect(fileInput).toBeInTheDocument()
  })
  test('should redirect to EventList page upon clicking Back button from FeedbackForms Page', () => {
    const backButtonEl = screen.getByTestId('back-btn')
    userEvent.click(backButtonEl)
    expect(history.location.pathname).toBe('/eventList')
  })
})

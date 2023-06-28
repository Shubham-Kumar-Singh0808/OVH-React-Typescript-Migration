import React from 'react'
import userEvent from '@testing-library/user-event'
import InitialManagerButtons from './InitialManagerButtons'
import { act, cleanup, render, screen } from '../../../../../../test/testUtils'
import { ProjectTailoringStatusEnum } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { mockSQAProjectTailoringDocument } from '../../../../../../test/data/projectTailoringData'

const mockSubmitDocumentHandler = jest.fn()
const mockGetLatestData = jest.fn()
const toRender = (
  <InitialManagerButtons
    submitDocumentHandler={mockSubmitDocumentHandler}
    getLatestData={mockGetLatestData}
  />
)

describe('Initial Manager Button - Project Tailoring', () => {
  describe('saved document - manager side rendering', () => {
    //saving document that was already saved
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            isManagerSubmitButtonEnabled: true,
            tailorStatus: ProjectTailoringStatusEnum.saveForManager,
            projectTailoringDocument: mockSQAProjectTailoringDocument,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('save functionality', () => {
      const saveButtonManager = screen.getByTestId('saveBtn-manager')
      expect(saveButtonManager).toBeEnabled()

      act(() => {
        userEvent.click(saveButtonManager)
      })
    })

    test('submit button functionality', () => {
      const submitButtonManager = screen.getByTestId('submitBtn-manager')
      expect(submitButtonManager).toBeEnabled()

      act(() => {
        userEvent.click(submitButtonManager)
      })
    })
  })

  describe('initial document save functionality - manager side rendering', () => {
    //saving document that was never saved
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            isManagerSubmitButtonEnabled: true,
            tailorStatus: ProjectTailoringStatusEnum.initial,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('save functionality', () => {
      const saveBtn = screen.getByTestId('saveBtn-manager')
      expect(saveBtn).toBeEnabled()

      act(() => {
        userEvent.click(saveBtn)
      })
    })
  })
})

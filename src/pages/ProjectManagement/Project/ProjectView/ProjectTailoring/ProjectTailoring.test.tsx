import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectTailoring from './ProjectTailoring'
import { act, cleanup, render, screen } from '../../../../../test/testUtils'
import {
  ProjectTailoringStatusEnum,
  TailoringRequiredSelectOptions,
  TailoringSQAApprovedSelectOptions,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import {
  mockInitialManagerProjectTailoringDocument,
  mockSQAProjectTailoringDocument,
  mockUserAccessToFeaturesManagerProjectTailoring,
  mockUserAccessToFeaturesSQAProjectTailoring,
} from '../../../../../test/data/projectTailoringData'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectTailoring />
  </div>
)

const testJustification = 'This is test justification.This is test justificat' //50 characters
const charErrorDescId = 'tailor-charLengthError'

const approveBtnSQAId = 'approveBtn-SQA'
const rejectBtnSQAId = 'rejectBtn-SQA'
const char50Text = 'Please write 50 characters'

describe('Project Tailoring', () => {
  describe('initial manager side functionality', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            defaultProjectTailoringDocument:
              mockInitialManagerProjectTailoringDocument,
            projectTailoringDocument: '',
            tailorStatus: ProjectTailoringStatusEnum.initial,
            isManagerSubmitButtonEnabled: true,
            isSQAApproveButtonEnabled: true,
            isSQARejectedButtonEnabled: true,
          },
          userAccessToFeatures: {
            userAccessToFeatures:
              mockUserAccessToFeaturesManagerProjectTailoring,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('submit functionality', () => {
      const chosenProcess = mockInitialManagerProjectTailoringDocument[1]
      const submitButton = screen.getByTestId('submitBtn-manager')
      //initially
      expect(screen.getByTestId('saveBtn-manager')).toBeEnabled()
      expect(submitButton).toBeEnabled()

      // opening the subProcesses table
      const plusButtonOfProcess = screen.getByTestId(
        `plus-btn-${chosenProcess.processHeadId}`,
      )
      act(() => {
        userEvent.click(plusButtonOfProcess)
      })

      // testing for justification on yes along with submit button
      const chosenSubProcess1 = chosenProcess.processSubHeadsDto[2]
      const chosenSubProcess2 = chosenProcess.processSubHeadsDto[3]

      // first subProcess select
      const subProcessSelect = screen.getByTestId(
        //first subprocess select
        `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess1.processSubHeadId}`,
      )
      const subProcessJustification = screen.getByTestId(
        // first subprocess justification
        `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess1.processSubHeadId}`,
      )
      expect(subProcessSelect).toHaveValue(chosenSubProcess1.specificToProject)

      act(() => {
        userEvent.selectOptions(subProcessSelect, [
          TailoringRequiredSelectOptions.Yes.toString(),
        ])
      })
      expect(subProcessSelect).toHaveValue(
        TailoringRequiredSelectOptions.Yes.toString(),
      )
      expect(screen.queryByTestId(charErrorDescId)).toHaveTextContent(
        char50Text,
      )
      expect(submitButton).toBeDisabled()
      act(() => {
        userEvent.type(subProcessJustification, testJustification)
      })
      expect(subProcessJustification).toHaveValue(testJustification)
      expect(submitButton).toBeEnabled()

      //2nd subprocess select
      const subProcessSelect2 = screen.getByTestId(
        `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess2.processSubHeadId}`,
      )
      const subProcessJustification2 = screen.getByTestId(
        `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess2.processSubHeadId}`,
      )
      act(() => {
        userEvent.selectOptions(subProcessSelect2, [
          TailoringRequiredSelectOptions.WaivedOff,
        ])
      })
      expect(screen.queryByTestId(charErrorDescId)).toHaveTextContent(
        char50Text,
      )
      expect(submitButton).toBeDisabled()
      act(() => {
        userEvent.type(subProcessJustification2, testJustification)
      })
      expect(subProcessJustification2).toHaveValue(testJustification)
      expect(submitButton).toBeEnabled() //the button is enabled after the characters are done

      act(() => {
        userEvent.click(submitButton)
      })
    })
  })

  describe('sqa side functionality', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            error: null,
            isLoading: ApiLoadingState.succeeded,
            defaultProjectTailoringDocument:
              mockInitialManagerProjectTailoringDocument,
            projectTailoringDocument: mockSQAProjectTailoringDocument,
            tailorStatus: ProjectTailoringStatusEnum.submitted,
            isManagerSubmitButtonEnabled: true,
            isSQAApproveButtonEnabled: true,
            isSQARejectedButtonEnabled: true,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('reject sqa functionality', () => {
      const approveBtn = screen.getByTestId(approveBtnSQAId)
      const rejectBtn = screen.getByTestId(rejectBtnSQAId)

      //initial
      expect(approveBtn).toBeEnabled()
      expect(rejectBtn).toBeEnabled()

      const chosenProcess = mockSQAProjectTailoringDocument.processHeaddto[1]
      const chosenSubProcess = chosenProcess.processSubHeadsDto[4]

      act(() => {
        userEvent.click(
          screen.getByTestId(`plus-btn-${chosenProcess.processHeadId}`),
        )
      })

      const subProcessSQASelect = screen.getByTestId(
        `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
      )
      expect(subProcessSQASelect).toHaveValue(
        chosenSubProcess.sqaApproval
          ? chosenSubProcess.sqaApproval
          : TailoringSQAApprovedSelectOptions.Approved,
      )
      act(() => {
        userEvent.selectOptions(subProcessSQASelect, [
          TailoringSQAApprovedSelectOptions.Rejected.toString(),
        ])
      })
      expect(subProcessSQASelect).toHaveValue(
        TailoringSQAApprovedSelectOptions.Rejected.toString(),
      )
      expect(approveBtn).toBeDisabled() // even if one is rejected, the document cannot be approved
      expect(rejectBtn).toBeDisabled() // as justification is not filled, the reject button is disabled
      expect(screen.getByTestId(charErrorDescId)).toHaveTextContent(
        'Please write 10 characters',
      )
      const subProcessSQAJustification = screen.getByTestId(
        `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
      )
      act(() => {
        userEvent.type(subProcessSQAJustification, 'Testing the SQA')
      })
      expect(rejectBtn).toBeEnabled()
      expect(approveBtn).toBeDisabled()

      act(() => {
        userEvent.click(rejectBtn)
      })
      // now modal opens
      const rejectCommentsTextarea = screen.getByTestId(
        'rejectComments-textArea',
      )
      act(() => {
        userEvent.type(rejectCommentsTextarea, 'checking')
      })
      act(() => {
        userEvent.click(screen.getByTestId('modalConfirmBtn'))
      })
    })

    test('approve sqa functionality', () => {
      const approveBtn = screen.getByTestId(approveBtnSQAId)
      const rejectBtn = screen.getByTestId(rejectBtnSQAId)

      expect(approveBtn).toBeEnabled()
      expect(rejectBtn).toBeEnabled()
      act(() => {
        userEvent.click(rejectBtn)
      })
    })
  })

  describe('update manager functionality', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            error: null,
            isLoading: ApiLoadingState.succeeded,
            defaultProjectTailoringDocument:
              mockInitialManagerProjectTailoringDocument,
            projectTailoringDocument: {
              ...mockSQAProjectTailoringDocument,
              tailoringStatus: 'Approved',
            },
            tailorStatus: ProjectTailoringStatusEnum.approved,
            isManagerSubmitButtonEnabled: true,
            isSQAApproveButtonEnabled: true,
            isSQARejectedButtonEnabled: true,
          },
          userAccessToFeatures: {
            userAccessToFeatures:
              mockUserAccessToFeaturesManagerProjectTailoring,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('update manager functionality', () => {
      const updateButton = screen.getByTestId('tailorManager-UpdateBtn')

      expect(updateButton).toBeEnabled()

      const chosenProcess = mockSQAProjectTailoringDocument.processHeaddto[1]
      const chosenSubProcess = chosenProcess.processSubHeadsDto[3]
      const processPlusBtn = screen.getByTestId(
        `plus-btn-${chosenProcess.processHeadId}`,
      )
      act(() => {
        userEvent.click(processPlusBtn)
      })

      // subProcess select
      const subProcessSelect = screen.getByTestId(
        // subprocess select
        `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
      )
      const subProcessJustification = screen.getByTestId(
        // subprocess justification
        `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
      )
      expect(subProcessSelect).toHaveValue(chosenSubProcess.specificToProject)

      act(() => {
        userEvent.selectOptions(subProcessSelect, [
          TailoringRequiredSelectOptions.WaivedOff.toString(),
        ])
      })
      expect(subProcessSelect).toHaveValue(
        TailoringRequiredSelectOptions.WaivedOff.toString(),
      )
      expect(screen.queryByTestId(charErrorDescId)).toHaveTextContent(
        char50Text,
      )
      expect(updateButton).toBeDisabled()
      act(() => {
        userEvent.type(subProcessJustification, testJustification)
      })
      expect(subProcessJustification).toHaveValue(testJustification)
      expect(updateButton).toBeEnabled()

      act(() => {
        userEvent.click(updateButton)
      })
    })
  })
})

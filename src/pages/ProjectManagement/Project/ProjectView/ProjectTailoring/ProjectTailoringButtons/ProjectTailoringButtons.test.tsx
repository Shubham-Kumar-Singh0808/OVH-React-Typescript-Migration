import React from 'react'
import ProjectTailoringButtons from './ProjectTailoringButtons'
import {
  mockUserAccessToFeaturesManagerProjectTailoring,
  mockUserAccessToFeaturesSQAProjectTailoring,
} from '../../../../../../test/data/projectTailoringData'
import { cleanup, render, screen } from '../../../../../../test/testUtils'
import { ProjectTailoringStatusEnum } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const toRender = <ProjectTailoringButtons />

const saveBtnManagerId = 'saveBtn-manager'
const submitBtnManagerId = 'submitBtn-manager'
const approveBtnSQAId = 'approveBtn-SQA'
const rejectBtnSQAId = 'rejectBtn-SQA'

describe('Project tailoring buttons', () => {
  describe('initial manager buttons', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.initial,
            isManagerSubmitButtonEnabled: true,
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

    test('save and submit button is rendered', () => {
      expect(screen.getByTestId(saveBtnManagerId)).toBeEnabled()
      expect(screen.getByTestId(submitBtnManagerId)).toBeEnabled()
      expect(screen.queryByTestId(approveBtnSQAId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(rejectBtnSQAId)).not.toBeInTheDocument()
    })
  })

  describe('save manager buttons', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.saveForManager,
            isManagerSubmitButtonEnabled: true,
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

    test('save and submit button is rendered', () => {
      expect(screen.getByTestId(saveBtnManagerId)).toBeEnabled()
      expect(screen.getByTestId(submitBtnManagerId)).toBeEnabled()
      expect(screen.queryByTestId(rejectBtnSQAId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(approveBtnSQAId)).not.toBeInTheDocument()
    })
  })

  describe('submit manager buttons', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
            isManagerSubmitButtonEnabled: true,
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

    test('save and submit button is not rendered', () => {
      expect(screen.queryByTestId(saveBtnManagerId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(submitBtnManagerId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(approveBtnSQAId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(rejectBtnSQAId)).not.toBeInTheDocument()
    })
  })

  describe('approve/reject sqa buttons', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
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

    test('approve and reject button is rendered', () => {
      expect(screen.getByTestId(approveBtnSQAId)).toBeEnabled()
      expect(screen.getByTestId(rejectBtnSQAId)).toBeEnabled()
      expect(screen.queryByTestId(saveBtnManagerId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(submitBtnManagerId)).not.toBeInTheDocument()
    })
  })

  describe('approve/reject sqa buttons not visible', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.approved,
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

    test('approve and reject button is not rendered', () => {
      expect(screen.queryByTestId(approveBtnSQAId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(rejectBtnSQAId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(saveBtnManagerId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(submitBtnManagerId)).not.toBeInTheDocument()
    })
  })
})

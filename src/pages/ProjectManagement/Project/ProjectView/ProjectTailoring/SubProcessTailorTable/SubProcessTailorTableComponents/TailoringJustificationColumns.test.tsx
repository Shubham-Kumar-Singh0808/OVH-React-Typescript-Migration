import React from 'react'
import TailoringJustificationColumns from './TailoringJustificationColumn'
import { cleanup, render, screen } from '../../../../../../../test/testUtils'
import { ProjectTailoringStatusEnum } from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import {
  mockUserAccessToFeaturesManagerProjectTailoring,
  mockUserAccessToFeaturesSQAProjectTailoring,
} from '../../../../../../../test/data/projectTailoringData'

const toRender = <TailoringJustificationColumns />

const tailoringNeededText = 'Tailoring Needed(Y/N)'

describe('Tailoring Justification Columns', () => {
  describe('initial manager render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.initial,
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

    test('columns are present', () => {
      expect(
        screen.getByRole('columnheader', { name: tailoringNeededText }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', {
          name: 'Justification',
        }),
      ).toBeTruthy()
    })
  })

  describe('initial sqa render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.initial,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('columns are not present', () => {
      expect(
        screen.queryByRole('columnheader', { name: tailoringNeededText }),
      ).not.toBeTruthy()
      expect(
        screen.queryByRole('columnheader', {
          name: 'Justification',
        }),
      ).not.toBeTruthy()
    })
  })

  describe('submitted sqa render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('columns are present', () => {
      expect(
        screen.getByRole('columnheader', {
          name: 'Justification',
        }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: tailoringNeededText }),
      ).toBeTruthy()
    })
  })
})

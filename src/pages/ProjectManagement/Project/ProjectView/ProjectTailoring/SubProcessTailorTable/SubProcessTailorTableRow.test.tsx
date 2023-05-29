import React from 'react'
import SubProcessTailorTableRow from './SubProcessTailorTableRow'
import {
  mockSQAProjectTailoringDocument,
  mockUserAccessToFeaturesManagerProjectTailoring,
  mockUserAccessToFeaturesSQAProjectTailoring,
} from '../../../../../../test/data/projectTailoringData'
import { render, screen, cleanup } from '../../../../../../test/testUtils'
import { ProjectTailoringStatusEnum } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { processedString } from '../ProjectTailoringHelpers'

const chosenProcess = mockSQAProjectTailoringDocument.processHeaddto[1]
const chosenSubProcess = chosenProcess.processSubHeadsDto[1]
const mockSubProcessIndex = 1
const toRender = (
  <SubProcessTailorTableRow
    subProcess={chosenSubProcess}
    subProcessIndex={mockSubProcessIndex}
    processHeadId={chosenProcess.processHeadId}
  />
)

describe('Sub Process Tailor Table Row', () => {
  describe('initial manager render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userAccessToFeatures: {
            userAccessToFeatures:
              mockUserAccessToFeaturesManagerProjectTailoring,
          },
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.initial,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('required data in row is rendered - initial manager', () => {
      expect(screen.getByText(mockSubProcessIndex + 1)).toBeInTheDocument() // index
      expect(
        screen.getByText(chosenSubProcess.processSubHeadName),
      ).toBeInTheDocument() //subProcess name
      expect(
        screen.getByText(chosenSubProcess.documentName),
      ).toBeInTheDocument() //document name
      expect(screen.getByText(chosenSubProcess.responsible)).toBeInTheDocument() //responsible
      expect(
        screen.getByTestId(
          `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() // tailor select
      expect(
        screen.getByTestId(
          `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() //justification for manager

      expect(
        screen.queryByTestId(
          `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa select must not be there
      expect(
        screen.queryByTestId(
          `sqaAppText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa readonly must not be there
      expect(
        screen.queryByTestId(
          `sqaJustText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa justification must not be there
    })
  })

  describe('submitted manager render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userAccessToFeatures: {
            userAccessToFeatures:
              mockUserAccessToFeaturesManagerProjectTailoring,
          },
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('required data in row is rendered- manager submit', () => {
      expect(screen.getByText(mockSubProcessIndex + 1)).toBeInTheDocument() // index
      expect(
        screen.getByText(chosenSubProcess.processSubHeadName),
      ).toBeInTheDocument() //subProcess name
      expect(
        screen.getByText(chosenSubProcess.documentName),
      ).toBeInTheDocument() //document name
      expect(screen.getByText(chosenSubProcess.responsible)).toBeInTheDocument() //responsible
      expect(
        screen.getByText(chosenSubProcess.specificToProject),
      ).toBeInTheDocument() // readonly text for tailor select is there
      expect(
        screen.getByText(processedString(chosenSubProcess.comments)),
      ).toBeInTheDocument() // readonly text for manager description is there

      expect(
        screen.queryByTestId(
          `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // tailor select must not be there
      expect(
        screen.queryByTestId(
          `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() //justification for manager must not be there
      expect(
        screen.queryByTestId(
          `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa select must not be there
      expect(
        screen.queryByTestId(
          `sqaAppText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa readonly must not be there
      expect(
        screen.queryByTestId(
          `sqaJustText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa justification must not be there
    })
  })

  describe('submitted sqa render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('required data in row is rendered - sqa submit', () => {
      expect(screen.getByText(mockSubProcessIndex + 1)).toBeInTheDocument() // index
      expect(
        screen.getByText(chosenSubProcess.processSubHeadName),
      ).toBeInTheDocument() //subProcess name
      expect(
        screen.getByText(chosenSubProcess.documentName),
      ).toBeInTheDocument() //document name
      expect(screen.getByText(chosenSubProcess.responsible)).toBeInTheDocument() //responsible
      expect(
        screen.getByText(chosenSubProcess.specificToProject),
      ).toBeInTheDocument() // readonly text for tailor select is there
      expect(
        screen.getByText(processedString(chosenSubProcess.comments)),
      ).toBeInTheDocument() // readonly text for manager description is there

      expect(
        screen.getByTestId(
          `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() // sqa select must be there
      expect(
        screen.getByTestId(
          `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() //justification for sqa

      expect(
        screen.queryByTestId(
          `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // tailor select must not be there
      expect(
        screen.queryByTestId(
          `sqaAppText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa readonly must not be there
      expect(
        screen.queryByTestId(
          `sqaJustText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa justification must not be there
    })
  })

  describe('approved sqa render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.approved,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('required data in row is rendered - sqa approve', () => {
      expect(screen.getByText(mockSubProcessIndex + 1)).toBeInTheDocument() // index
      expect(
        screen.getByText(chosenSubProcess.processSubHeadName),
      ).toBeInTheDocument() //subProcess name
      expect(
        screen.getByText(chosenSubProcess.documentName),
      ).toBeInTheDocument() //document name
      expect(screen.getByText(chosenSubProcess.responsible)).toBeInTheDocument() //responsible
      expect(
        screen.getByText(chosenSubProcess.specificToProject),
      ).toBeInTheDocument() // readonly text for tailor select is there
      expect(
        screen.getAllByText(processedString(chosenSubProcess.comments))[0], // sqa is also N/A. but this is manager comments
      ).toBeInTheDocument() // readonly text for manager description is there

      expect(
        screen.queryByTestId(
          `sqaAppText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() // sqa readonly must be there
      expect(
        screen.queryByTestId(
          `sqaJustText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).toBeInTheDocument() // sqa justification must be there

      expect(
        screen.queryByTestId(
          `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa select must not be there
      expect(
        screen.queryByTestId(
          `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() //justification for sqa not be there

      expect(
        screen.queryByTestId(
          `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // tailor select must not be there
    })
  })

  describe('initial sqa render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesSQAProjectTailoring,
          },
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.initial,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('required data in row is rendered - sqa initial', () => {
      expect(screen.getByText(mockSubProcessIndex + 1)).toBeInTheDocument() // index
      expect(
        screen.getByText(chosenSubProcess.processSubHeadName),
      ).toBeInTheDocument() //subProcess name
      expect(
        screen.getByText(chosenSubProcess.documentName),
      ).toBeInTheDocument() //document name
      expect(screen.getByText(chosenSubProcess.responsible)).toBeInTheDocument() //responsible
      expect(
        screen.queryByText(chosenSubProcess.specificToProject),
      ).not.toBeInTheDocument() // readonly text for tailor select is not there
      expect(
        screen.queryByTestId(
          `sqaAppText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa readonly must not be there
      expect(
        screen.queryByTestId(
          `sqaJustText-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa justification must not be there

      expect(
        screen.queryByTestId(
          `tailorSQASelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // sqa select must not be there
      expect(
        screen.queryByTestId(
          `tailorDescription-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() //justification for sqa not be there

      expect(
        screen.queryByTestId(
          `tailorSelect-${chosenProcess.processHeadId}-${chosenSubProcess.processSubHeadId}`,
        ),
      ).not.toBeInTheDocument() // tailor select must not be there
    })
  })
})

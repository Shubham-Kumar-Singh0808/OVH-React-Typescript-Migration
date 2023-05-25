import React from 'react'
import SubProcessTailorTable from './SubProcessTailorTable'
import { mockInitialManagerProcessHeadDTOList } from '../../../../../../test/data/projectTailoringData'
import { cleanup, render, screen } from '../../../../../../test/testUtils'
import { ProjectTailoringStatusEnum } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const mockSubProcesses =
  mockInitialManagerProcessHeadDTOList[2].processSubHeadsDto
const mockProcessHeadId = mockInitialManagerProcessHeadDTOList[2].processHeadId

const toInitialRender = (
  <SubProcessTailorTable
    subProcesses={mockSubProcesses}
    processHeadId={mockProcessHeadId}
  />
)

describe('SubProcess Tailor Table - Project Tailoring', () => {
  //testing the sqa screen now
  describe('initial sqa render', () => {
    beforeEach(() => {
      render(toInitialRender, {
        preloadedState: {
          projectTailoring: {
            tailorStatus: ProjectTailoringStatusEnum.submitted,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('columns names are rendered', () => {
      // the table columns visible to manager and sqa
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Process Area' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Document Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Responsible' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Tailoring Needed(Y/N)' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', {
          name: 'Justification',
        }),
      ).toBeTruthy()

      // this is visible to sqa and managers (after submission only)
      expect(
        screen.getByRole('columnheader', { name: 'SQA Approved' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'SQA Review' }),
      ).toBeTruthy()
    })

    test('correct number of subprocesses are rendered correctly', () => {
      expect(
        screen.getAllByTestId(`subProcesses-${mockProcessHeadId}`),
      ).toHaveLength(mockSubProcesses.length)
    })
  })
})

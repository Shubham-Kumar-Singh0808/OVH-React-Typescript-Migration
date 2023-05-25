import React from 'react'
import ProcessTailorTable from './ProcessTailorTable'
import ProcessTailorTableRow from './ProcessTailorTableRow'
import { mockInitialManagerProcessHeadDTOList } from '../../../../../../test/data/projectTailoringData'
import {
  initialShowHideSubProcesses,
  processedString,
} from '../ProjectTailoringHelpers'
import { cleanup, render, screen } from '../../../../../../test/testUtils'

const chosenMockProcess = mockInitialManagerProcessHeadDTOList[0]
const mockShowSubProcessButtonHandler = jest.fn()
const mockHideSubProcessButtonHandler = jest.fn()

const toInitialRender = (
  <ProcessTailorTableRow
    thisProcess={chosenMockProcess}
    thisProcessIndex={0}
    currentOpenedSubProcess={initialShowHideSubProcesses}
    showSubProcessButtonHandler={mockShowSubProcessButtonHandler}
    hideSubProcessButtonHandler={mockHideSubProcessButtonHandler}
  />
)

describe('Process Tailor Tailor Row - Project Tailoring', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toInitialRender)
    })
    afterEach(cleanup)
    screen.debug()

    test('data is rendered correctly', () => {
      // the plus button is rendered. The subprocesses of this process are not rendered on screen
      expect(
        screen.getByTestId(`plus-btn-${chosenMockProcess.processHeadId}`),
      ).toBeVisible()

      expect(
        screen.getByTestId(
          `processHeadName-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveTextContent(chosenMockProcess.processHeadname)
      expect(
        screen.getByTestId(
          `processSubHeadCount-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveTextContent(chosenMockProcess.processSubHeadCount)
      expect(
        screen.getByTestId(
          `processDocCount-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveTextContent(chosenMockProcess.documentCount)
      expect(
        screen.getByTestId(
          `processTailoredCount-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveTextContent(processedString(chosenMockProcess.tailoredCount))
      expect(
        screen.getByTestId(
          `processWaivedCount-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveTextContent(processedString(chosenMockProcess.waivedCount))
    })

    test('no subProcesses of the chosenMockProcess is rendered', () => {
      //they are not rendered as processHeadId of this is not in currentOpenedSubProcess
      expect(
        screen.queryAllByTestId(
          `allSubProcesses-${chosenMockProcess.processHeadId}`,
        ),
      ).toHaveLength(0)
    })
  })
})

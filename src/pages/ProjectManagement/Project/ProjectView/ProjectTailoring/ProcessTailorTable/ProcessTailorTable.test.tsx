import React from 'react'
import userEvent from '@testing-library/user-event'
import ProcessTailorTable from './ProcessTailorTable'
import { mockInitialManagerProcessHeadDTOList } from '../../../../../../test/data/projectTailoringData'
import { act, cleanup, render, screen } from '../../../../../../test/testUtils'

const toRender = (
  <ProcessTailorTable displayedData={mockInitialManagerProcessHeadDTOList} />
)

describe('Project Tailoring Table - Project Tailoring', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    screen.debug()

    test('correct number of columns and column names are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Category' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Process Areas' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Documents' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'No. of Documents Tailored' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', {
          name: 'No. of Documents Waived off',
        }),
      ).toBeTruthy()
    })

    test('correct number of rows of process are rendered', () => {
      expect(screen.getAllByTestId('processHeadRow')).toHaveLength(
        mockInitialManagerProcessHeadDTOList.length,
      )
    })

    test('subProcesses of one of the processes is rendered correctly', () => {
      const chosenProcess = mockInitialManagerProcessHeadDTOList[1]
      const plusButtonTestId = `plus-btn-${chosenProcess.processHeadId}`
      const minusButtonTestId = `minus-btn-${chosenProcess.processHeadId}`
      //plus button is present initially
      const plusButton = screen.getByTestId(plusButtonTestId)
      //minus button is not initially present
      expect(screen.queryByTestId(minusButtonTestId)).not.toBeInTheDocument()
      act(() => {
        userEvent.click(plusButton)
      })
      // the plus button is not in the document upon clicking it. Replaced by minus button
      expect(screen.queryByTestId(plusButtonTestId)).not.toBeInTheDocument()
      expect(screen.queryByTestId(minusButtonTestId)).toBeInTheDocument()

      // now closing the subprocesses again
      act(() => {
        userEvent.click(screen.getByTestId(minusButtonTestId))
      })
      // minus button disappears
      expect(screen.queryByTestId(minusButtonTestId)).not.toBeInTheDocument()
      //plus button appears
      expect(screen.queryByTestId(plusButtonTestId)).toBeInTheDocument()
    })
  })
})

import React from 'react'
import userEvent from '@testing-library/user-event'
import AddTechnologyMainPage from './AddTechnologyMainPage'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../../../test/testUtils'
import { mockGetTechnology } from '../../../../../test/data/candidateListData'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { CurrentAddCandidatePage } from '../../../../../types/Recruitment/CandidateList/CandidateListTypes'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddTechnologyMainPage />
  </div>
)

const addTechInputId = 'addCandidate-addTechInput'
const addTechBtnId = 'addCandidate-addTechBtn'

describe('Add Technology - Add New Candidate', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          candidateList: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            getAllTechnology: mockGetTechnology,
            currentAddCandidatePage: CurrentAddCandidatePage.addTechnology,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('table headers are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Technology Name' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    })

    test('table data is rendered', () => {
      expect(screen.getAllByTestId('addCandidate-technologyRow')).toHaveLength(
        mockGetTechnology.length,
      )
      expect(
        screen.getByTestId('addCandidate-technologyCount'),
      ).toHaveTextContent(`Total Records: ${mockGetTechnology.length}`)
    })

    test('delete technology functionality', () => {
      const technologyToDeleteIndex = 3
      const technologyToDelete = mockGetTechnology[technologyToDeleteIndex]
      const deleteButton = screen.getByTestId(
        `addCandidate-delTechBtn-${technologyToDeleteIndex}`,
      )
      act(() => {
        userEvent.click(deleteButton)
      })
      expect(
        screen.getByText(`Do you want to delete ${technologyToDelete.name}?`),
      ).toBeVisible()
      const modalConfirmButton = screen.getByTestId('modalConfirmBtn')
      expect(modalConfirmButton).toHaveTextContent('Yes')

      act(() => {
        userEvent.click(modalConfirmButton)
      })
    })

    test('cancel delete technology functionality', () => {
      const techDeleteIndex = 2
      const deleteButton = screen.getByTestId(
        `addCandidate-delTechBtn-${techDeleteIndex}`,
      )
      act(() => {
        userEvent.click(deleteButton)
      })
      act(() => {
        userEvent.click(screen.getByText('No'))
      })
    })

    test('add technology functionality', () => {
      const technologyInput = screen.getByTestId(addTechInputId)
      const addButton = screen.getByTestId(addTechBtnId)
      const techInputTest = 'testing the add button'

      // initial
      expect(addButton).toBeDisabled()
      expect(technologyInput).toHaveValue('')

      // taking input
      act(() => {
        fireEvent.change(technologyInput, { target: { value: techInputTest } })
      })
      expect(technologyInput).toHaveValue(techInputTest)

      // button enabled on input
      expect(addButton).toBeEnabled()

      act(() => {
        userEvent.click(addButton)
      })
    })

    test('technology already exists error on adding', () => {
      const technologyInput = screen.getByTestId(addTechInputId)
      const addButton = screen.getByTestId(addTechBtnId)
      const techInputTest = mockGetTechnology[4].name

      act(() => {
        fireEvent.change(technologyInput, { target: { value: techInputTest } })
      })
      expect(addButton).toBeEnabled()

      act(() => {
        userEvent.click(addButton)
      })
      // value is emptied if already exists
      expect(technologyInput).toHaveValue('')
    })

    test('back button functionality', () => {
      const backButton = screen.getByTestId('addCandidate-addTech-backBtn')
      expect(backButton).toBeEnabled()
      act(() => {
        userEvent.click(backButton)
      })
    })
  })
})

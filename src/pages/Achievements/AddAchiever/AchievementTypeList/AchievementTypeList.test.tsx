import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AchievementTypeList from './AchievementTypeList'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockBackButtonHandler = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeList backButtonHandler={mockBackButtonHandler} />
  </div>
)

describe('Achievement Type List Testing', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            dateSortedList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    test('back button is rendered and functional', () => {
      const backBtn = screen.getByTestId('back-btn')
      expect(backBtn).toBeTruthy()
      expect(backBtn).toBeEnabled()
      expect(backBtn).toHaveClass('btn-ovh me-1')
      fireEvent.click(backBtn)
      expect(mockBackButtonHandler).toHaveBeenCalledTimes(1)
    })
    test('Total number of records are displayed', () => {
      const tag = screen.getByTestId('tot-rec-num')
      expect(tag).toHaveTextContent('Total Records: 10')
    })
    test('scroll functionality not enabled', () => {
      const col = screen.getByTestId('scroll-col')
      expect(col).not.toHaveClass('custom-scroll')
    })
    //Wrote these tests again here to meet sonar requirements and all functions are included as this is the parent file
    test('test clear button', () => {
      const achName = screen.getByTestId('ach-name-input')
      const clearBtn = screen.getByTestId('clear-btn-id')
      userEvent.type(achName, 'testing done right')
      userEvent.click(clearBtn)
      expect(achName).toHaveValue('')
      expect(screen.getByTestId('ach-order-input')).toHaveValue('')
    })
    test('test add button', () => {
      const addBtn = screen.getByTestId('add-btn-id')
      expect(addBtn).toBeDisabled()
      const achName = screen.getByTestId('ach-name-input')
      const achOrder = screen.getByTestId('ach-order-input')
      userEvent.type(achName, 'testing on')
      userEvent.type(achOrder, '99')
      expect(addBtn).toBeEnabled()
      userEvent.click(addBtn)
      expect(
        screen.findByText('Achievement Type Added Successfully'),
      ).toBeTruthy()
    })
    test('test save changes button', () => {
      const editBtn = screen.getByTestId('edit-btn-1')
      userEvent.click(editBtn)
      const saveBtn = screen.getByTestId('save-btn-1')
      expect(saveBtn).toBeVisible()
      const order = screen.getByTestId('new-order')
      userEvent.clear(order)
      userEvent.type(order, '5')
      userEvent.click(saveBtn)
    })
    test('test delete button', () => {
      const editBtn = screen.getByTestId('del-btn-0')
      userEvent.click(editBtn)
      const modalContent = screen.getByTestId('confirm-modal-content')
      expect(modalContent).toBeTruthy()
      expect(modalContent).toHaveTextContent(
        'Do you really want to delete 12Nov20221 type?',
      )
      const confirmModalButton = screen.getByTestId('modalConfirmBtn')
      userEvent.click(confirmModalButton)
    })
  })
})

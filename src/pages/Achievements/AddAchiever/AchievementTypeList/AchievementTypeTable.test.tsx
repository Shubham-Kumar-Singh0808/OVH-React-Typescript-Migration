import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AchievementTypeTable from './AchievementTypeTable'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { TextDanger } from '../../../../constant/ClassName'
import { TableColor } from '../../AchievementConstants'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockExecuteSaveButtonHandler = jest.fn()
const mockSetEditSaveButtonEnabled = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeTable
      executeSaveButtonHandler={mockExecuteSaveButtonHandler}
      isEditSaveButtonEnabled={false}
      setEditSaveButtonEnabled={mockSetEditSaveButtonEnabled}
    />
  </div>
)

const editBtnId = 'edit-btn-1'

describe('Achievement Type Table Testing', () => {
  describe('Initial Render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    test('Table is rendered', () => {
      const table = screen.getByRole('table')
      expect(table).toBeTruthy()
    })
    test('Table headers are shown', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Achievement Type Name' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Order' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    })
    test('Should render correct number of rows', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(11)
    })
    test('render and functional edit button', () => {
      const editButton = screen.getByTestId(editBtnId)
      expect(editButton).toBeTruthy()
      fireEvent.click(editButton)
      const selectStatus = screen.getByTestId('new-status-sel')
      const inputOrder = screen.getByTestId('new-order')
      const saveButton = screen.getByTestId('save-btn-1')
      const closeButton = screen.getByTestId('close-btn-1')
      expect(selectStatus).toBeVisible()
      expect(inputOrder).toBeVisible()
      expect(saveButton).toBeVisible()
      expect(closeButton).toBeVisible()
    })
    test('show "order must be unique" error on entering order which is already existant', () => {
      const editButton = screen.getByTestId(editBtnId)
      fireEvent.click(editButton)
      const inputOrder = screen.getByTestId('new-order')
      expect(inputOrder).toHaveValue('3')
      expect(screen.getByTestId('unique-order-err')).toHaveClass(TableColor)
      userEvent.clear(inputOrder)
      userEvent.type(inputOrder, '5')
      expect(inputOrder).toHaveValue('5')
      expect(screen.getByTestId('unique-order-err')).toHaveClass(TextDanger)
    })
    test('save edited Achievement', () => {
      const editButton = screen.getByTestId(editBtnId)
      fireEvent.click(editButton)
      const selectStatus = screen.getByTestId('new-status-sel')
      const inputOrder = screen.getByTestId('new-order')
      expect(inputOrder).toHaveValue('3')
      userEvent.selectOptions(selectStatus, 'Inactive')
      userEvent.clear(inputOrder)
      userEvent.type(inputOrder, '58')
      const saveBtn = screen.getByTestId('save-btn-1')
      userEvent.click(saveBtn)
    })
    test('render delete button and be functional', () => {
      const deleteButton = screen.getByTestId('del-btn-1')
      expect(deleteButton).toBeTruthy()
      fireEvent.click(deleteButton)
      const confirmModalButton = screen.getByTestId('modalConfirmBtn')
      expect(confirmModalButton).toBeTruthy()
      fireEvent.click(confirmModalButton)
    })
  })
})

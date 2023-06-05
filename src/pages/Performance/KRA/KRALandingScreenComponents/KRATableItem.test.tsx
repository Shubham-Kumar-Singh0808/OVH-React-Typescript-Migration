import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KRATableItem from './KRATableItem'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockKRADataList } from '../../../../test/data/KRAData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'

const mockSetIconVisible = jest.fn()
const mockSetSelectedKRAId = jest.fn()
const mockSetModalDescription = jest.fn()
const mockSetModalVisible = jest.fn()
const mockSetDeleteThisKRA = jest.fn()

const toInitialRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KRATableItem
      isIconVisible={false}
      selectedKRA={mockKRADataList.list[3]}
      selectedKRAId={-1}
      setIsIconVisible={mockSetIconVisible}
      setSelectedKRAId={mockSetSelectedKRAId}
      setModalDescription={mockSetModalDescription}
      setModalVisible={mockSetModalVisible}
      setDeleteThisKRA={mockSetDeleteThisKRA}
      setAddKPI={jest.fn()}
      setIsDeleteModalVisible={jest.fn()}
      setDeleteThisKRAName={jest.fn()}
    />
  </div>
)

const kpiVisibleRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KRATableItem
      isIconVisible={true}
      selectedKRA={mockKRADataList.list[3]}
      selectedKRAId={551}
      setIsIconVisible={mockSetIconVisible}
      setSelectedKRAId={mockSetSelectedKRAId}
      setModalDescription={mockSetModalDescription}
      setModalVisible={mockSetModalVisible}
      setDeleteThisKRA={mockSetDeleteThisKRA}
      setAddKPI={jest.fn()}
      setIsDeleteModalVisible={jest.fn()}
      setDeleteThisKRAName={jest.fn()}
    />
  </div>
)

const expandIconId = 'ic-expandIcon'
const collapseIconId = 'ic-collapseIcon'

const deleteBtnId = 'del-btn-kra'
const editButtonId = 'edit-btn-kra-screen-551'

describe('KRA Table Item', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toInitialRender, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kraData: mockKRADataList,
            currentOnScreenPage: KRAPages.kraList,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('initial ui and data render', () => {
      expect(screen.getByTestId(collapseIconId)).toBeVisible()
      expect(screen.getByTestId('kra-Name')).toHaveTextContent('People or Self')
      expect(screen.getByTestId('kra-description')).toHaveTextContent('') //Due to parsing
      expect(screen.getByTestId('dept-name')).toHaveTextContent('Development')
      expect(screen.getByTestId('desig-name')).toHaveTextContent(
        'Senior Consultant',
      )
      expect(screen.getByTestId('kra-percent')).toHaveTextContent('25%')
      expect(screen.getByTestId('kpi-cnt')).toHaveTextContent('4')
      expect(screen.getByTestId(deleteBtnId + '-551')).toBeEnabled()
      expect(screen.getByTestId(editButtonId)).toBeEnabled()
    })

    test('collapse on clicking icon', () => {
      const collapseIcon = screen.getByTestId(collapseIconId)
      userEvent.click(collapseIcon)
      expect(mockSetIconVisible).toHaveBeenCalledTimes(1)
      expect(mockSetSelectedKRAId).toHaveBeenCalledTimes(1)
    })

    test('name click render modal', () => {
      const name = screen.getByTestId('kra-Name')
      userEvent.click(name)
      expect(mockSetModalDescription).toHaveBeenCalledTimes(1)
      expect(mockSetModalVisible).toHaveBeenCalledTimes(1)
    })

    test('edit kra button', () => {
      const editBtn = screen.getByTestId(editButtonId)
      expect(editBtn).toBeEnabled()
      userEvent.click(editBtn)
    })
  })

  describe('kpi visible render', () => {
    beforeEach(() => {
      render(kpiVisibleRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kraData: mockKRADataList,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('kpi row is visible', () => {
      expect(screen.getByTestId('inner-table')).toBeVisible()
    })

    test('expand icon is visible', () => {
      expect(screen.getByTestId(expandIconId)).toBeVisible()
    })
  })
})

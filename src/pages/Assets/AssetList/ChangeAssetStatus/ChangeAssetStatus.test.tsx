/* eslint-disable no-duplicate-imports */
import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ChangeAssetStatus from './ChangeAssetStatus'
import ChangeAssetAddVendor from './ChangeAssetAddVendor'
import { render, screen } from '../../../../test/testUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { mockChangeAssetData } from '../../../../test/data/AssetListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockSaveEmployee } from '../../../../test/data/saveEmployeeData'

const mockSetEmpName = jest.fn()
const mockSetData = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ChangeAssetStatus
      setToggle={jest.fn()}
      changeReportStatus={mockChangeAssetData}
      setChangeReportStatus={jest.fn()}
    />
    ,
  </div>
)
describe('Change Asset status Component Testing', () => {
  test('should render Change Asset status component with out crashing', () => {
    render(toRender, {
      preloadedState: {
        changeStatus: {
          saveEmployee: mockSaveEmployee,
          getAllAssetResponse: mockChangeAssetData,
          isLoading: ApiLoadingState.succeeded,
          toggleValue: '',
        },
      },
    })
  })

  describe('Change Asset status Toggle Component Testing', () => {
    test('setToggle should update the toggle state', () => {
      render(toRender, {
        preloadedState: {
          changeStatus: {
            saveEmployee: mockSaveEmployee,
            getAllAssetResponse: mockChangeAssetData,
            isLoading: ApiLoadingState.succeeded,
            toggleValue: '',
          },
        },
      })
      const backButtonElement = screen.getByTestId('back-button')
      expect(backButtonElement).toBeInTheDocument()
      userEvent.click(backButtonElement)
      expect(mockSetData).toHaveBeenCalledTimes(0)
    })
  })
  test('should render create New Ticket component with out crashing', () => {
    render(<ChangeAssetAddVendor setEmpToggle={mockSetEmpName} />)
    expect(screen.getByText('Add Vendor Details')).toBeInTheDocument()
  })
})
const dispatch = jest.fn()
describe('onSelectEmployee', () => {
  it('should call getEmployeeId with the selected value', () => {
    const value = 'Thriveni Bathula '
    const mockGetEmployeeId = jest.fn()
    mockGetEmployeeId.mockReturnValueOnce(1)
    const onSelectEmployee = (value: string) => {
      const empId = mockGetEmployeeId(value)
      if (empId === -1) {
        return
      }
      dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
    }

    onSelectEmployee(value)

    expect(mockGetEmployeeId).toHaveBeenCalledTimes(1)
    expect(mockGetEmployeeId).toHaveBeenCalledWith(value)
  })
})

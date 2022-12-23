import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyKRAsEntry from './MyKRAsEntry'
import { render, screen } from '../../../test/testUtils'
import {
  mockIndividualKRAs,
  mockKPIsForIndividualKra,
} from '../../../test/data/MyKRAsData'

const mockSetIsIconVisible = jest.fn()
const mockSetSelectedPersonId = jest.fn()
describe('Investment CheckList Entry Component testing with different data', () => {
  beforeEach(() => {
    render(
      <MyKRAsEntry
        id={0}
        employeeKRA={{
          checkType: null,
          count: 0,
          departmentId: 0,
          departmentName: '',
          description: '',
          designationId: 0,
          designationKraPercentage: 0,
          designationName: '',
          id: 0,
          kpiLookps: null,
          name: '',
        }}
        selectedPersonId={1978}
        setSelectedPersonId={mockSetSelectedPersonId}
        isIconVisible={true}
        setIsIconVisible={mockSetIsIconVisible}
      />,
      {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1982',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'RAYBIZTECH',
              token: 'testing',
              designation: 'Software Engineer',
            },
          },
          myKRAs: {
            kras: mockIndividualKRAs,
            kpis: mockKPIsForIndividualKra,
          },
        },
      },
    )
  })
  test('should render collapseIcon', () => {
    const rowCollapseIcon = screen.getByTestId('ic-collapseIcon')
    userEvent.click(rowCollapseIcon)
    expect(rowCollapseIcon).toBeTruthy()
  })
})

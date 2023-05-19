import * as React from 'react'
import EmployeesListUnderManagerTable from './EmployeesListUnderManagerTable'
import {
  cleanup,
  fireEvent,
  getByRole,
  getByTestId,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { mockAllReportingManagerData } from '../../../test/data/ChangeReporteesData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('FEmployeesListUnderManagerTable component with data', () => {
  beforeEach(() => {
    render(
      <EmployeesListUnderManagerTable
        employeeData={mockAllReportingManagerData}
        managersOrHrManagersList={[]}
        placeHolder={''}
        autoCompleteTarget={''}
        onClickHandler={jest.fn()}
      />,
      {
        preloadedState: {
          changeReportees: {
            AllReportingManagerList: mockAllReportingManagerData,
          },
        },
      },
    )
  })
  test('should click on update button  ', () => {
    const editElement = screen.getAllByTestId('update-manager')
    fireEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
  })

  test('Table headers are shown', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Id' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Department' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
  })

  test('should render with data ', () => {
    expect(screen.getByText('Ajay Ray')).toBeInTheDocument()
  })
  test('Should render correct number of rows', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(4)
  })
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockAllReportingManagerData.length),
    ).toBeInTheDocument()
  })
})

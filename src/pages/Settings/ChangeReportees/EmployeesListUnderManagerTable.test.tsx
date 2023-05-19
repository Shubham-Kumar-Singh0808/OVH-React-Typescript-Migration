import * as React from 'react'
import userEvent from '@testing-library/user-event'
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
      <>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <EmployeesListUnderManagerTable
            employeeData={mockAllReportingManagerData}
            managersOrHrManagersList={[]}
            placeHolder={'Manager Name'}
            autoCompleteTarget={''}
            onClickHandler={jest.fn()}
          />
        </div>
      </>,
      {
        preloadedState: {
          changeReportees: {
            AllReportingManagerList: mockAllReportingManagerData,
          },
        },
      },
    )
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

  test('should click on update button  ', () => {
    const editElement = screen.getAllByTestId('update-manager')
    fireEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
    expect(editElement[0]).toBeDisabled()
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

  // it('should update selected rows when checkbox is checked/unchecked', () => {
  //   const checkbox = screen.getAllByRole('checkbox')

  //   fireEvent.click(checkbox[0])
  //   expect(checkbox[0]).toBe(true)

  //   fireEvent.click(checkbox[0])
  //   expect(checkbox[0]).toBe(false)
  // })

  // eslint-disable-next-line require-await
  it('update button enable', async () => {
    const checkbox = screen.getAllByRole('checkbox')
    // Select a row
    fireEvent.click(checkbox[1])
    fireEvent.click(checkbox[0])
    fireEvent.click(checkbox[1])

    // Select a valid manager from the autocomplete
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Ajay Ray' },
    })

    const updateButton = screen.getByTestId('update-manager')
    userEvent.click(updateButton)

    // expect(updateButton).toBeDisabled()
    // fireEvent.click(updateButton)
    await waitFor(() => {
      expect(
        screen.findByText(/Employee's Reporting Manager changed successfully./),
      ).toBeTruthy()
    })
  })
})

describe('update button', () => {
  beforeEach(() => {
    render(
      <EmployeesListUnderManagerTable
        employeeData={[]}
        managersOrHrManagersList={[]}
        placeHolder={'Hr Name'}
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

  it('should render "No Records Found" when employeeData is empty', () => {
    expect(screen.getByText(/No Records Found/i)).toBeInTheDocument()
  })
})

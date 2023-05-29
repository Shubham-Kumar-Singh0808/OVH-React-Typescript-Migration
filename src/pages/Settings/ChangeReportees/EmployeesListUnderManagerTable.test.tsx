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

const updateTestId = 'update-manager'
describe('FEmployeesListUnderManagerTable component with data', () => {
  beforeEach(() => {
    render(
      <>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <EmployeesListUnderManagerTable
            employeeData={mockAllReportingManagerData}
            managersOrHrManagersList={mockAllReportingManagerData}
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
    const editElement = screen.getAllByTestId(updateTestId)
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

  // eslint-disable-next-line require-await
  it('update button enable for Manager', async () => {
    const checkbox = screen.getAllByRole('checkbox')
    // Select a row
    fireEvent.click(checkbox[1])
    fireEvent.click(checkbox[0])
    fireEvent.click(checkbox[1])

    // Select a valid manager from the autocomplete
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Ajay Ray' },
    })

    const updateButton = screen.getByTestId(updateTestId)
    expect(updateButton).toBeEnabled()
    //userEvent.click(updateButton)

    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(
        screen.findByText(/Employee's Reporting Manager changed successfully./),
      ).toBeTruthy()
    })
  })
})

describe('Manager update button', () => {
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

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeesListUnderManagerTable
      employeeData={mockAllReportingManagerData}
      managersOrHrManagersList={mockAllReportingManagerData}
      placeHolder={'Hr Name'}
      autoCompleteTarget={''}
      onClickHandler={jest.fn()}
    />
  </div>
)
describe('Hr Manager update button', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        changeReportees: {
          AllReportingManagerList: mockAllReportingManagerData,
        },
      },
    })
  })

  it('update button enable for Hr Manager', async () => {
    const checkbox = screen.getAllByRole('checkbox')
    // Select a row
    fireEvent.click(checkbox[0])
    fireEvent.click(checkbox[1])
    fireEvent.click(checkbox[0])

    // Select a valid manager from the autocomplete
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Ajay Ray' },
    })

    const updateButton = screen.getByTestId(updateTestId)
    expect(updateButton).toBeEnabled()

    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(
        screen.findByText(/Employee's Hr Associate changed successfully./),
      ).toBeTruthy()
    })
  })
})

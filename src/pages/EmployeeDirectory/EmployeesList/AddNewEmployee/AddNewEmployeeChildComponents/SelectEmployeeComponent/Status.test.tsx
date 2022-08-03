import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import StatusField from './Status'
import { screen, render } from '../../../../../../test/testUtils'
import { mockShifts } from '../../../../../../test/data/employeeDesignationListData'
import {
  GetList,
  Label,
} from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const mockSetIsAccordionItemShow = jest.fn()

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const employeeStatus: GetList[] = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'UnderNotice' },
]

describe('Add be able to edit Employee Status Component', () => {
  beforeEach(() => {
    render(
      <StatusField
        list={employeeStatus}
        setStatusValue={jest.fn()}
        setStatusDateValue={jest.fn()}
        dateValue={''}
        value={''}
        isRequired={false}
        dynamicFormLabelProps={jest.fn()}
      />,
    )
  })

  test('should be able to render Employee Status Component Title', () => {
    expect(screen.getByText('Employee Status:')).toBeInTheDocument()
  })

  test('should be able to correctly set default option', () => {
    expect(screen.getByRole('option', { name: 'Active' })).toBeTruthy()
  })
})

describe('Should be able to render Relieving Date if Inactive is selected', () => {
  beforeEach(() => {
    render(
      <StatusField
        list={employeeStatus}
        setStatusValue={mockSetIsAccordionItemShow}
        setStatusDateValue={jest.fn()}
        dateValue={'01/01/2022'}
        value={'Inactive'}
        isRequired={false}
        dynamicFormLabelProps={jest.fn()}
      />,
    )
  })

  test('should be able to render Relieving Date Title', () => {
    expect(screen.getByText('Relieving Date:')).toBeInTheDocument()
  })

  test('should be able to select date', () => {
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInput[0],
      new Date('12/22/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })

  test('should render Employee Status Component List Options with out crashing', () => {
    const staatusSelector = screen.getByTestId('formRelievingDate')
    userEvent.selectOptions(staatusSelector, ['Active'])
    expect(mockSetIsAccordionItemShow).toBeCalledWith('Active')
  })
})

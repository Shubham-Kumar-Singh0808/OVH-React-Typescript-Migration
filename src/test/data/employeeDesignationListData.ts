import {
  EmployeeDepartment,
  EmployeeDesignation,
} from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import { EmployeeShiftDetails } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'

export const mockDesignationList: EmployeeDesignation[] = [
  {
    id: 33,
    name: 'Accounts & Finance',
    code: '33',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 20,
    name: 'Accounts Executive',
    code: '20',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 51,
    name: 'Finance and Account Executive ',
    code: '51',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 68,
    name: 'Finance and Accounts Manager',
    code: '68',
    departmentName: 'Accounts',
    departmentId: 4,
  },
]

export const mockShifts: EmployeeShiftDetails[] = [
  {
    id: 14,
    name: 'UK Shift',
    startTimeHour: '23',
    startTimeMinutes: '20',
    endTimeHour: '23',
    endTimeMinutes: '00',
    graceTime: '00',
  },
  {
    id: 16,
    name: 'Canada Shift',
    startTimeHour: '23',
    startTimeMinutes: '59',
    endTimeHour: '09',
    endTimeMinutes: '35',
    graceTime: '12',
  },
  {
    id: 23,
    name: 'US Shift',
    startTimeHour: '18',
    startTimeMinutes: '00',
    endTimeHour: '23',
    endTimeMinutes: '00',
    graceTime: '30',
  },
  {
    id: 27,
    name: 'German Shift',
    startTimeHour: '06',
    startTimeMinutes: '59',
    endTimeHour: '23',
    endTimeMinutes: '59',
    graceTime: '45',
  },
  {
    id: 34,
    name: 'Russia',
    startTimeHour: '01',
    startTimeMinutes: '59',
    endTimeHour: '02',
    endTimeMinutes: '59',
    graceTime: '59',
  },
  {
    id: 35,
    name: 'test Shift',
    startTimeHour: '11',
    startTimeMinutes: '00',
    endTimeHour: '12',
    endTimeMinutes: '30',
    graceTime: '100',
  },
  {
    id: 37,
    name: 'test99',
    startTimeHour: '23',
    startTimeMinutes: '59',
    endTimeHour: '23',
    endTimeMinutes: '45',
    graceTime: '47',
  },
  {
    id: 38,
    name: 'test33',
    startTimeHour: '23',
    startTimeMinutes: '45',
    endTimeHour: '23',
    endTimeMinutes: '45',
    graceTime: '454',
  },
]

export const mockDepartments: EmployeeDepartment[] = [
  {
    departmentId: 1,
    departmentName: 'Networking',
  },
  {
    departmentId: 2,
    departmentName: 'Administrative',
  },
  {
    departmentId: 3,
    departmentName: 'HR',
  },
  {
    departmentId: 4,
    departmentName: 'Accounts',
  },
  {
    departmentId: 5,
    departmentName: 'Designing',
  },
  {
    departmentId: 6,
    departmentName: 'Development',
  },
  {
    departmentId: 7,
    departmentName: 'Sales',
  },
  {
    departmentId: 8,
    departmentName: 'Testing',
  },
  {
    departmentId: 9,
    departmentName: 'Business Analyst',
  },
  {
    departmentId: 10,
    departmentName: 'Presales',
  },
  {
    departmentId: 11,
    departmentName: 'Marketing',
  },
  {
    departmentId: 12,
    departmentName: 'Software Quality Assurance',
  },
]

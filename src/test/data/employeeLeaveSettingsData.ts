import {
  EmployeeSaveLeaveCalenderSetting,
  EmployeeLeaveCategory,
} from '../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

export const mockLeaveCalenderSettingsType: EmployeeSaveLeaveCalenderSetting[] =
  [
    {
      id: '1',
      leaveCycleMonth: 'August',
      leavesPerYear: 1,
      maxAccrualPerYear: 2,
      maxLeavesEarned: 2,
      payrollCutoffDate: 2,
      probationPeriod: 2,
    },
  ]

export const mockLeaveCategoriesType: EmployeeLeaveCategory[] = [
  {
    id: 1,
    name: 'Sick',
    leaveType: 'LOP',
  },
]

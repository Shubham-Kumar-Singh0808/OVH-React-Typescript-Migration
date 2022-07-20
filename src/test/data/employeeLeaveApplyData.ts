import {
  EmployeeLeaveApply,
  EmployeeLeaveType,
} from '../../types/Leaves/employeeApplyLeaves'

export const mockLeaveType: EmployeeLeaveType[] = [
  {
    id: 103,
    name: 'LOP',
    leaveType: 'EARNED',
  },
  {
    id: 104,
    name: 'Leave',
    leaveType: 'EARNED',
  },
  {
    id: 6,
    name: 'Leavesss',
    leaveType: 'EARNED',
  },
  {
    id: 1,
    name: 'LeavessscAT',
    leaveType: 'EARNED',
  },
  {
    id: 102,
    name: 'Many',
    leaveType: 'EARNED',
  },
  {
    id: 100,
    name: 'Sick',
    leaveType: 'LOP',
  },
  {
    id: 110,
    name: 'Sick  leave',
    leaveType: 'EARNED',
  },
  {
    id: 3,
    name: 'delete',
    leaveType: 'EARNED',
  },
  {
    id: 106,
    name: 'fever',
    leaveType: 'EARNED',
  },
  {
    id: 38,
    name: 'hday',
    leaveType: 'EARNED',
  },
  {
    id: 108,
    name: 'hjhj',
    leaveType: 'LOP',
  },
  {
    id: 101,
    name: 'homesick',
    leaveType: 'EARNED',
  },
  {
    id: 109,
    name: 'sadsadsadsa',
    leaveType: 'EARNED',
  },
  {
    id: 105,
    name: 'xyz',
    leaveType: 'LOP',
  },
]
export const mockLeaveApply: EmployeeLeaveApply = {
  employeeComments: 'tuy thy',
  employeeId: 1985,
  fromDate: '19/07/2022',
  id: '',
  leaveAppliedOn: '20/07/2022',
  leaveCategoryName: 'Leave',
  toDate: '21/07/2022',
}

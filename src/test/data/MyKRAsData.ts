import { KPIs, KRAs } from '../../types/Performance/MyKRAs/myKRAsTypes'

export const mockIndividualKRAs: KRAs[] = [
  {
    id: 505,
    name: 'Customer',
    description: 'Customer Satisfaction',
    kpiLookps: null,
    count: 3,
    checkType: null,
    designationName: 'Team Lead',
    designationId: 153,
    departmentName: 'Designing',
    departmentId: 5,
    designationKraPercentage: 10.0,
  },
  {
    id: 506,
    name: 'Project',
    description:
      'Project work, rework, reusable of project, project deliverables etc',
    kpiLookps: null,
    count: 4,
    checkType: null,
    designationName: 'Team Lead',
    designationId: 153,
    departmentName: 'Designing',
    departmentId: 5,
    designationKraPercentage: 40.0,
  },
  {
    id: 507,
    name: 'People Self',
    description: 'Managing self as well as the team members',
    kpiLookps: null,
    count: 4,
    checkType: null,
    designationName: 'Team Lead',
    designationId: 153,
    departmentName: 'Designing',
    departmentId: 5,
    designationKraPercentage: 25.0,
  },
  {
    id: 508,
    name: 'Financial',
    description:
      'Checking team members time-sheet, risk identification and mitigation etc',
    kpiLookps: null,
    count: 3,
    checkType: null,
    designationName: 'Team Lead',
    designationId: 153,
    departmentName: 'Designing',
    departmentId: 5,
    designationKraPercentage: 10.0,
  },
  {
    id: 509,
    name: 'Organizational',
    description:
      'Organization growth, helping the organization in training, making collaterals and case studies. ',
    kpiLookps: null,
    count: 4,
    checkType: null,
    designationName: 'Team Lead',
    designationId: 153,
    departmentName: 'Designing',
    departmentId: 5,
    designationKraPercentage: 15.0,
  },
]

export const mockKPIsForIndividualKra: KPIs[] = [
  {
    id: 1721,
    name: 'Customer Satisfaction',
    description:
      '<table border="0" cellpadding="0" cellspacing="0" width="308"><tbody><tr height="69">&#10;  <td height="69" class="xl66" width="308">CSAT is&#10;  mandatory and has to be sent and completed by customer at end of the project&#10;  or at a 6 months interval if the project is beyond 6 months or more </td></tr></tbody></table>',
    frequencyId: 13,
    frequency: '6 Months or When Project Ends',
    target: '>4',
    kraDto: [],
  },
  {
    id: 1720,
    name: 'Refrencability',
    description:
      '<table border="0" cellpadding="0" cellspacing="0" width="308"><tbody><tr height="34">&#10;  <td height="34" class="xl66" width="308">Enabling&#10;  customer to provide references </td></tr></tbody></table>',
    frequencyId: 13,
    frequency: '6 Months or When Project Ends',
    target: '> 75% (No of refrenceble clients / total clients)',
    kraDto: [],
  },
  {
    id: 1719,
    name: 'Customer Feedback',
    description:
      '<table border="0" cellpadding="0" cellspacing="0" width="308"><tbody><tr height="52">&#10;  <td height="52" class="xl66" width="308">Customer&#10;  Feedback in terms of quality of deliverables, schedules, Risks and view of&#10;  customer about team, value and communication</td></tr></tbody></table>',
    frequencyId: 14,
    frequency: 'Every Month',
    target: 'Every month ( Met if appreciation - Not met if escalation)',
    kraDto: [],
  },
]

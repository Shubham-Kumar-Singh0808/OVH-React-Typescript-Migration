import {
  Frequency,
  IncomingKPIDataItem,
} from '../../types/Performance/KRA/KRATypes'

export const mockFrequencyList: Frequency[] = [
  {
    id: 1,
    frequencyname: 'Per Sprint',
  },
  {
    id: 2,
    frequencyname: 'Per Release',
  },
  {
    id: 3,
    frequencyname: 'Per Quarter or Project',
  },
  {
    id: 4,
    frequencyname: 'Per Project or Quarter',
  },
  {
    id: 5,
    frequencyname: 'Quarterly',
  },
  {
    id: 6,
    frequencyname: 'Per Project',
  },
  {
    id: 7,
    frequencyname: 'Every Release',
  },
  {
    id: 8,
    frequencyname: 'Monthly',
  },
  {
    id: 9,
    frequencyname: 'Monthly or Phase End',
  },
  {
    id: 10,
    frequencyname: 'Per Audit',
  },
  {
    id: 11,
    frequencyname: 'Per Project or Month',
  },
  {
    id: 12,
    frequencyname: 'Project Closure',
  },
  {
    id: 13,
    frequencyname: '6 Months or When Project Ends',
  },
  {
    id: 14,
    frequencyname: 'Every Month',
  },
  {
    id: 15,
    frequencyname: 'Annually',
  },
  {
    id: 16,
    frequencyname: 'Every Milestone',
  },
  {
    id: 17,
    frequencyname: 'Quarterly /Project Based',
  },
]

export const mockKPIData: IncomingKPIDataItem = {
  id: 1864,
  name: 'Help others in resolving issues and meet deadlines',
  description:
    '<div>Are you a team player? Helping others irrespective of asked for or not but making sure we help to meet the overall project milestones and in turn helping others grow.</div><div><br/></div>',
  frequencyId: 3,
  frequency: 'Per Sprint',
  target: '100%',
  kraDto: {
    id: 546,
    name: 'test',
    description: null,
    kpiLookps: null,
    count: 0,
    checkType: null,
    designationName: null,
    designationId: null,
    departmentName: null,
    departmentId: null,
    designationKraPercentage: null,
  },
}

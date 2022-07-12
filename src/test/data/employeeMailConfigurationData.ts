import {
  EmployeeMailTemplate,
  EmployeeMailTemplateType,
} from '../../types/Settings/MailConfiguration/employeMailConfigurationTypes'

export const mockEmailTemplate: EmployeeMailTemplate[] = [
  {
    id: 70,
    templateName: 'old',
    template: 'tyhu',
    templateTypeId: 5,
    templateType: 'Conference Room Booking',
    assetTypeId: null,
    assetType: 'N/A',
    email: null,
  },
  {
    id: 68,
    templateName: 'Support',
    template: 'dmcod',
    templateTypeId: 5,
    templateType: 'Support Management',
    assetTypeId: null,
    assetType: 'N/A',
    email: null,
  },
]

export const mockTemplateTypes: EmployeeMailTemplateType[] = [
  {
    id: 3,
    name: 'Project Management',
  },
  {
    id: 4,
    name: 'Appraisal management',
  },
  {
    id: 5,
    name: 'testing',
  },
  {
    id: 6,
    name: 'Performance Management',
  },
  {
    id: 7,
    name: 'Recuritment',
  },
  {
    id: 8,
    name: 'Conference Room Booking',
  },
  {
    id: 9,
    name: 'Separation',
  },
  {
    id: 10,
    name: 'IT Declaration',
  },
  {
    id: 11,
    name: 'Asset Management',
  },
  {
    id: 25,
    name: 's',
  },
  {
    id: 26,
    name: 'hyjj',
  },
  {
    id: 27,
    name: 'HBJ',
  },
  {
    id: 28,
    name: 'umum',
  },
  {
    id: 29,
    name: 'yum',
  },
  {
    id: 30,
    name: 'test',
  },
  {
    id: 32,
    name: 'Sunny Test',
  },
  {
    id: 33,
    name: 'Project Management',
  },
  {
    id: 34,
    name: 'Asset',
  },
]

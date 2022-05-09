import { EmployeeCertifications } from '../../types/Qualifications/qualificationTypes'

export const mockCertificates: EmployeeCertifications[] = [
  {
    code: '5552561',
    name: 'test',
    completedDate: '16/03/2022',
    expiryDate: '30/08/2023',
    percent: '100.0',
    description: 'test',
    technology: 'Java',
    certificateType: 'Development',
  },
  {
    code: '2198781',
    name: 'kentico-mvc',
    completedDate: '01/03/2022',
    expiryDate: '18/07/2024',
    percent: '98.0',
    description: 'test',
    technology: '.Net',
    certificateType: 'MVC',
  },
]

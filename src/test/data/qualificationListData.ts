import { EmployeeQualifications } from '../../types/Qualifications/qualificationTypes'

export const mockQualifications: EmployeeQualifications[] = [
  {
    pgLookUp: [
      {
        id: '2',
        label: 'Master of Technology',
      },
      {
        id: '3',
        label: 'Master of Science',
      },
    ],
    graduationLookUp: [
      {
        id: '13',
        label: 'Bachelor of Engineering',
      },
      {
        id: '16',
        label: 'Bachelor of Commerce',
      },
      {
        id: '15',
        label: 'Bachelor of Technology',
      },
    ],
    others:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen books",
    sscName: 'ssctest',
    hscName: 'hsctest',
  },
]

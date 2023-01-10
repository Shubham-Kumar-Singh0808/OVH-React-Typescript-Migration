import {
  AppraisalCycle,
  Designation,
  EmpDepartments,
  ReviewListResponse,
} from '../../types/Performance/ReviewList/reviewListTypes'

export const mockEmployeeDepartments: EmpDepartments[] = [
  {
    departmentId: 1,
    departmentName: 'Networking',
    supportManagementFlag: true,
    allocationSupportFlag: false,
  },
  {
    departmentId: 2,
    departmentName: 'Administrative',
    supportManagementFlag: true,
    allocationSupportFlag: false,
  },
  {
    departmentId: 3,
    departmentName: 'HR',
    supportManagementFlag: true,
    allocationSupportFlag: false,
  },
  {
    departmentId: 4,
    departmentName: 'Accounts',
    supportManagementFlag: true,
    allocationSupportFlag: false,
  },
  {
    departmentId: 5,
    departmentName: 'Designing',
    supportManagementFlag: false,
    allocationSupportFlag: true,
  },
  {
    departmentId: 6,
    departmentName: 'Development',
    supportManagementFlag: false,
    allocationSupportFlag: true,
  },
  {
    departmentId: 7,
    departmentName: 'Sales',
    supportManagementFlag: false,
    allocationSupportFlag: false,
  },
  {
    departmentId: 8,
    departmentName: 'Testing',
    supportManagementFlag: false,
    allocationSupportFlag: true,
  },
  {
    departmentId: 9,
    departmentName: 'Business Analyst',
    supportManagementFlag: false,
    allocationSupportFlag: true,
  },
  {
    departmentId: 10,
    departmentName: 'Presales',
    supportManagementFlag: false,
    allocationSupportFlag: false,
  },
  {
    departmentId: 11,
    departmentName: 'Marketing',
    supportManagementFlag: false,
    allocationSupportFlag: false,
  },
  {
    departmentId: 12,
    departmentName: 'Software Quality Assurance',
    supportManagementFlag: false,
    allocationSupportFlag: false,
  },
]

export const mockConfigurationCycle: AppraisalCycle[] = [
  {
    id: 1,
    name: 'testing',
    description: '<p>testing the appraisal configuration test</p>',
    toDate: '30/12/2016',
    fromDate: '12/12/2016',
    active: false,
    appraisalType: 'Annual',
    appraisalDuration: '18',
    level: 5,
    cycleStartedFlag: true,
    appraisalStartDate: '01/2016',
    appraisalEndDate: '12/2016',
    servicePeriod: 180,
  },
  {
    id: 3,
    name: 'May 2017 ',
    description: '<p>May month review of all associates test</p>',
    toDate: '16/06/2017',
    fromDate: '06/06/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '10',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '05/2017',
    appraisalEndDate: '05/2017',
    servicePeriod: 30,
  },
  {
    id: 4,
    name: 'June 2017',
    description: 'Monthly review process',
    toDate: '21/07/2017',
    fromDate: '06/07/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '15',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '06/2017',
    appraisalEndDate: '06/2017',
    servicePeriod: 25,
  },
  {
    id: 5,
    name: 'July 2017',
    description: 'Monthly Review Process for July 2017',
    toDate: '21/08/2017',
    fromDate: '04/08/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '17',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '07/2017',
    appraisalEndDate: '07/2017',
    servicePeriod: 30,
  },
  {
    id: 7,
    name: 'August 2017',
    description: '<p>Monthly Review Procesfhfs for August 2018</p>',
    toDate: '26/09/2017',
    fromDate: '11/09/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '14',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '08/2017',
    appraisalEndDate: '08/2017',
    servicePeriod: 30,
  },
  {
    id: 8,
    name: 'September 2017',
    description: 'Monthly Review Process for September 2017',
    toDate: '30/10/2017',
    fromDate: '16/10/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '14',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '09/2017',
    appraisalEndDate: '09/2017',
    servicePeriod: 30,
  },
  {
    id: 9,
    name: 'October 2017',
    description: 'Monthly Review Process for October 2017',
    toDate: '30/11/2017',
    fromDate: '21/11/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '9',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '10/2017',
    appraisalEndDate: '10/2017',
    servicePeriod: 30,
  },
  {
    id: 10,
    name: 'November 2017',
    description: 'Monthly Review Process for November 2017',
    toDate: '31/12/2017',
    fromDate: '12/12/2017',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '19',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '11/2017',
    appraisalEndDate: '11/2017',
    servicePeriod: 30,
  },
  {
    id: 11,
    name: 'December 2017',
    description: 'Monthly Review Process for December 2017',
    toDate: '18/01/2018',
    fromDate: '16/01/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '2',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '12/2017',
    appraisalEndDate: '12/2017',
    servicePeriod: 30,
  },
  {
    id: 12,
    name: 'January 2018',
    description: 'Monthly Review Process for January 2018',
    toDate: '19/02/2018',
    fromDate: '15/02/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '4',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '01/2018',
    appraisalEndDate: '01/2018',
    servicePeriod: 30,
  },
  {
    id: 13,
    name: 'March 2018',
    description: 'Monthly review for March 2018',
    toDate: '20/04/2018',
    fromDate: '04/04/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '16',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '03/2018',
    appraisalEndDate: '03/2018',
    servicePeriod: 30,
  },
  {
    id: 14,
    name: 'April 2018',
    description: '<p>Monthly review for April 2019</p>',
    toDate: '31/05/2018',
    fromDate: '17/05/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '14',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '04/2018',
    appraisalEndDate: '04/2018',
    servicePeriod: 30,
  },
  {
    id: 15,
    name: 'June 2018',
    description: 'Monthly performance review ',
    toDate: '20/07/2018',
    fromDate: '05/07/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '15',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '06/2018',
    appraisalEndDate: '06/2018',
    servicePeriod: 30,
  },
  {
    id: 16,
    name: 'July 2018',
    description: 'Monthly performance review of July 2018',
    toDate: '22/08/2018',
    fromDate: '21/08/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '1',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '07/2018',
    appraisalEndDate: '07/2018',
    servicePeriod: 30,
  },
  {
    id: 17,
    name: 'Aug 2018',
    description: 'Monthly Review ',
    toDate: '30/09/2018',
    fromDate: '13/09/2018',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '17',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '08/2018',
    appraisalEndDate: '08/2018',
    servicePeriod: 30,
  },
  {
    id: 18,
    name: 'Dec 2018',
    description: '<p>Monthly performance review for Dec 2018 tsee</p>',
    toDate: '31/01/2019',
    fromDate: '08/01/2019',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '23',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '12/2018',
    appraisalEndDate: '12/2018',
    servicePeriod: 30,
  },
  {
    id: 19,
    name: 'Jan 2019',
    description: 'Monthly performance review for Jan 2019',
    toDate: '28/02/2019',
    fromDate: '18/02/2019',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '10',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '01/2019',
    appraisalEndDate: '01/2019',
    servicePeriod: 30,
  },
  {
    id: 20,
    name: 'tshtrgj',
    description: 'Monthly performance review ',
    toDate: '30/04/2019',
    fromDate: '11/04/2019',
    active: false,
    appraisalType: 'Quarterly',
    appraisalDuration: '19',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '03/2019',
    appraisalEndDate: '03/2019',
    servicePeriod: 30,
  },
  {
    id: 21,
    name: 'Testing Review cycle',
    description: 'Test',
    toDate: '29/04/2022',
    fromDate: '06/04/2022',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '23',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '04/2022',
    appraisalEndDate: '04/2022',
    servicePeriod: 90,
  },
  {
    id: 22,
    name: 'Jan-March-2022',
    description: 'Test',
    toDate: '07/05/2022',
    fromDate: '01/05/2022',
    active: false,
    appraisalType: 'Quarterly',
    appraisalDuration: '6',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '01/2022',
    appraisalEndDate: '03/2022',
    servicePeriod: 90,
  },
  {
    id: 25,
    name: 'Quater 3 Review',
    description: 'Testing',
    toDate: '15/10/2022',
    fromDate: '01/10/2022',
    active: false,
    appraisalType: 'Quarterly',
    appraisalDuration: '14',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '07/2022',
    appraisalEndDate: '09/2022',
    servicePeriod: 90,
  },
  {
    id: 33,
    name: 'New Cycle 3',
    description: 'Test',
    toDate: '18/11/2022',
    fromDate: '10/11/2022',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '8',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '10/2022',
    appraisalEndDate: '11/2022',
    servicePeriod: 10,
  },
  {
    id: 43,
    name: 'July 2017   2018',
    description: 'test',
    toDate: '01/11/2005',
    fromDate: '10/11/2004',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '356',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '05/2013',
    appraisalEndDate: '02/2022',
    servicePeriod: 25,
  },
  {
    id: 48,
    name: 'assign config',
    description: 'training',
    toDate: '18/10/2024',
    fromDate: '18/04/2024',
    active: false,
    appraisalType: 'Probation',
    appraisalDuration: '183',
    level: 1,
    cycleStartedFlag: false,
    appraisalStartDate: '04/2024',
    appraisalEndDate: '10/2024',
    servicePeriod: 58,
  },
  {
    id: 49,
    name: 'Training Period',
    description: 'training period',
    toDate: '18/10/2025',
    fromDate: '18/04/2025',
    active: false,
    appraisalType: 'Probation',
    appraisalDuration: '183',
    level: 1,
    cycleStartedFlag: false,
    appraisalStartDate: '04/2025',
    appraisalEndDate: '10/2025',
    servicePeriod: 8,
  },
  {
    id: 51,
    name: 'Add new test',
    description: '<p>test test test test&nbsp;</p>',
    toDate: '11/12/2027',
    fromDate: '11/09/2027',
    active: false,
    appraisalType: 'Annual',
    appraisalDuration: '3',
    level: 1,
    cycleStartedFlag: false,
    appraisalStartDate: '02/2023',
    appraisalEndDate: '05/2024',
    servicePeriod: 85,
  },
  {
    id: 54,
    name: 'Quarter TestDec22',
    description: 'Test',
    toDate: '30/12/2022',
    fromDate: '23/12/2022',
    active: false,
    appraisalType: 'Monthly',
    appraisalDuration: '7',
    level: 1,
    cycleStartedFlag: true,
    appraisalStartDate: '12/2022',
    appraisalEndDate: '01/2023',
    servicePeriod: 90,
  },
]

export const mockDesignations: Designation[] = [
  {
    id: 13,
    name: 'Admin Executive',
    code: '13',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 264,
    name: 'Adminrs',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 167,
    name: 'Assistant Manager, Admin',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 34,
    name: 'Chief Executive Officer',
    code: '34',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 83,
    name: 'Front Office Executive',
    code: '86',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 31,
    name: 'Managing Director',
    code: '31',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 32,
    name: 'Office Admin',
    code: '32',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 59,
    name: 'Office Admin Executive Trainee',
    code: '59',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 75,
    name: 'Operations Manager',
    code: 'Operations',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 82,
    name: 'Senior Admin Executive',
    code: '85',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 194,
    name: 'Senior analyst',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 217,
    name: 'aa',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 219,
    name: 'aabb',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 228,
    name: 'aasas',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 250,
    name: 'ac',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 207,
    name: 'ad',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 242,
    name: 'addas',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 216,
    name: 'ads',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 203,
    name: 'adtes',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 236,
    name: 'est11',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 265,
    name: 'f',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 192,
    name: 'test1',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
  {
    id: 206,
    name: 'testingAdmin',
    code: '',
    departmentName: 'Administrative',
    departmentId: 2,
  },
]

export const mockReviewList: ReviewListResponse = {
  size: 41,
  list: [
    {
      id: 215,
      empId: 1983,
      employeeName: 'Sai Banoth',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 7.84,
      finalRating: null,
      pendingWith: 'a',
      empDepartmentName: 'Development',
      empDesignationName: 'Project Manager',
      empAvgRating: 7.07,
      manager1Name: 'Sunny Manesh Kumar Eagala',
      cycleStartDate: 'May 2017',
    },
    {
      id: 216,
      empId: 1000,
      employeeName: 'Admin Rbt',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer1',
      empAvgRating: 9.73,
      manager1Name: 'Ajay Gupta',
      cycleStartDate: 'May 2017',
    },
    {
      id: 218,
      empId: 1595,
      employeeName: 'Elizabeth Arland',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 6.15,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Administrative',
      empDesignationName: 'Front Office Executive',
      empAvgRating: 7.1,
      manager1Name: 'Roopaly Ganguly1',
      cycleStartDate: 'May 2017',
    },
    {
      id: 219,
      empId: 1747,
      employeeName: 'Jyothi Dondapati',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 6.13,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer2',
      empAvgRating: 9.0,
      manager1Name: 'Prasadarao Bhiri',
      cycleStartDate: 'May 2017',
    },
    {
      id: 228,
      empId: 1756,
      employeeName: 'Gaurav Yadav',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Rajesh Yellamanchali',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer3',
      empAvgRating: 8.88,
      manager1Name: 'Rajesh Yellamanchali',
      cycleStartDate: 'May 2017',
    },
    {
      id: 231,
      empId: 1753,
      employeeName: 'Naresh Ede',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Roopaly Ganguly2',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer4',
      empAvgRating: 9.13,
      manager1Name: 'Roopaly Ganguly3',
      cycleStartDate: 'May 2017',
    },
    {
      id: 233,
      empId: 1502,
      employeeName: 'Venubabu Sunkara',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 8.06,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Senior Software Engineer',
      empAvgRating: 8.79,
      manager1Name: 'Shrikant Mishra1',
      cycleStartDate: 'May 2017',
    },
    {
      id: 239,
      empId: 1468,
      employeeName: 'Vijaya Relangi',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 7.73,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Software Engineer',
      empAvgRating: 8.96,
      manager1Name: 'Shrikant Mishra',
      cycleStartDate: 'May 2017',
    },
    {
      id: 243,
      empId: 1748,
      employeeName: 'Satish Manepalli',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Roopaly Ganguly5',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer5',
      empAvgRating: 9.25,
      manager1Name: 'Roopaly Ganguly5',
      cycleStartDate: 'May 2017',
    },
    {
      id: 247,
      empId: 1419,
      employeeName: 'Pavan Kumbhar',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 8.69,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Software Engineer',
      empAvgRating: 9.5,
      manager1Name: 'Sunil Kumar Rangu',
      cycleStartDate: 'May 2017',
    },
    {
      id: 259,
      empId: 1708,
      employeeName: 'Suresh Sirangi',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 6.5,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Testing',
      empDesignationName: 'Software Test Engineer',
      empAvgRating: 9.0,
      manager1Name: 'Rama Krishna Tirumala',
      cycleStartDate: 'May 2017',
    },
    {
      id: 261,
      empId: 1738,
      employeeName: 'Mamatha Malineni',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Roopaly Ganguly',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer7',
      empAvgRating: 8.88,
      manager1Name: 'Roopaly Ganguly',
      cycleStartDate: 'May 2017',
    },
    {
      id: 262,
      empId: 1561,
      employeeName: 'Sanjeeth Nallavelli',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Ajay Ray',
      empDepartmentName: 'Sales',
      empDesignationName: 'SEO Analyst',
      empAvgRating: 7.8,
      manager1Name: 'Ajay Ray',
      cycleStartDate: 'May 2017',
    },
    {
      id: 267,
      empId: 1456,
      employeeName: 'Thirupathi Chindam',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 7.81,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Testing',
      empDesignationName: 'Module Lead',
      empAvgRating: 8.0,
      manager1Name: 'Sujan Thota',
      cycleStartDate: 'May 2017',
    },
    {
      id: 268,
      empId: 1739,
      employeeName: 'Shilpi Vishwakarma',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Rajesh Yellamanchali',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer',
      empAvgRating: 7.88,
      manager1Name: 'Rajesh Yellamanchali',
      cycleStartDate: 'May 2017',
    },
    {
      id: 290,
      empId: 1743,
      employeeName: 'Rajesh Dhanalakota',
      formStatus: 'SUBMIT',
      formStatusvalue: 1,
      appraisalFormStatus: null,
      overallAvgRating: 'NaN',
      finalRating: null,
      pendingWith: 'ding with Roopaly Ganguly',
      empDepartmentName: 'Development',
      empDesignationName: 'Associate Software Engineer',
      empAvgRating: 8.5,
      manager1Name: 'Roopaly Ganguly',
      cycleStartDate: 'May 2017',
    },
    {
      id: 293,
      empId: 1646,
      employeeName: 'Sarvani Josyam',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 8.11,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Project Manager',
      empAvgRating: 9.44,
      manager1Name: 'Ravi Pachipala',
      cycleStartDate: 'May 2017',
    },
    {
      id: 295,
      empId: 1259,
      employeeName: 'Naveen Kunchakuri',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 7.71,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Module Lead',
      empAvgRating: 7.96,
      manager1Name: 'Ravi Pachipala',
      cycleStartDate: 'May 2017',
    },
    {
      id: 296,
      empId: 1772,
      employeeName: 'Vasavi Nukarapu',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 8.0,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Designing',
      empDesignationName: 'Associate Usability Engineer',
      empAvgRating: 8.13,
      manager1Name: 'Srinivas Suppala',
      cycleStartDate: 'May 2017',
    },
    {
      id: 310,
      empId: 1605,
      employeeName: 'Naga Sudheer Dunaboyana',
      formStatus: 'COMPLETED',
      formStatusvalue: 5,
      appraisalFormStatus: null,
      overallAvgRating: 8.19,
      finalRating: null,
      pendingWith: '',
      empDepartmentName: 'Development',
      empDesignationName: 'Senior Software Engineer',
      empAvgRating: 9.42,
      manager1Name: 'Shrikant Mishra',
      cycleStartDate: 'May 2017',
    },
  ],
}

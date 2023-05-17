/* eslint-disable sonarjs/no-duplicate-string */
import {
  Cycle,
  EditITDeclarationEmployeeDetails,
  ITDeclarationFormListResponse,
} from '../../types/Finance/ITDeclarationList/itDeclarationListTypes'

export const mockInvestmentCycles: Cycle[] = [
  {
    cycleId: 1,
    cycleName: 'FY 2017-2018',
    startDate: '04/2017',
    endDate: '03/2018',
    active: false,
  },
  {
    cycleId: 2,
    cycleName: 'FY 2018-2019',
    startDate: '04/2018',
    endDate: '03/2019',
    active: false,
  },
  {
    cycleId: 3,
    cycleName: 'For the F.Y 2018-19',
    startDate: '04/2018',
    endDate: '03/2019',
    active: true,
  },
  {
    cycleId: 6,
    cycleName: 'Test',
    startDate: '07/2019',
    endDate: '06/2020',
    active: false,
  },
]

export const mockUpdateITFormEmployeeInformation: EditITDeclarationEmployeeDetails =
  {
    employeeId: 2050,
    fullName: 'Testing Hello',
    pan: 'EIFE2323',
    designation: 'Associate Software Engineer',
    activeCyle: '06/05/2023',
    joinDate: '07/05/2023',
  }

export const mockDeclarationList: ITDeclarationFormListResponse = {
  itforms: [
    {
      itDeclarationFormId: 98,
      employeeId: 1880,
      employeeName: 'Vishnukanth Tadepallii',
      panNumber: 'AFCPT6715Q',
      designation: 'Associate Project Managerr',
      formSectionsDTOs: [
        {
          itSectionsId: 360,
          sectionId: 3,
          sectionName: '80 D',
          isOld: true,
          maxLimit: 60000,
          formInvestmentDTO: [
            {
              formInvestmentId: 526,
              investmentId: 12,
              investmentName: 'Medical Insurancee',
              customAmount: 20000,
            },
          ],
        },
        {
          itSectionsId: 251,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 367,
              investmentId: 14,
              investmentName: 'Interest on Home Loann',
              customAmount: 98004,
            },
          ],
        },
        {
          itSectionsId: 250,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 366,
              investmentId: 19,
              investmentName: 'House Rent Paid to Landlord',
              customAmount: 96000,
            },
          ],
        },
        {
          itSectionsId: 249,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 368,
              investmentId: 5,
              investmentName: 'Principal repayment of Home Loann',
              customAmount: 50000,
            },
            {
              formInvestmentId: 365,
              investmentId: 17,
              investmentName: 'Unit Linked Insurance Policy (ULIP)',
              customAmount: 100000,
            },
          ],
        },
        {
          itSectionsId: 900,
          sectionId: 10,
          sectionName: '10 exemptionA',
          isOld: false,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 526,
              investmentId: 16,
              investmentName: 'House rent',
              customAmount: 1000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 365004,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 99,
      employeeId: 1697,
      employeeName: 'Dharmendra Kumar Singh',
      panNumber: 'AVRPK3565E',
      designation: 'Associate Architect',
      formSectionsDTOs: [
        {
          itSectionsId: 252,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 369,
              investmentId: 14,
              investmentName: 'Interest on Home LoanTest',
              customAmount: 200000,
            },
          ],
        },
        {
          itSectionsId: 253,
          sectionId: 10,
          sectionName: '10 exemptionTest',
          isOld: false,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 371,
              investmentId: 16,
              investmentName: 'House rentTest',
              customAmount: 12000,
            },
            {
              formInvestmentId: 370,
              investmentId: 15,
              investmentName: 'Medical BillsTest',
              customAmount: 15000,
            },
          ],
        },
        {
          itSectionsId: 254,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 373,
              investmentId: 5,
              investmentName: 'Principal repayment of Home LoanTestA',
              customAmount: 50000,
            },
            {
              formInvestmentId: 372,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 100000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 377000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 100,
      employeeId: 1409,
      employeeName: 'Ashish Kashyap',
      panNumber: 'DZQPK9439H',
      designation: 'Module LeadTest',
      formSectionsDTOs: [
        {
          itSectionsId: 255,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 374,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 150000,
            },
          ],
        },
        {
          itSectionsId: 256,
          sectionId: 10,
          sectionName: '10 exemptionA',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 375,
              investmentId: 16,
              investmentName: 'House rent',
              customAmount: 96000,
            },
            {
              formInvestmentId: 376,
              investmentId: 15,
              investmentName: 'Medical Bills',
              customAmount: 15000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 261000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 101,
      employeeId: 1419,
      employeeName: 'Pavan Kumbhar',
      panNumber: 'DCWPK0025E',
      designation: 'Module Lead TestA',
      formSectionsDTOs: [
        {
          itSectionsId: 257,
          sectionId: 10,
          sectionName: '10 exemptionTestC',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 378,
              investmentId: 16,
              investmentName: 'House rentTestD',
              customAmount: 99600,
            },
            {
              formInvestmentId: 377,
              investmentId: 15,
              investmentName: 'Medical BillsTestE',
              customAmount: 15000,
            },
          ],
        },
        {
          itSectionsId: 258,
          sectionId: 10,
          sectionName: '10 exemptionTestF',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 379,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 150000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 264600,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 102,
      employeeId: 1889,
      employeeName: 'Sravan Bachu',
      panNumber: 'AJOPB1100B',
      designation: 'Module Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 260,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 382,
              investmentId: 5,
              investmentName: 'Principal repayment of Home LoanTestB',
              customAmount: 150000,
            },
          ],
        },
        {
          itSectionsId: 264,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 387,
              investmentId: 14,
              investmentName: 'Interest on Home LoanTestC',
              customAmount: 166000,
            },
          ],
        },
      ],
      organisationName: 'CTE',
      fromDate: '01/04/2018',
      toDate: '01/06/2018',
      isAgree: null,
      grandTotal: 316000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 103,
      employeeId: 1417,
      employeeName: 'Sultan Ahmed',
      panNumber: 'BJFPM8481A',
      designation: 'Module Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 266,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 390,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 150000,
            },
          ],
        },
        {
          itSectionsId: 265,
          sectionId: 10,
          sectionName: '10 exemptionTestG',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 389,
              investmentId: 16,
              investmentName: 'House rentTestH',
              customAmount: 132000,
            },
            {
              formInvestmentId: 388,
              investmentId: 15,
              investmentName: 'Medical BillsTestI',
              customAmount: 15000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 297000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 104,
      employeeId: 1132,
      employeeName: 'Prasadarao Bhiri',
      panNumber: 'ANUPR8221P',
      designation: 'Project Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 270,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 397,
              investmentId: 14,
              investmentName: 'Interest on Home LoanTestD',
              customAmount: 197054,
            },
          ],
        },
        {
          itSectionsId: 269,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 393,
              investmentId: 7,
              investmentName: 'Sukanya Samriddhi Account Deposit Scheme',
              customAmount: 36000,
            },
            {
              formInvestmentId: 394,
              investmentId: 2,
              investmentName: 'PPF (Public Provident Fund)',
              customAmount: 43200,
            },
            {
              formInvestmentId: 395,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 15000,
            },
            {
              formInvestmentId: 396,
              investmentId: 5,
              investmentName: 'Principal repayment of Home Loan',
              customAmount: 75000,
            },
          ],
        },
        {
          itSectionsId: 267,
          sectionId: 3,
          sectionName: '80 D',
          isOld: true,
          maxLimit: 60000,
          formInvestmentDTO: [
            {
              formInvestmentId: 391,
              investmentId: 12,
              investmentName: 'Medical InsuranceTestE',
              customAmount: 4560,
            },
          ],
        },
        {
          itSectionsId: 268,
          sectionId: 10,
          sectionName: '10 exemptionTestJ',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 392,
              investmentId: 15,
              investmentName: 'Medical BillsTestK',
              customAmount: 15000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 385814,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 105,
      employeeId: 1259,
      employeeName: 'Naveen Kunchakuri',
      panNumber: 'BYJPK3015M',
      designation: 'Project Manager',
      formSectionsDTOs: [
        {
          itSectionsId: 273,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 401,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 30803,
            },
            {
              formInvestmentId: 402,
              investmentId: 17,
              investmentName: 'Unit Linked Insurance Policy (ULIP)',
              customAmount: 35000,
            },
          ],
        },
        {
          itSectionsId: 274,
          sectionId: 10,
          sectionName: '10 exemptionTestL',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 403,
              investmentId: 15,
              investmentName: 'Medical BillsTestM',
              customAmount: 15000,
            },
          ],
        },
        {
          itSectionsId: 272,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 399,
              investmentId: 19,
              investmentName: 'House Rent Paid to LandlordTestF',
              customAmount: 99600,
            },
          ],
        },
        {
          itSectionsId: 271,
          sectionId: 3,
          sectionName: '80 D',
          isOld: true,
          maxLimit: 60000,
          formInvestmentDTO: [
            {
              formInvestmentId: 398,
              investmentId: 12,
              investmentName: 'Medical Insurance',
              customAmount: 13123,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 193526,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 106,
      employeeId: 1887,
      employeeName: 'Haseeb Ahmed',
      panNumber: 'AHHPA5625K',
      designation: 'Technical Manager',
      formSectionsDTOs: [
        {
          itSectionsId: 275,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 404,
              investmentId: 7,
              investmentName: 'Sukanya Samriddhi Account Deposit Scheme',
              customAmount: 150000,
            },
          ],
        },
      ],
      organisationName: 'Capgemini',
      fromDate: '01/04/2018',
      toDate: '21/05/2018',
      isAgree: null,
      grandTotal: 150000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 107,
      employeeId: 1673,
      employeeName: 'Rajesh Ponyaboina',
      panNumber: 'BPYPP2053L',
      designation: 'Team Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 278,
          sectionId: 10,
          sectionName: '10 exemptionTestM',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 409,
              investmentId: 15,
              investmentName: 'Medical BillsTestN',
              customAmount: 15000,
            },
            {
              formInvestmentId: 408,
              investmentId: 16,
              investmentName: 'House rent',
              customAmount: 240000,
            },
          ],
        },
        {
          itSectionsId: 276,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 406,
              investmentId: 5,
              investmentName: 'Principal repayment of Home Loan',
              customAmount: 128000,
            },
            {
              formInvestmentId: 405,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 109163,
            },
          ],
        },
        {
          itSectionsId: 277,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 407,
              investmentId: 14,
              investmentName: 'Interest on Home Loan',
              customAmount: 76000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 568163,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 108,
      employeeId: 1654,
      employeeName: 'Sai Ram Pamidi',
      panNumber: 'BCQPP9524F',
      designation: 'Senior Software Engineer',
      formSectionsDTOs: [
        {
          itSectionsId: 279,
          sectionId: 10,
          sectionName: '10 exemptionTestO',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 411,
              investmentId: 16,
              investmentName: 'House rent',
              customAmount: 98000,
            },
            {
              formInvestmentId: 410,
              investmentId: 15,
              investmentName: 'Medical BillsTestP',
              customAmount: 40000,
            },
          ],
        },
        {
          itSectionsId: 281,
          sectionId: 7,
          sectionName: '80 G',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 413,
              investmentId: 11,
              investmentName: 'Donations',
              customAmount: 2000,
            },
          ],
        },
        {
          itSectionsId: 280,
          sectionId: 10,
          sectionName: '10 exemptionTestQ',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 412,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 48000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 188000,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 109,
      employeeId: 1815,
      employeeName: 'Pankaj Errolla',
      panNumber: 'ABOPE0867G',
      designation: 'Senior Software Engineer',
      formSectionsDTOs: [
        {
          itSectionsId: 283,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 415,
              investmentId: 19,
              investmentName: 'House Rent Paid to LandlordTestF',
              customAmount: 99600,
            },
          ],
        },
        {
          itSectionsId: 318,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 459,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 65240,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 164840,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 110,
      employeeId: 1836,
      employeeName: 'Pavankumar Lanka',
      panNumber: 'AHQPL7935G',
      designation: 'Technical Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 284,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 416,
              investmentId: 19,
              investmentName: 'House Rent Paid to LandlordTestG',
              customAmount: 99999,
            },
          ],
        },
        {
          itSectionsId: 287,
          sectionId: 10,
          sectionName: '10 exemption',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 419,
              investmentId: 15,
              investmentName: 'Medical Bills',
              customAmount: 15000,
            },
          ],
        },
        {
          itSectionsId: 285,
          sectionId: 9,
          sectionName: '24',
          isOld: true,
          maxLimit: 200000,
          formInvestmentDTO: [
            {
              formInvestmentId: 417,
              investmentId: 14,
              investmentName: 'Interest on Home Loan',
              customAmount: 200000,
            },
          ],
        },
        {
          itSectionsId: 286,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 418,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 150000,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 464999,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 111,
      employeeId: 1456,
      employeeName: 'Thirupathi Chindam',
      panNumber: 'AQAPC4937A',
      designation: 'Team Lead',
      formSectionsDTOs: [
        {
          itSectionsId: 290,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 422,
              investmentId: 19,
              investmentName: 'House Rent Paid to Landlord',
              customAmount: 99600,
            },
          ],
        },
        {
          itSectionsId: 288,
          sectionId: 10,
          sectionName: '10 exemption',
          isOld: true,
          maxLimit: 15000,
          formInvestmentDTO: [
            {
              formInvestmentId: 420,
              investmentId: 15,
              investmentName: 'Medical Bills',
              customAmount: 15000,
            },
          ],
        },
        {
          itSectionsId: 289,
          sectionId: 1,
          sectionName: '80 C',
          isOld: true,
          maxLimit: 150000,
          formInvestmentDTO: [
            {
              formInvestmentId: 421,
              investmentId: 1,
              investmentName: 'LIC',
              customAmount: 61220,
            },
          ],
        },
        {
          itSectionsId: 291,
          sectionId: 3,
          sectionName: '80 D',
          isOld: true,
          maxLimit: 60000,
          formInvestmentDTO: [
            {
              formInvestmentId: 423,
              investmentId: 12,
              investmentName: 'Medical Insurance',
              customAmount: 4560,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 204160,
      filePath: null,
      cycleId: 2,
    },
    {
      itDeclarationFormId: 112,
      employeeId: 1714,
      employeeName: 'Mohsin Mohammed Khan',
      panNumber: 'DONPK0783N',
      designation: 'Senior Business Development Executive',
      formSectionsDTOs: [
        {
          itSectionsId: 382,
          sectionId: 11,
          sectionName: '10',
          isOld: true,
          maxLimit: 100000,
          formInvestmentDTO: [
            {
              formInvestmentId: 551,
              investmentId: 19,
              investmentName: 'House Rent Paid to Landlord',
              customAmount: 99600,
            },
          ],
        },
      ],
      organisationName: '',
      fromDate: 'n/a',
      toDate: 'n/a',
      isAgree: null,
      grandTotal: 99600,
      filePath: null,
      cycleId: 2,
    },
  ],
  itformlistsize: 15,
}

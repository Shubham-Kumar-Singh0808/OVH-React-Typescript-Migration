/* eslint-disable sonarjs/no-duplicate-string */
import {
  AddSubCategoryDetails,
  Category,
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryList,
  TicketHistoryResponse,
} from '../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

export const mockTicketHistoryData: TicketHistoryResponse = {
  size: 4,
  list: [
    {
      id: 1,
      ticketsSubCategoryName: 'hagsda',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'oldSubCategorytest1',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '30-Sep-2016 10:24:46 AM',
      modifiedBy: 'Dinesh Kota',
      persistType: 'UPDATED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'testSubCategory1',
      estimatedTime: '2:00',
      workFlow: 'true',
      oldsubCategoryName: null,
      oldestimatedTime: '1:00',
      oldworkFlow: 'false',
      approvedByManager: null,
      levelOfHierarchy: '1',
      oldlevelOfHierarchy: '1',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
    {
      id: 2,
      ticketsSubCategoryName: 'dasdac',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'oldSubCategorytest2',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '27-Sep-2016 12:16:59 PM',
      modifiedBy: 'Dinesh K',
      persistType: 'REJECTED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'testSubCategory2',
      estimatedTime: '3.00',
      workFlow: 'false',
      oldsubCategoryName: null,
      oldestimatedTime: '3',
      oldworkFlow: 'true',
      approvedByManager: null,
      levelOfHierarchy: '2',
      oldlevelOfHierarchy: '1',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
    {
      id: 3,
      ticketsSubCategoryName: 'sdjfk',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'oldSubCategoryNameTest3',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '16-Aug-2016 06:25:39 PM',
      modifiedBy: 'Naga Sudheer Kumar Jamjam',
      persistType: 'CREATED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'MS-Office',
      estimatedTime: '3.00',
      workFlow: '1',
      oldsubCategoryName: null,
      oldestimatedTime: '1.00',
      oldworkFlow: '2',
      approvedByManager: null,
      levelOfHierarchy: '1',
      oldlevelOfHierarchy: '2',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
    {
      id: 4,
      ticketsSubCategoryName: 'wueas',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'oldSubCategoryytest4',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '16-Aug-2017 01:58:25 PM',
      modifiedBy: 'Naga Sudheer Kumarr Jamdfjam',
      persistType: 'CREATED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'oldSubCategoryNametest4',
      estimatedTime: '3',
      workFlow: true,
      oldsubCategoryName: null,
      oldestimatedTime: '3.00',
      oldworkFlow: '2.00',
      approvedByManager: null,
      levelOfHierarchy: '1',
      oldlevelOfHierarchy: '2',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
  ],
}

export const mockDepartments: TicketConfigurationDepartments[] = [
  {
    id: 1,
    name: 'Networking',
  },
  {
    id: 2,
    name: 'Administrative',
  },
  {
    id: 3,
    name: 'HR',
  },
  {
    id: 4,
    name: 'Accounts',
  },
]

export const mockTicketConfigurationCategory: TicketConfigurationCategories[] =
  [
    {
      categoryId: 4,
      categoryName: 'Stationary',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 7,
      categoryName: 'Cleaning',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 8,
      categoryName: 'Electricall',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 11,
      categoryName: 'Accessoriess',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 12,
      categoryName: 'Otherss',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 13,
      categoryName: 'Plumbingg',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 14,
      categoryName: 'Civil Work',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 15,
      categoryName: 'Painting Workk',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 16,
      categoryName: 'House Keepingg',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 17,
      categoryName: 'Carpenter Workk',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 18,
      categoryName: 'Wash Roomm',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 19,
      categoryName: 'Chairss',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 20,
      categoryName: 'Electronics',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 25,
      categoryName: 'Admin',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 26,
      categoryName: 'Admin',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 33,
      categoryName: 'sim',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
    {
      categoryId: 35,
      categoryName: 'Testdd',
      departmentId: 2,
      departmentName: 'Administrative',
      mealType: false,
    },
  ]

export const mockTicketConfigurationSubCategory: TicketConfigurationSubCategories[] =
  [
    {
      subCategoryId: 45,
      subCategoryName: 'Mobile',
      estimatedTime: '0.00',
      workFlow: false,
      categoryId: 11,
      categoryName: 'Accessories',
      departmentName: 'Administrative',
      departmentId: 2,
      levelOfHierarchy: '1',
    },
    {
      subCategoryId: 46,
      subCategoryName: 'SIM',
      estimatedTime: '0.00',
      workFlow: false,
      categoryId: 11,
      categoryName: 'Accessories',
      departmentName: 'Administrative',
      departmentId: 2,
      levelOfHierarchy: '0',
    },
    {
      subCategoryId: 68,
      subCategoryName: 'Android Cable',
      estimatedTime: '0.00',
      workFlow: true,
      categoryId: 11,
      categoryName: 'Accessories',
      departmentName: 'Administrative',
      departmentId: 2,
      levelOfHierarchy: '2',
    },
  ]

export const mockTicketConfigurationSubCategoryList: TicketConfigurationSubCategoryList =
  {
    size: 11,
    list: [
      {
        subCategoryId: 111,
        subCategoryName: 'testing keyboard',
        estimatedTime: '4.00',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '1',
      },
      {
        subCategoryId: 89,
        subCategoryName: 'testing keyboard2',
        estimatedTime: '1.00',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '1',
      },
      {
        subCategoryId: 29,
        subCategoryName: 'Charger',
        estimatedTime: '5',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '1',
      },
      {
        subCategoryId: 28,
        subCategoryName: 'Laptop',
        estimatedTime: '8.00',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '1',
      },
      {
        subCategoryId: 26,
        subCategoryName: 'LAN Cable',
        estimatedTime: '2',
        workFlow: false,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '0',
      },
      {
        subCategoryId: 25,
        subCategoryName: 'Internet',
        estimatedTime: '0.03',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '1',
      },
      {
        subCategoryId: 24,
        subCategoryName: 'Desktop',
        estimatedTime: '6',
        workFlow: false,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '0',
      },
      {
        subCategoryId: 23,
        subCategoryName: 'Monitor',
        estimatedTime: '1',
        workFlow: false,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '0',
      },
      {
        subCategoryId: 11,
        subCategoryName: 'Keyboard',
        estimatedTime: '2.00',
        workFlow: false,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: 1,
      },
      {
        subCategoryId: 10,
        subCategoryName: 'Mouse',
        estimatedTime: '2.00',
        workFlow: false,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: 1,
      },
      {
        subCategoryId: 9,
        subCategoryName: 'Headphones',
        estimatedTime: '5.00',
        workFlow: true,
        categoryId: 5,
        categoryName: 'Hardware',
        departmentName: 'Networking',
        departmentId: 1,
        levelOfHierarchy: '0',
      },
    ],
  }

export const mockTicketHistory: TicketHistoryResponse = {
  size: 2,
  list: [
    {
      id: 5,
      ticketsSubCategoryName: 'sjdfw',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'test1234',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '20-Jun-2021 03:48:59 PM',
      modifiedBy: 'Chavali Krirewrwerwshna',
      persistType: 'CREATED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'dfreterjh',
      estimatedTime: '1.00',
      workFlow: true,
      oldsubCategoryName: null,
      oldestimatedTime: '1.00',
      oldworkFlow: 'true',
      approvedByManager: null,
      levelOfHierarchy: '2',
      oldlevelOfHierarchy: '1',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
    {
      id: 6,
      ticketsSubCategoryName: 'weaas',
      subject: null,
      description: null,
      status: null,
      priority: null,
      startDate: null,
      endDate: null,
      assignee: null,
      percentageDone: null,
      actualTime: null,
      documentsPath: null,
      approvalStatus: null,
      oldticketsSubCategoryName: 'test234',
      oldsubject: null,
      olddescription: null,
      oldstatus: null,
      oldpriority: null,
      oldstartDate: null,
      oldendDate: null,
      oldassignee: null,
      oldpercentageDone: null,
      oldactualTime: null,
      olddocumentsPath: null,
      oldapprovalStatus: null,
      modifiedDate: '17-Feb-2018 11:47:46 AM',
      modifiedBy: 'Ranganayaaskulu Lingaastla',
      persistType: 'CREATED',
      columnName: null,
      additionalInfo: null,
      subCategoryName: 'TV',
      estimatedTime: '2.00',
      workFlow: true,
      oldsubCategoryName: null,
      oldestimatedTime: 'saasdds',
      oldworkFlow: 'dsfasa',
      approvedByManager: null,
      levelOfHierarchy: 'easdsd',
      oldlevelOfHierarchy: 'wsdaqe',
      tracker: null,
      oldtracker: null,
      accessStartDate: null,
      oldAccessStartDate: null,
      accessEndDate: null,
      oldapprovedByManager: null,
      oldAccessEndDate: null,
    },
  ],
}

export const mockAddSubCategory: AddSubCategoryDetails = {
  categoryId: '11',
  departmentId: '2',
  estimatedTime: '1.00',
  levelOfHierarchy: 1,
  subCategoryName: 'Pencil',
  workFlow: true,
}

export const mockCategoryList: Category[] = [
  {
    categoryId: 62,
    categoryName: 'hrte',
    departmentId: 3,
    departmentName: 'HR',
    mealType: false,
  },
  {
    categoryId: 61,
    categoryName: 'hrtestd',
    departmentId: 3,
    departmentName: 'HR',
    mealType: false,
  },
  {
    categoryId: 51,
    categoryName: 'asda',
    departmentId: 4,
    departmentName: 'Accounts',
    mealType: true,
  },
  {
    categoryId: 50,
    categoryName: 'hrY',
    departmentId: 3,
    departmentName: 'HR',
    mealType: false,
  },
  {
    categoryId: 49,
    categoryName: 'HRTEstc',
    departmentId: 3,
    departmentName: 'HR',
    mealType: false,
  },
  {
    categoryId: 46,
    categoryName: 'lunch',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: true,
  },
  {
    categoryId: 43,
    categoryName: 'Forms',
    departmentId: 4,
    departmentName: 'Accounts',
    mealType: true,
  },
  {
    categoryId: 42,
    categoryName: 'food',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: true,
  },
  {
    categoryId: 38,
    categoryName: 'testing',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 36,
    categoryName: 'Testdd',
    departmentId: 4,
    departmentName: 'Accounts',
    mealType: false,
  },
  {
    categoryId: 35,
    categoryName: 'Testdd',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 33,
    categoryName: 'sim',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 31,
    categoryName: 'Process',
    departmentId: 4,
    departmentName: 'Accounts',
    mealType: false,
  },
  {
    categoryId: 26,
    categoryName: 'Admin',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 25,
    categoryName: 'Admin',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 20,
    categoryName: 'Electronics',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 19,
    categoryName: 'Chairs',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 18,
    categoryName: 'Wash Room',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 17,
    categoryName: 'Carpenter Work',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 16,
    categoryName: 'House Keeping',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 15,
    categoryName: 'Painting Work',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 14,
    categoryName: 'Civil Work',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 13,
    categoryName: 'Plumbing',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 12,
    categoryName: 'Others',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 11,
    categoryName: 'Accessories',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 10,
    categoryName: 'Others',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
  {
    categoryId: 9,
    categoryName: 'Access',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
  {
    categoryId: 8,
    categoryName: 'ElectricaL',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 7,
    categoryName: 'Cleaning',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 6,
    categoryName: 'Software',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
  {
    categoryId: 5,
    categoryName: 'Hardware',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
  {
    categoryId: 4,
    categoryName: 'Stationary',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
]

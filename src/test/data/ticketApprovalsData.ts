/* eslint-disable sonarjs/no-duplicate-string */
import {
  DepartmentCategoryList,
  DepartmentList,
  GetAllTicketsForApprovalResponse,
  SubCategoryList,
  TrackerList,
} from '../../types/Support/TicketApprovals/ticketApprovalsTypes'

export const mockDepartmentNamesList: DepartmentList[] = [
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

export const mockTrackerList: TrackerList[] = [
  {
    id: 1,
    name: 'Issue',
    permission: false,
  },
  {
    id: 2,
    name: 'New Request',
    permission: true,
  },
  {
    id: 16,
    name: 'Testing',
    permission: true,
  },
  {
    id: 27,
    name: 'test22',
    permission: true,
  },
  {
    id: 30,
    name: 'testing12',
    permission: false,
  },
]

export const mockAllLookUps: DepartmentCategoryList[] = [
  {
    categoryId: 1,
    categoryName: 'Travel',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 2,
    categoryName: 'Food',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: true,
  },
  {
    categoryId: 3,
    categoryName: 'Hotel',
    departmentId: 2,
    departmentName: 'Administrative',
    mealType: false,
  },
  {
    categoryId: 4,
    categoryName: 'Stationary',
    departmentId: 2,
    departmentName: 'Administrative',
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
    categoryId: 6,
    categoryName: 'Software',
    departmentId: 1,
    departmentName: 'Networking',
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
    categoryName: 'Electrical',
    departmentId: 2,
    departmentName: 'Administrative',
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
    categoryId: 10,
    categoryName: 'Others',
    departmentId: 1,
    departmentName: 'Networking',
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
    categoryId: 12,
    categoryName: 'Others',
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
    categoryId: 14,
    categoryName: 'Civil Work',
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
    categoryId: 16,
    categoryName: 'House Keeping',
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
]

export const mockCategoryList: DepartmentCategoryList[] = [
  {
    categoryId: 5,
    categoryName: 'Hardware',
    departmentId: 1,
    departmentName: 'Networking',
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
    categoryId: 9,
    categoryName: 'Access',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
  {
    categoryId: 10,
    categoryName: 'Others',
    departmentId: 1,
    departmentName: 'Networking',
    mealType: false,
  },
]

export const mockSubCategoryList: SubCategoryList[] = [
  {
    subCategoryId: 41,
    subCategoryName: 'Social Media Network',
    estimatedTime: '5.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '2',
  },
  {
    subCategoryId: 42,
    subCategoryName: 'Streaming Sites',
    estimatedTime: '2.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
  {
    subCategoryId: 43,
    subCategoryName: 'Social and Streaming',
    estimatedTime: '2.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
  {
    subCategoryId: 56,
    subCategoryName: 'Create new Git Repository',
    estimatedTime: '1.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
  {
    subCategoryId: 73,
    subCategoryName: 'Password Reset',
    estimatedTime: '1.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
  {
    subCategoryId: 74,
    subCategoryName: 'VPN  Access',
    estimatedTime: '1.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
  {
    subCategoryId: 75,
    subCategoryName: 'Others',
    estimatedTime: '0.00',
    workFlow: false,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: null,
  },
  {
    subCategoryId: 76,
    subCategoryName: 'Skype',
    estimatedTime: '2.00',
    workFlow: true,
    categoryId: 9,
    categoryName: 'Access',
    departmentName: 'Networking',
    departmentId: 1,
    levelOfHierarchy: '1',
  },
]

export const mockAllTicketApprovals: GetAllTicketsForApprovalResponse = {
  size: 25,
  list: [
    {
      id: 19105,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 41,
      subCategoryName: 'Social Media Network',
      subject: 'Test',
      description: 'Test',
      status: 'New',
      priority: 'Urgent',
      startDate: '01/09/2022',
      endDate: '',
      assigneeId: null,
      employeeName: 'Sunny Manesh Kumar Eagala',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Sunny Manesh Kumar Eagala',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '5.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '28/09/2022',
      accessEndDate: '30/09/2022',
      createdDate: '01/09/2022 (09:45)',
      approvedBy: 'N/A',
    },
    {
      id: 19100,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 56,
      subCategoryName: 'Create new Git Repository',
      subject: 'Git',
      description: null,
      status: 'Closed',
      priority: 'Normal',
      startDate: '01/09/2022',
      endDate: '01/09/2022',
      assigneeId: 1991,
      employeeName: 'Sunny Manesh Kumar Eagala',
      percentageDone: 100,
      actualTime: '1',
      authorName: 'Sunny Manesh Kumar Eagala',
      assigneeName: 'Itadmin A',
      approvalStatus: 'N/A',
      filePath:
        'Thu Sep 01 21:25:27 IST 2022_1910096745632-3493-4935-8b5e-ff941cb30b6f.png',
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '01/09/2022',
      accessEndDate: '22/09/2022',
      createdDate: '01/09/2022 (09:00)',
      approvedBy: 'N/A',
    },
    {
      id: 19099,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 56,
      subCategoryName: 'Create new Git Repository',
      subject: 'Git Access',
      description: 'Need Git Access',
      status: 'Closed',
      priority: 'Urgent',
      startDate: '01/09/2022',
      endDate: '01/09/2022',
      assigneeId: 1991,
      employeeName: 'Sunny Manesh Kumar Eagala',
      percentageDone: 100,
      actualTime: '6.3',
      authorName: 'Sunny Manesh Kumar Eagala',
      assigneeName: 'Itadmin A',
      approvalStatus: 'Approved',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '01/09/2022',
      accessEndDate: '03/09/2022',
      createdDate: '01/09/2022 (08:45)',
      approvedBy: 'Manager M',
    },
    {
      id: 19096,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 56,
      subCategoryName: 'Create new Git Repository',
      subject: 'TEsting',
      description: null,
      status: 'New',
      priority: 'Normal',
      startDate: '29/08/2022',
      endDate: '',
      assigneeId: null,
      employeeName: 'Admin Rbt',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Admin Rbt',
      assigneeName: null,
      approvalStatus: 'Cancelled',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '29/08/2022',
      accessEndDate: '30/08/2022',
      createdDate: '29/08/2022 (12:46)',
      approvedBy: 'N/A',
    },
    {
      id: 19093,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 56,
      subCategoryName: 'Create new Git Repository',
      subject: 'tset',
      description: 'tsdds',
      status: 'In Progress',
      priority: 'Immediate',
      startDate: '26/08/2022',
      endDate: '',
      assigneeId: 1862,
      employeeName: 'Admin Rbt',
      percentageDone: 40,
      actualTime: '1.3',
      authorName: 'Admin Rbt',
      assigneeName: 'Sai Surendra Iyya',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '26/08/2022',
      accessEndDate: '27/08/2022',
      createdDate: '26/08/2022 (11:44)',
      approvedBy: 'N/A',
    },
    {
      id: 19087,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 41,
      subCategoryName: 'Social Media Network',
      subject: 'Need Access of YouTube',
      description: 'Need Access of YouTube',
      status: 'New',
      priority: 'High',
      startDate: '14/08/2022',
      endDate: '',
      assigneeId: null,
      employeeName: 'Sunny Manesh Kumar Eagala',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Sunny Manesh Kumar Eagala',
      assigneeName: null,
      approvalStatus: 'Rejected',
      filePath: null,
      estimatedTime: '5.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '14/08/2022',
      accessEndDate: '16/08/2022',
      createdDate: '14/08/2022 (02:31)',
      approvedBy: 'Manager M',
    },
    {
      id: 19085,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 56,
      subCategoryName: 'Create new Git Repository',
      subject: 'Hi',
      description: 'HI',
      status: 'New',
      priority: 'High',
      startDate: '14/08/2022',
      endDate: '',
      assigneeId: null,
      employeeName: 'Mamatha Thunam',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Mamatha Thunam',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '14/08/2022',
      accessEndDate: '14/08/2022',
      createdDate: '14/08/2022 (02:00)',
      approvedBy: 'N/A',
    },
    {
      id: 19053,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Database access Issue',
      description:
        '<span style="color: rgb(0, 0, 0);">We are unable to connect to database it </span><span style="color: rgb(0, 0, 0);">showing </span><span style="color: rgb(0, 0, 0);">like </span><span style="color: rgb(0, 0, 0);">the password of the account expired. P</span><span style="color: rgb(0, 0, 0);">lease check the screen shot.</span><div><span style="color: rgb(0, 0, 0);"><br/></span></div><div><span style="color: rgb(0, 0, 0);"><br/></span></div>',
      status: 'New',
      priority: 'Immediate',
      startDate: '10/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Pranjal Pohre',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Pranjal Pohre',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath:
        'Fri May 10 10:58:31 EDT 2019_19053e37d9fa6-30f8-4933-a023-4f9cd7e7bd47.docx',
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '10/05/2019',
      accessEndDate: '10/05/2019',
      createdDate: '10/05/2019 (10:58)',
      approvedBy: 'N/A',
    },
    {
      id: 19052,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Unable to upload files in filezilla',
      description: 'HI,<div>I am Unable to upload files in filezilla.</div>',
      status: 'New',
      priority: 'Immediate',
      startDate: '10/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Mamtha Adepu',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Mamtha Adepu',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '10/05/2019',
      accessEndDate: '10/05/2019',
      createdDate: '10/05/2019 (10:37)',
      approvedBy: 'N/A',
    },
    {
      id: 19044,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 74,
      subCategoryName: 'VPN  Access',
      subject: 'I am unable to connect to VPN provided by client',
      description: 'fixed ',
      status: 'Fixed',
      priority: 'Urgent',
      startDate: '08/05/2019',
      endDate: '08/05/2019',
      assigneeId: 1861,
      employeeName: 'Suresh Sirangi',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Suresh Sirangi',
      assigneeName: 'Ramakanth Chippa',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '08/05/2019',
      accessEndDate: '08/05/2019',
      createdDate: '08/05/2019 (11:32)',
      approvedBy: 'N/A',
    },
    {
      id: 19042,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 74,
      subCategoryName: 'VPN  Access',
      subject: 'Unable to connect Cisco VPN',
      description: 'fixed ',
      status: 'Fixed',
      priority: 'Normal',
      startDate: '08/05/2019',
      endDate: '08/05/2019',
      assigneeId: 1861,
      employeeName: 'Shaik Abdul Raheman',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Shaik Abdul Raheman',
      assigneeName: 'Ramakanth Chippa',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '08/05/2019',
      accessEndDate: '08/05/2019',
      createdDate: '08/05/2019 (11:09)',
      approvedBy: 'N/A',
    },
    {
      id: 19041,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Outlook login issue',
      description: 'Unable to login to Outlook',
      status: 'New',
      priority: 'Immediate',
      startDate: '08/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Bhaskara Dhulipala',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Bhaskara Dhulipala',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '07/05/2019',
      accessEndDate: '07/05/2019',
      createdDate: '08/05/2019 (09:13)',
      approvedBy: 'Sarthak Samantara',
    },
    {
      id: 19039,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Need to restart OVH server',
      description: 'Need to restart OVH server',
      status: 'Fixed',
      priority: 'Normal',
      startDate: '06/05/2019',
      endDate: '06/05/2019',
      assigneeId: 1862,
      employeeName: 'Sowmya Mamidi',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Sowmya Mamidi',
      assigneeName: 'Sai Surendra Iyya',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '06/05/2019',
      accessEndDate: '06/05/2019',
      createdDate: '06/05/2019 (06:03)',
      approvedBy: 'Pradeep Namburu',
    },
    {
      id: 19038,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 74,
      subCategoryName: 'VPN  Access',
      subject: 'VPN Access',
      description:
        'Please install VPN in my laptop as I will need to access RBT servers from my client location during my onsite visit.',
      status: 'New',
      priority: 'High',
      startDate: '06/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Mahendra Pratap Mishra',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Mahendra Pratap Mishra',
      assigneeName: null,
      approvalStatus: 'Pending Approval',
      filePath: null,
      estimatedTime: '1.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '06/05/2019',
      accessEndDate: '08/05/2019',
      createdDate: '06/05/2019 (05:28)',
      approvedBy: 'Venkata Ananda  Chanapathi',
    },
    {
      id: 19034,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Unable to access the Raybiztech shared folder',
      description:
        'Hi,<div>I am Unable to access the Raybiztech shared folder.Please check on this issue ASAP.<br/></div>',
      status: 'Fixed',
      priority: 'Urgent',
      startDate: '06/05/2019',
      endDate: '06/05/2019',
      assigneeId: 1862,
      employeeName: 'Mamtha Adepu',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Mamtha Adepu',
      assigneeName: 'Sai Surendra Iyya',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '06/05/2019',
      accessEndDate: '06/05/2019',
      createdDate: '06/05/2019 (01:33)',
      approvedBy: 'N/A',
    },
    {
      id: 19033,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'GIT Path -git is not in the PATH',
      description:
        '<div>Good evening, </div>Please resolve the issue &#34;<a href="null">git is not in the PATH</a>&#34; which needs the admin access.',
      status: 'New',
      priority: 'Urgent',
      startDate: '03/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Mamtha Adepu',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Mamtha Adepu',
      assigneeName: null,
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '03/05/2019',
      accessEndDate: '06/05/2019',
      createdDate: '03/05/2019 (06:43)',
      approvedBy: 'Srinivas Suppala',
    },
    {
      id: 19001,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'Request to Provide admin access',
      description: 'we have provided the Admin Access for one month  ',
      status: 'Fixed',
      priority: 'Urgent',
      startDate: '02/05/2019',
      endDate: '02/05/2019',
      assigneeId: 1861,
      employeeName: 'Swapna Narayandas',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Swapna Narayandas',
      assigneeName: 'Ramakanth Chippa',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: null,
      accessEndDate: null,
      createdDate: '02/05/2019 (05:27)',
      approvedBy: 'Eugene Paden',
    },
    {
      id: 18997,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'No internet Access',
      description: 'No internet Access',
      status: 'Fixed',
      priority: 'Immediate',
      startDate: '01/05/2019',
      endDate: '01/05/2019',
      assigneeId: 1862,
      employeeName: 'Mamtha Adepu',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Mamtha Adepu',
      assigneeName: 'Sai Surendra Iyya',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '01/05/2019',
      accessEndDate: '01/05/2019',
      createdDate: '01/05/2019 (04:56)',
      approvedBy: 'N/A',
    },
    {
      id: 18996,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 76,
      subCategoryName: 'Skype',
      subject: 'Need Access for Skype',
      description: null,
      status: 'New',
      priority: 'Immediate',
      startDate: '01/05/2019',
      endDate: '',
      assigneeId: null,
      employeeName: 'Rama Guruvelli',
      percentageDone: 0,
      actualTime: '0.00',
      authorName: 'Rama Guruvelli',
      assigneeName: null,
      approvalStatus: 'Pending Approval',
      filePath: null,
      estimatedTime: '2.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 2,
      trackerName: 'New Request',
      accessStartDate: '01/05/2019',
      accessEndDate: '02/05/2019',
      createdDate: '01/05/2019 (02:03)',
      approvedBy: 'Mohan Kalagatla',
    },
    {
      id: 17014,
      departmentId: 1,
      departmentName: 'Networking',
      categoryId: 9,
      categoryName: 'Access',
      subCategoryId: 75,
      subCategoryName: 'Others',
      subject: 'need host files',
      description: null,
      status: 'Fixed',
      priority: 'Immediate',
      startDate: '18/08/2018',
      endDate: '20/08/2019',
      assigneeId: 1862,
      employeeName: 'Lakshmi Prasanna',
      percentageDone: 100,
      actualTime: '0.00',
      authorName: 'Lakshmi Prasanna',
      assigneeName: 'Sai Surendra Iyya',
      approvalStatus: 'N/A',
      filePath: null,
      estimatedTime: '0.00',
      watcherIds: null,
      watcherNames: [],
      disableApprove: true,
      disableCancel: false,
      tracker: 1,
      trackerName: 'Issue',
      accessStartDate: '18/08/2018',
      accessEndDate: '18/08/2018',
      createdDate: '18/08/2018 (04:00)',
      approvedBy: 'N/A',
    },
  ],
}

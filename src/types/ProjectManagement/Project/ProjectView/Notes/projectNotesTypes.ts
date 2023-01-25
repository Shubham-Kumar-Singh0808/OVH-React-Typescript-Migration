import { LoadingState } from '../../../../commonTypes'

export type ProjectNotesTimeLine = {
  id: string
  postedBy: {
    id: number
    firstName: string
    lastName: string
    middleName: string
    designation: string
    role: string
    manager: Manager
    designationKrasDTO: {
      id: number
      designationCode: string
      designationName: string
      comments: null
      krasWithWeitage: null
    }
    employeeSubmitted: null
    managerSubmitted: null
    acknowledged: null
    fullName: string
    profilePicPath: string
    thumbPicture: string
    profilePicGeneratedPath: null
    gender: string
    dob: null
    departmentName: string
    employmentTypeName: string
    jobTypeName: string
    imageData: null
    curentLocation: string
    baseLocation: string
    officialBirthday: string
    realBirthday: string
    maritalStatus: string
    emergencyContactName: null
    emergencyPhone: null
    emergencyRelationShip: string
    grade: null
    aboutMe: string
    homeNumber: null
    workNumber: null
    presentAddress: null
    presentCity: null
    presentZip: null
    presentLandMark: null
    permanentAddress: null
    permanentCity: null
    permanentZip: null
    permanentLandMark: null
    mobile: null
    homeCode: null
    workCode: null
    skillList: null
    userName: string
    alternativeMobile: null
    dateOfJoining: string
    informationList: null
    anniversary: null
    bankInformationList: null
    bioAttendanceDtoSet: null
    dates: null
    absentCount: number
    statusName: string
    emergencyContact: null
    relievingDate: null
    observationDTOList: null
    skypeId: string
    percent: null
    passportNumber: null
    passportExpDate: null
    passportIssuedPlace: null
    passportIssuedDate: null
    token: null
    underNoticeDate: null
    candidateId: null
    underNotice: null
    emailId: string
    empManager: string
    bloodgroup: string
    rbtCvPath: null
    rbtCvName: null
    timeSlotDTO: {
      id: number
      name: string
      startTimeHour: string
      startTimeMinutes: string
      endTimeHour: string
      endTimeMinutes: string
      graceTime: string
    }
    technology: string
    hrAssociate: null
    lateComingCount: null
    passportFrontPagePath: null
    passportBackPagePath: null
    passportFrontPage: null
    passportBackPage: null
    projectManager: null
    casualLeaveCount: number
    lopLeaveCount: number
    holidaysCount: number
    contractExists: false
    contractStartDate: null
    contractEndDate: null
    personalEmail: string
    experience: number
    companyExperience: number
    updatedExperience: number
    country: string
    workStatus: string
    comments: null
    vendorId: null
    vendorName: null
    countryCodeWork: null
    countryCodeMobile: null
    countryCodeHome: null
    countryCodeEmergency: null
    countryCodeAlternative: null
    address: null
  }
  post: string
  postDate: string
  postImageData: string
  feedPostCommentsList: []
  project: {
    id: number
    projectName: string
    managerId: number
    startdate: string
    enddate: string
    description: string
    status: string
    managerName: string
    count: null
    billable: false
    isAllocated: null
    employeeId: null
    health: null
    client: string
    type: string
    clientId: null
    projectStartdate: null
    projectEndDate: null
    requiredResources: null
    newClient: null
    requestedBy: null
    statuEditFlag: null
    technology: null
    address: null
    personName: null
    email: null
    country: null
    organization: null
    intrnalOrNot: false
    hiveProjectName: string
    cc: null
    bcc: null
    deliveryManager: null
    projectRequestId: null
    model: string
    checkListExist: null
    projectCode: null
    projectContactPerson: string
    projectContactEmail: string
    billingContactPerson: string
    billingContactPersonEmail: string
    projectRequestMilestoneDTO: null
    platform: string
    domain: string
    clientName: string
    hiveProjectFlag: false
    allocation: null
  }
  milestone: null
  invoiceId: null
}

export type ProjectNotesState = {
  projectNotesTimeLine: ProjectNotesTimeLine[]
  isLoading: LoadingState
}

export type Manager = {
  id: number
  firstName: string
  lastName: string
  middleName: string
  designation: string
  role: string
  manager: string
  designationKrasDTO: string
  employeeSubmitted: string
  managerSubmitted: string
  acknowledged: string
  fullName: string
  profilePicPath: string
  thumbPicture: string
  profilePicGeneratedPath: string
  gender: string
  dob: string
  departmentName: string
  employmentTypeName: string
  jobTypeName: string
  imageData: string
  curentLocation: string
  baseLocation: string
  officialBirthday: string
  realBirthday: string
  maritalStatus: string
  emergencyContactName: string
  emergencyPhone: string
  emergencyRelationShip: string
  grade: string
  aboutMe: string
  homeNumber: string
  workNumber: string
  presentAddress: string
  presentCity: string
  presentZip: string
  presentLandMark: string
  permanentAddress: string
  permanentCity: string
  permanentZip: string
  permanentLandMark: string
  mobile: string
  homeCode: string
  workCode: string
  skillList: string
  userName: string
  alternativeMobile: string
  dateOfJoining: string
  informationList: string
  anniversary: string
  bankInformationList: string
  bioAttendanceDtoSet: string
  dates: string
  absentCount: number
  statusName: string
  emergencyContact: string
  relievingDate: string
  observationDTOList: string
  skypeId: string
  percent: string
  passportNumber: string
  passportExpDate: string
  passportIssuedPlace: string
  passportIssuedDate: string
  token: string
  underNoticeDate: string
  candidateId: string
  underNotice: string
  emailId: string
  empManager: string
  bloodgroup: string
  rbtCvPath: string
  rbtCvName: string
  timeSlotDTO: string
  technology: string
  hrAssociate: string
  lateComingCount: string
  passportFrontPagePath: string
  passportBackPagePath: string
  passportFrontPage: string
  passportBackPage: string
  projectManager: string
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number
  contractExists: string
  contractStartDate: string
  contractEndDate: string
  personalEmail: string
  experience: string
  companyExperience: string
  updatedExperience: string
  country: string
  workStatus: string
  comments: string
  vendorId: string
  vendorName: string
  countryCodeWork: string
  countryCodeMobile: string
  countryCodeHome: string
  countryCodeEmergency: string
  countryCodeAlternative: string
  address: string
}

export type PostNotesProps = {
  post: string
  postedBy: PostedBy
  project: Project
}

export type PostedBy = {
  id: string
}
export type Project = {
  id: string
}

// eslint-disable-next-line sonarjs/no-duplicate-string
/* eslint-disable max-lines */
import {
  GetBookingsForSelection,
  MeetingEditDTOList,
  MeetingLocations,
  RoomsOfLocation,
} from '../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { ProjectMember } from '../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

export const mockMeetingLocations: MeetingLocations[] = [
  {
    id: 1,
    locationName: 'RayBizech-1',
    locationStatus: null,
  },
  {
    id: 14,
    locationName: 'Business room',
    locationStatus: null,
  },
  {
    id: 23,
    locationName: 'Microsoft Teams Meeting',
    locationStatus: null,
  },
  {
    id: 24,
    locationName: 'Skype',
    locationStatus: null,
  },
  {
    id: 34,
    locationName: 'RayBizTech -2',
    locationStatus: null,
  },
  {
    id: 38,
    locationName: 'Meeting Room 1',
    locationStatus: null,
  },
  {
    id: 41,
    locationName: 'RayBizTech -3',
    locationStatus: null,
  },
  {
    id: 46,
    locationName: 'Meeting Room 3',
    locationStatus: null,
  },
  {
    id: 48,
    locationName: 'raybiztech',
    locationStatus: null,
  },
  {
    id: 49,
    locationName: 'Raybiztech 1',
    locationStatus: null,
  },
  {
    id: 63,
    locationName: 'RayBizTech - 2 ',
    locationStatus: null,
  },
  {
    id: 66,
    locationName: 'Skypes',
    locationStatus: null,
  },
]

export const mockRoomsOfLocation: RoomsOfLocation[] = [
  {
    id: 1,
    roomName: 'Aurobindo-6st Floor',
    locationId: 1,
    locationName: 'RayBiztch-1',
    roomStatus: true,
  },
  {
    id: 3,
    roomName: 'Valmiki - 3rd Floor',
    locationId: 1,
    locationName: 'Rayiztech-1',
    roomStatus: true,
  },
  {
    id: 4,
    roomName: 'Maa Saraswati - Training Room',
    locationId: 1,
    locationName: 'RyBiztech-1',
    roomStatus: true,
  },
  {
    id: 10,
    roomName: 'Meeting Room - 1',
    locationId: 1,
    locationName: 'RayBiztec-1',
    roomStatus: true,
  },
  {
    id: 11,
    roomName: 'Meeting Room - 2',
    locationId: 1,
    locationName: 'RayBtech-1',
    roomStatus: true,
  },
  {
    id: 15,
    roomName: 'Pantry',
    locationId: 1,
    locationName: 'RayBiztech',
    roomStatus: true,
  },
  {
    id: 18,
    roomName: "Gupta's Cabin",
    locationId: 1,
    locationName: 'Biztech-1',
    roomStatus: true,
  },
  {
    id: 21,
    roomName: '1st Floor',
    locationId: 1,
    locationName: 'RayBiech-1',
    roomStatus: true,
  },
  {
    id: 23,
    roomName: 'Ajay Ray Cabin',
    locationId: 1,
    locationName: 'RayBizte-1',
    roomStatus: true,
  },
  {
    id: 24,
    roomName: 'Businees dealings',
    locationId: 1,
    locationName: 'RBiztech-1',
    roomStatus: true,
  },
  {
    id: 25,
    roomName: 'Test2101',
    locationId: 1,
    locationName: 'RayBizth-1',
    roomStatus: true,
  },
  {
    id: 26,
    roomName: 'RayBizTech',
    locationId: 1,
    locationName: 'Raiztech-1',
    roomStatus: true,
  },
  {
    id: 27,
    roomName: 'Aurobindo',
    locationId: 1,
    locationName: 'RayBiztech-5',
    roomStatus: true,
  },
  {
    id: 36,
    roomName: 'sunny cabin',
    locationId: 1,
    locationName: 'RayBiztech-8',
    roomStatus: true,
  },
]

export const mockBookingsForSelection: GetBookingsForSelection[] = [
  {
    id: 2474,
    agenda: 'Training',
    roomId: 1,
    roomName: 'Aurobindo - 3st Floor',
    locationName: 'RayBiztech-21',
    fromDate: '19 aug 2022',
    toDate: null,
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '../profilepics/17.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@raybizech.com',
      designation: 'Software Enineer',
      fullName: 'Akhitha Boshalla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 14:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'Cancelled',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24765,
    description: 'Training',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 2027,
        profilePicPath: '',
        firstName: 'Sandeep',
        lastName: 'Guzzarlamudi',
        emailId: 'test@raybztech.com',
        designation: 'Associate Software Engineer',
        fullName: 'Sandeep Guzzarlamudi',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '../proilepics/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@raybizech.com',
      designation: 'Sotware Engineer',
      fullName: 'Akhitha Boshalla',
    },
    availableDates: null,
  },
  {
    id: 24842,
    agenda: 'added',
    roomId: 1,
    roomName: 'Aurobino - 1st Floor',
    locationName: 'RayBiztech',
    fromDate: '19 dec 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: 'ovh',
    employeeIds: [],
    authorName: {
      id: 1985,
      profilePicPath: '',
      firstName: 'Vinesh',
      lastName: 'Merugu',
      emailId: '',
      designation: 'Engineer',
      fullName: 'Vinesh Merugu',
    },
    employeeNames: [],
    isAuthorisedUser: true,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 12,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1991,
        profilePicPath: '',
        firstName: 'Itadmin',
        lastName: 'A',
        emailId: 'test@rybiztech.com',
        designation: 'IT Suport Lead',
        fullName: 'Itadmin A',
      },
    ],
    trainerName: {
      id: 22,
      profilePicPath: '',
      firstName: '',
      lastName: '',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24841,
    agenda: 'test',
    roomId: 1,
    roomName: 'Auroindo - 1st Floor',
    locationName: 'RayBiztech-9',
    fromDate: '19 Nov 2022',
    toDate: null,
    startTime: '05:00 PM',
    endTime: '06:00 PM',
    projectName: 'ovh',
    employeeIds: [],
    authorName: {
      id: 1982,
      profilePicPath: '',
      firstName: 'Venkata',
      lastName: 'Kolla',
      emailId: 'tet@raybiztech.com',
      designation: '',
      fullName: 'Venkata',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 17:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'Cancelled',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 9,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1991,
        profilePicPath: '../profilepics/Default_Female.jpg',
        firstName: 'Itadmin',
        lastName: 'A',
        emailId: 'test@raybiztech1.com',
        designation: 'IT Support Lead',
        fullName: 'Itadmin A',
      },
    ],
    trainerName: {
      id: 22,
      profilePicPath: '',
      firstName: '',
      lastName: '',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24791,
    agenda: 'Camp',
    roomId: 2,
    roomName: 'Vivekananda - 9nd Floor',
    locationName: '1',
    fromDate: '29 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/08/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: '',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: 'Health',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1991,
        profilePicPath: '../profilepics/Default_Female.jpg',
        firstName: 'Itadmin',
        lastName: 'A',
        emailId: 'test@raybiztech2.com',
        designation: 'IT Support Lead',
        fullName: 'Itadmin A',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24850,
    agenda: 'test1',
    roomId: 3,
    roomName: 'Valmiki - 3rd Floor',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '03:00 PM',
    endTime: '04:30 PM',
    projectName: 'ovh',
    employeeIds: [],
    authorName: {
      id: 1983,
      profilePicPath: '../profilepics/1983.jpeg',
      firstName: 'Sai',
      lastName: 'Banothu',
      emailId: '',
      designation: 'Engineer',
      fullName: 'Sai Banothu',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 15:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'Completed',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24839,
    description: 'testing',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1054,
        profilePicPath: '',
        firstName: 'DileepVarma',
        lastName: 'S V V',
        emailId: 'test@raybiztech4.com',
        designation: 'crzb',
        fullName: 'Dileep Vama S V V',
      },
    ],
    trainerName: {
      id: 1983,
      profilePicPath: '../profilepics/1983.jpeg',
      firstName: 'Sai',
      lastName: 'Banothu',
      emailId: 'test@raybiztech5.com',
      designation: 'Associate Software Engineer',
      fullName: 'Sai Banothu',
    },
    availableDates: null,
  },
  {
    id: 247965,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '12 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: './profilepics/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'teest@merugu.com',
      designation: 'Softwaree Engineer',
      fullName: 'Akshith Bosla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/03/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'Completed',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1054,
        profilePicPath: '../profilepics/Default_Mae.jpg',
        firstName: 'Diep Varma',
        lastName: 'S V V',
        emailId: 'test@raybtech.com',
        designation: 'crzb',
        fullName: 'Dileep Vara S V V',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 4791,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'In Progress',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1054,
        profilePicPath: '../profilepics/Default_Male.jpg',
        firstName: 'Dileep Varma',
        lastName: 'S V V',
        emailId: 'test@rbiztech.com',
        designation: 'crzb',
        fullName: 'Dileep Varma S V V',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 247,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/05/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'Cancelled',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1054,
        profilePicPath: '../profilepics/Default_Male.jpg',
        firstName: 'Dileep Varma',
        lastName: 'S V V',
        emailId: 'tes@raybiztech.com',
        designation: 'crzb',
        fullName: 'Dileep Varma S V V',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 2791,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '14 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'te@raybiztech.com',
        designation: 'fwlz',
        fullName: 'Pradeep',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24791,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '10 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: 'Sotware Engineer',
      fullName: 'Akshitha Bohalla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 6:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: 'Heath Camp',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@rayztech.com',
        designation: 'fwlz',
        fullName: 'Pradeep',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '../profilepis/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test3@raybiztech.com',
      designation: 'Software Engneer',
      fullName: 'Akshith Boshalla',
    },
    availableDates: null,
  },
  {
    id: 2491,
    agenda: 'Health',
    roomId: 2,
    roomName: 'Vivekanana - 2nd Floor',
    locationName: 'RayBztech-1',
    fromDate: '1 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@meugu.com',
      designation: 'Softwae Engineer',
      fullName: 'Akshitha Bosalla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 1:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: 'Health Cap',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '../rofilepics/1057.jpeg',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raztech.com',
        designation: 'fwlz',
        fullName: 'PradeepNamburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '../profilepics/197.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test2@raybizech.com',
      designation: 'Software Egineer',
      fullName: 'Akshitha Bshalla',
    },
    availableDates: null,
  },
  {
    id: 2479,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '9 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybich.com',
        designation: 'fwlz',
        fullName: '',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24798,
    agenda: '',
    roomId: 2,
    roomName: 'Vivekananda - 7nd Floor',
    locationName: 'RayBizech-1',
    fromDate: '1 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2021 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybih.com',
        designation: 'fwlz',
        fullName: 'Vinesh',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24787,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '19 Sp 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@merugu.co',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/202 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech7.com',
        designation: 'fwlz',
        fullName: '',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24767,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '15 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'testmerugu.com',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/04/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech8.com',
        designation: 'fwlz',
        fullName: 'Basheer',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24776,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech9.com',
        designation: 'fwlz',
        fullName: '',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24765,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech44.com',
        designation: 'fwlz',
        fullName: '',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24754,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '1',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech55.com',
        designation: 'fwlz',
        fullName: 'PNamburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24744,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech66.com',
        designation: 'fwlz',
        fullName: 'PradeeNamburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24733,
    agenda: '',
    roomId: 2,
    roomName: '',
    locationName: '',
    fromDate: '',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: '',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech77.com',
        designation: 'fwlz',
        fullName: 'Pradep Namburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: '',
      designation: '',
      fullName: '',
    },
    availableDates: null,
  },
  {
    id: 24722,
    agenda: 'vinesh Halth Camp',
    roomId: 2,
    roomName: 'Vivekananda - 2nd Floor',
    locationName: 'RayBiztech-1',
    fromDate: '19 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '../proflepics/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@merugu.com',
      designation: 'Softwae Engineer',
      fullName: 'Akshith Boshalla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: 'Healh Camp',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '../profilepics/1057.jpeg',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech.com',
        designation: 'fwlz',
        fullName: 'Pradeep Namburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '../profilecs/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test2@raybiztech.com',
      designation: 'Sofare Engineer',
      fullName: 'Akshithoshalla',
    },
    availableDates: null,
  },
  {
    id: 24712,
    agenda: 'Health Camp',
    roomId: 2,
    roomName: 'Vivekananda - 2nd Floor',
    locationName: 'RayBiztech-1',
    fromDate: '19 Sep 2022',
    toDate: null,
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    projectName: null,
    employeeIds: [],
    authorName: {
      id: 1977,
      profilePicPath: '../profilepics/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test@merugu.com',
      designation: 'Software Engineer',
      fullName: 'Akshitha Boshalla',
    },
    employeeNames: [],
    isAuthorisedUser: false,
    locationId: 1,
    employeeAvailability: null,
    timeFomrat: '19/09/2022 16:00:00',
    disableEdit: false,
    meetingEditDTOList: null,
    meetingAttendeesDto: null,
    availability: null,
    meetingStatus: 'New',
    conferenceType: 'Meeting',
    eventTypeName: null,
    eventTypeId: null,
    eventLocation: '',
    eventId: 24782,
    description: 'Health Camp',
    eventEditAccess: true,
    empDesignations: [],
    employeeDto: [
      {
        id: 1057,
        profilePicPath: '../profilepics/1057.jpeg',
        firstName: 'Pradeep',
        lastName: 'Namburu',
        emailId: 'test@raybiztech.com',
        designation: 'fwlz',
        fullName: 'Pradeep Namburu',
      },
    ],
    trainerName: {
      id: 1977,
      profilePicPath: '../profilepics/1977.jpeg',
      firstName: 'Akshitha',
      lastName: 'Boshalla',
      emailId: 'test2@raybiztech.com',
      designation: 'Software Engineer',
      fullName: 'Akshitha Boshalla',
    },
    availableDates: null,
  },
]

export const mockMeetingDToList: MeetingEditDTOList[] = [
  {
    flag: '',
    fullName: 'vinesh merugu',
    id: 2,
    availability: '',
  },
]

export const mockProjectMembers: ProjectMember[] = [
  {
    availability: '',
    id: 0,
    firstName: 'jyothika',
    lastName: 'devi',
    middleName: '',
    designation: 'developer',
    role: '',
    manager: '',
    designationKrasDTO: null,
    employeeSubmitted: null,
    managerSubmitted: null,
    acknowledged: null,
    fullName: 'Jyothika Devi',
    profilePicPath: null,
    thumbPicture: '',
    profilePicGeneratedPath: '',
    gender: '',
    dob: '',
    departmentName: '',
    employmentTypeName: '',
    jobTypeName: '',
    imageData: null,
    curentLocation: null,
    baseLocation: '',
    officialBirthday: '',
    realBirthday: null,
    maritalStatus: null,
    emergencyContactName: '',
    emergencyPhone: '',
    emergencyRelationShip: '',
    grade: '',
    aboutMe: '',
    homeNumber: null,
    workNumber: null,
    presentAddress: null,
    presentCity: null,
    presentZip: null,
    presentLandMark: null,
    permanentAddress: null,
    permanentCity: null,
    permanentZip: null,
    permanentLandMark: null,
    mobile: null,
    homeCode: null,
    workCode: null,
    skillList: null,
    userName: null,
    alternativeMobile: null,
    dateOfJoining: null,
    informationList: null,
    anniversary: null,
    bankInformationList: null,
    bioAttendanceDtoSet: null,
    dates: null,
    absentCount: 0,
    statusName: null,
    emergencyContact: null,
    relievingDate: null,
    observationDTOList: null,
    skypeId: null,
    percent: null,
    passportNumber: null,
    passportExpDate: null,
    passportIssuedPlace: null,
    passportIssuedDate: null,
    token: null,
    underNoticeDate: null,
    candidateId: 1,
    underNotice: null,
    emailId: null,
    empManager: null,
    bloodgroup: null,
    rbtCvPath: null,
    rbtCvName: null,
    timeSlotDTO: null,
    technology: null,
    hrAssociate: null,
    lateComingCount: null,
    passportFrontPagePath: null,
    passportBackPagePath: null,
    passportFrontPage: null,
    passportBackPage: null,
    projectManager: null,
    casualLeaveCount: 0,
    lopLeaveCount: 0,
    holidaysCount: 0,
    contractExists: null,
    contractStartDate: null,
    contractEndDate: null,
    personalEmail: null,
    experience: null,
    companyExperience: null,
    updatedExperience: null,
    country: null,
    workStatus: null,
    comments: null,
    vendorId: null,
    vendorName: null,
    countryCodeWork: null,
    countryCodeMobile: null,
    countryCodeHome: null,
    countryCodeEmergency: null,
    countryCodeAlternative: null,
    address: null,
  },
]

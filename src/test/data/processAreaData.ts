import {
  ProcessAreas,
  ProcessSubHeadsDto,
  ProjectTailoringDocument,
} from '../../types/Settings/ProcessAreas/processAreaTypes'

export const mockProcessAreas: ProcessAreas[] = [
  {
    id: 1,
    name: 'Project Planning h',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Project Monitoring and Control j',
    categoryId: 1,
  },
  {
    id: 3,
    name: 'Risk Management gf',
    categoryId: 1,
  },
  {
    id: 4,
    name: 'Integrated Project Management',
    categoryId: 1,
  },
  {
    id: 14,
    name: 'Test',
    categoryId: 1,
  },
  {
    id: 16,
    name: 'sda',
    categoryId: 1,
  },
  {
    id: 17,
    name: 'Testjan30',
    categoryId: 1,
  },
  {
    id: 18,
    name: 'Project HR Management',
    categoryId: 1,
  },
  {
    id: 20,
    name: 'Project Management HR',
    categoryId: 1,
  },
  {
    id: 21,
    name: 'HR',
    categoryId: 1,
  },
  {
    id: 22,
    name: 'HR Test',
    categoryId: 1,
  },
  {
    id: 24,
    name: 'test 456',
    categoryId: 1,
  },
  {
    id: 25,
    name: 'tyr',
    categoryId: 1,
  },
  {
    id: 26,
    name: 'yvghjbui',
    categoryId: 1,
  },
  {
    id: 27,
    name: 'Project Tailoring List',
    categoryId: 1,
  },
  {
    id: 28,
    name: 'Project Plan 3',
    categoryId: 1,
  },
  {
    id: 29,
    name: 'Process Area saved successfully',
    categoryId: 1,
  },
  {
    id: 30,
    name: 'Process Area saved successfully 123',
    categoryId: 1,
  },
  {
    id: 31,
    name: 'Process gfv Area',
    categoryId: 1,
  },
  {
    id: 32,
    name: 'Category Engineering',
    categoryId: 1,
  },
  {
    id: 33,
    name: 'Process Areas',
    categoryId: 1,
  },
  {
    id: 34,
    name: 'Process Areas List ',
    categoryId: 1,
  },
  {
    id: 35,
    name: 'Process Areas List  k',
    categoryId: 1,
  },
  {
    id: 37,
    name: 'Project Plann ing ',
    categoryId: 1,
  },
]

export const mockProjectTailoring: ProjectTailoringDocument[] = [
  {
    id: null,
    processHeadId: 1,
    processHeadname: 'Project Management',
    processSubHeadsDto: [
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 86,
        processAreaId: null,
        processSubHeadName: 'Risk Mana gement',
        processName: null,
        documentName: 'HIVE Issue work package',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/risk-management',
        status: 'true',
        order: 24,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 5,
        processAreaId: null,
        processSubHeadName: 'Project Monito ring and Control',
        processName: 'Minutesgj of Meeting',
        documentName: 'Form Minutes of Meeting.doc',
        responsible: 'PM / Lead',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documents/3232',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 7,
        processAreaId: null,
        processSubHeadName: 'Risk Management',
        processName: 'Risk Register',
        documentName: 'HIVE Risk Work package',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/risk-management',
        status: 'true',
        order: 22,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 39,
        processAreaId: null,
        processSubHeadName: 'Project Planjhlning',
        processName: null,
        documentName: 'Work Plan',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/projectt-planning',
        status: 'true',
        order: 11,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 47,
        processAreaId: null,
        processSubHeadName: 'Project Monihjntoring and Control',
        processName: null,
        documentName: 'Customer Satisfaction',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projectst/qms-v6-0/wiki/project-monitoring-and-control',
        status: 'true',
        order: 21,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 45,
        processAreaId: null,
        processSubHeadName: 'Project Monitlloring and Control',
        processName: null,
        documentName: 'Lessons Learnt and Best Practice',
        responsible: 'PM/Lead',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.cotm/projects/qms-v6-0/wiki/project-monitoring-and-control',
        status: 'true',
        order: 19,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 4,
        processAreaId: null,
        processSubHeadName: 'Project Monitorlling and Control',
        processName: 'Minutes of Meeting',
        documentName: 'Templ Action Item Tracker.xls',
        responsible: 'PM / Lead',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.cotm/documents/323',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 105,
        processAreaId: null,
        processSubHeadName: 'Project Monitkgkoring and Control',
        processName: null,
        documentName: 'Add Process Area',
        responsible: 'Add Process Area',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'http://localhost:3000/protcessAreaList',
        status: 'true',
        order: 26,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 44,
        processAreaId: null,
        processSubHeadName: 'Project Monijljtoring and Control',
        processName: null,
        documentName: 'Project Status Report',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projhects/qms-v6-0/wiki/project-monitoring-and-control',
        status: 'true',
        order: 18,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 46,
        processAreaId: null,
        processSubHeadName: 'Project Monitoring and Chlontrol',
        processName: null,
        documentName: 'Sprint Retrospective Meeting',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/project-monitoring-and-control',
        status: 'true',
        order: 20,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 1,
        processAreaId: null,
        processSubHeadName: 'Project Plalhlnning',
        processName: 'Project Managehment Plan',
        documentName: 'Templ Statement of Work.doc',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.cohkm/documents/322',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 101,
        processAreaId: null,
        processSubHeadName: 'Project Pjgjlanning',
        processName: null,
        documentName: 'test 42',
        responsible: 'test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://ovh2.raybiztech.coghm/hrm.html#/processAreaList',
        status: 'true',
        order: 13,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 91,
        processAreaId: null,
        processSubHeadName: 'Test',
        processName: null,
        documentName: 'test',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://ovh2.raybiztech.com/jhghrm.html#/processAreaList',
        status: 'true',
        order: 8,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 8,
        processAreaId: null,
        processSubHeadName: 'Project Monitorijgfjng and Control',
        processName: 'Issue Tracker',
        documentName: 'Form Issue Tracker.xls',
        responsible: 'PM / Lead',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.cgjom/documents/323',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 100,
        processAreaId: null,
        processSubHeadName: 'Project Planfgjning',
        processName: null,
        documentName: 'vinesh',
        responsible: 'test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'http://localhost:3000/proceshksAreaList',
        status: 'true',
        order: 14,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 9,
        processAreaId: null,
        processSubHeadName: 'Project Monitorighkng and Control',
        processName: 'Management Reviews Meeting',
        documentName: 'Management Review.ppt',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documgjents/323',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 40,
        processAreaId: null,
        processSubHeadName: 'Projehgkct Planning',
        processName: null,
        documentName: 'Project Management Plan',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wijfki/project-planning',
        status: 'true',
        order: 12,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 6,
        processAreaId: null,
        processSubHeadName: 'Project Monitghkoring and Control',
        processName: 'Project Status Report',
        documentName: 'Templ Project Status Report.ppt',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documents/323',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 97,
        processAreaId: null,
        processSubHeadName: 'Project Plaghknning',
        processName: null,
        documentName: 'testing 123',
        responsible: 'test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'test',
        status: 'true',
        order: 3,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 103,
        processAreaId: null,
        processSubHeadName: 'Project Plghklanning',
        processName: null,
        documentName: 'Feb 1',
        responsible: 'Test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://ovh2.raybiztech.com/hrm.html#/processAreaList',
        status: 'true',
        order: 1,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 95,
        processAreaId: null,
        processSubHeadName: 'Project Plghlanning',
        processName: null,
        documentName: 'fbx fb',
        responsible: 'fzcvdf',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'kdsfcjds;lcvn;d',
        status: 'true',
        order: 6,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 99,
        processAreaId: null,
        processSubHeadName: 'Projlglect Planning',
        processName: null,
        documentName: 'Testing 1234',
        responsible: 'Testing',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'http://localhost:3000/procegfjssAreaList',
        status: 'true',
        order: 15,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 98,
        processAreaId: null,
        processSubHeadName: 'Project Pgllanning',
        processName: null,
        documentName: 'Test Test',
        responsible: 'Test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'Test',
        status: 'true',
        order: 2,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 2,
        processAreaId: null,
        processSubHeadName: 'Projelghlct Planning',
        processName: 'Project Management Plan',
        documentName: 'Templ PMP.doc',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documents/322',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 106,
        processAreaId: null,
        processSubHeadName: 'Project Monitorlghling and Control',
        processName: null,
        documentName: 'Procejgss Area',
        responsible: 'Process Area',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'http://localhost:3000/processAreaList',
        status: 'true',
        order: 28,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 42,
        processAreaId: null,
        processSubHeadName: 'Project Planlghning',
        processName: null,
        documentName: 'Project Closure',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wigjki/project-planning',
        status: 'true',
        order: 16,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 96,
        processAreaId: null,
        processSubHeadName: 'Project Phfllanning',
        processName: null,
        documentName: 'testing',
        responsible: 'testing',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'testing',
        status: 'true',
        order: 5,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 102,
        processAreaId: null,
        processSubHeadName: 'Risk Management',
        processName: null,
        documentName: 'test 14',
        responsible: 'testing',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://ovh2.raybiztech.com/hrm.html#/processAreaList',
        status: 'true',
        order: 23,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 3,
        processAreaId: null,
        processSubHeadName: 'Project Plahlynning',
        processName: 'Estimation',
        documentName: 'Templ Estimation.xls',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documents/322',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 43,
        processAreaId: null,
        processSubHeadName: 'Project Monyflitoring and Control',
        processName: null,
        documentName: 'Minutes of Meeting/HIVE Meeting Module',
        responsible: 'BA/Lead',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/project-monitoring-and-control',
        status: 'true',
        order: 17,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 92,
        processAreaId: null,
        processSubHeadName: 'Test',
        processName: null,
        documentName: 'new document',
        responsible: 'added',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://document',
        status: 'true',
        order: 10,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 107,
        processAreaId: null,
        processSubHeadName: 'Project Monitoring and Control',
        processName: null,
        documentName: 'Process Area list',
        responsible: 'Process Area ',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'http://localhost:3000/processAreaList',
        status: 'true',
        order: 29,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 94,
        processAreaId: null,
        processSubHeadName: 'Testjan30',
        processName: null,
        documentName: 'Hivedoc',
        responsible: 'Test',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/ovh-migration/documents',
        status: 'true',
        order: 4,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 37,
        processAreaId: null,
        processSubHeadName: 'Project Planning',
        processName: 'NULL',
        documentName: 'Project Kickoff Document',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/project-planning',
        status: 'true',
        order: 7,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 10,
        processAreaId: null,
        processSubHeadName: 'Project Monitoring and Control',
        processName: 'Lessons Learnt and Best Practice',
        documentName: 'Templ Lesson and Best_Practice.xls',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/documents/323',
        status: 'false',
        order: null,
      },
      {
        id: null,
        categoryId: 1,
        processSubHeadId: 38,
        processAreaId: null,
        processSubHeadName: 'Project Planning',
        processName: null,
        documentName: 'Estimation',
        responsible: 'PM',
        common: null,
        specificToProject: 'No',
        comments: null,
        sqaComments: null,
        sqaApproval: null,
        link: 'https://hive.raybiztech.com/projects/qms-v6-0/wiki/project-planning',
        status: 'true',
        order: 9,
      },
    ],
    tailoredCount: null,
    waivedCount: null,
    documentCount: '36',
    processSubHeadCount: '36',
    processCount: '8',
  },
]

export const mockProcessSubHeadsDto: ProcessSubHeadsDto[] = [
  {
    id: null,
    categoryId: 1,
    processSubHeadId: 92,
    processAreaId: null,
    processSubHeadName: 'Test',
    processName: null,
    documentName: 'new document',
    responsible: 'added',
    common: null,
    specificToProject: 'No',
    comments: null,
    sqaComments: null,
    sqaApproval: null,
    link: 'https://document',
    status: 'true',
    order: 15,
  },
  {
    id: null,
    categoryId: 1,
    processSubHeadId: 47,
    processAreaId: null,
    processSubHeadName: 'Project Motfrynitoring and Control',
    processName: null,
    documentName: 'Customer Satisfaction',
    responsible: 'PM',
    common: null,
    specificToProject: 'No',
    comments: null,
    sqaComments: null,
    sqaApproval: null,
    link: 'https://hive.raybizyytech.com/projects/qms-v6-0/wiki/project-monitoring-and-control',
    status: 'true',
    order: 27,
  },
  {
    id: null,
    categoryId: 1,
    processSubHeadId: 7,
    processAreaId: null,
    processSubHeadName: 'Risk Manatugement',
    processName: 'Risk Register',
    documentName: 'HIVE Risk Work package',
    responsible: 'PM',
    common: null,
    specificToProject: 'No',
    comments: null,
    sqaComments: null,
    sqaApproval: null,
    link: 'https://hive.raybizruyutech.com/projects/qms-v6-0/wiki/risk-management',
    status: 'true',
    order: 28,
  },
  {
    id: null,
    categoryId: 1,
    processSubHeadId: 94,
    processAreaId: null,
    processSubHeadName: 'Testjan30',
    processName: null,
    documentName: 'Hivedoc',
    responsible: 'Test',
    common: null,
    specificToProject: 'No',
    comments: null,
    sqaComments: null,
    sqaApproval: null,
    link: 'https://hive.raybizttuiech.com/projects/ovh-migration/documents',
    status: 'true',
    order: 8,
  },
]
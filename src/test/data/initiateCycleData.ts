import {
  GetActiveCycleData,
  GetAllCycles,
  GetAllQuestions,
} from '../../types/Settings/InitiateCycle/initiateCycleTypes'

export const mockActiveCycleData: GetActiveCycleData = {
  id: 9,
  nominationCycleDto: {
    id: 19,
    cycleName: 'Testing the Cycle Flow',
    fromMonth: '12/2022',
    toMonth: '12/2022',
    activateFlag: true,
    startDate: '21/12/2022',
    endDate: '31/12/2022',
    questionMappingDtos: null,
  },
  nominationQuestionDto: [
    {
      id: 9,
      question: 'Reason for Nomination',
      checkQuestion: null,
    },
  ],
  checkQuestion: null,
}

export const mockAllCycles: GetAllCycles = {
  size: 6,
  list: [
    {
      id: 19,
      cycleName: 'Testing the Cycle Flow',
      fromMonth: '12/2022',
      toMonth: '12/2022',
      activateFlag: true,
      startDate: '21/12/2022',
      endDate: '31/12/2022',
      questionMappingDtos: null,
    },
    {
      id: 6,
      cycleName: 'Star of the Month - Nov 2018',
      fromMonth: '11/2018',
      toMonth: '11/2018',
      activateFlag: false,
      startDate: '05/12/2018',
      endDate: '24/12/2018',
      questionMappingDtos: null,
    },
    {
      id: 5,
      cycleName: 'Star of the Month - Oct 2018',
      fromMonth: '10/2018',
      toMonth: '10/2018',
      activateFlag: false,
      startDate: '26/10/2018',
      endDate: '05/11/2018',
      questionMappingDtos: null,
    },
    {
      id: 4,
      cycleName: 'Star of the Month - Sep 2018',
      fromMonth: '09/2018',
      toMonth: '09/2018',
      activateFlag: false,
      startDate: '05/09/2018',
      endDate: '30/09/2018',
      questionMappingDtos: null,
    },
    {
      id: 3,
      cycleName: 'Star of the Month, Mar 2018',
      fromMonth: '03/2018',
      toMonth: '03/2018',
      activateFlag: false,
      startDate: '02/04/2018',
      endDate: '30/04/2018',
      questionMappingDtos: null,
    },
    {
      id: 1,
      cycleName: 'Associate of the Quarter July to Aug 2016',
      fromMonth: '07/2016',
      toMonth: '08/2016',
      activateFlag: false,
      startDate: '12/12/2016',
      endDate: '14/12/2016',
      questionMappingDtos: null,
    },
  ],
}

export const mockAllQuestions: GetAllQuestions = {
  size: 23,
  list: [
    {
      id: 13,
      question:
        'CoreUI is the fastest way to build a modern dashboard for any platforms, browser, or device. A complete UI Kit that allows you to quickly build eye-catching, high-quality, high-performance responsive applications.',
      checkQuestion: null,
    },
    {
      id: 7,
      question:
        'The nominated candidate provides ideas and innovate for company growth',
      checkQuestion: null,
    },
    {
      id: 5,
      question:
        'The nominated candidate works towards Productivity/Quality Improvement.',
      checkQuestion: null,
    },
    {
      id: 9,
      question: 'Reason for Nomination',
      checkQuestion: null,
    },
    {
      id: 4,
      question:
        'The nominated candidate goes above and beyond to motivate others.',
      checkQuestion: null,
    },
    {
      id: 2,
      question:
        'The nominated candidate displays a great attitude even if obstacles arise.',
      checkQuestion: null,
    },
    {
      id: 8,
      question: 'Any additional comments',
      checkQuestion: null,
    },
    {
      id: 16,
      question: 'Testing the Flow',
      checkQuestion: null,
    },
    {
      id: 1,
      question: 'The nominated candidate has a positive attitude',
      checkQuestion: null,
    },
    {
      id: 11,
      question: 'Reson for nominee',
      checkQuestion: null,
    },
    {
      id: 6,
      question:
        'The nominated candidate attracts/refers best talents to the company',
      checkQuestion: null,
    },
    {
      id: 14,
      question:
        'CoreUI is the fastest way to build a modern dashboard for any platforms, browser, or device. A complete UI Kit that allows you to quickly build eye-catching, high-quality, high-performance responsive applications.',
      checkQuestion: null,
    },
    {
      id: 3,
      question: 'The nominated candidate encourages Team-Work and cooperation.',
      checkQuestion: null,
    },
    {
      id: 14,
      question: 'Question Question ',
      checkQuestion: null,
    },
    {
      id: 15,
      question: 'Question Question Question',
      checkQuestion: null,
    },
    {
      id: 16,
      question: 'Question Question Question Question',
      checkQuestion: null,
    },
    {
      id: 17,
      question: 'Question Question Question Question Question Question',
      checkQuestion: null,
    },
    {
      id: 18,
      question: 'Answer',
      checkQuestion: null,
    },
    {
      id: 19,
      question: 'Answer Answer',
      checkQuestion: null,
    },
    {
      id: 20,
      question: 'Answer Answer Answer',
      checkQuestion: null,
    },
    {
      id: 21,
      question: 'Answer Answer Answer Answer',
      checkQuestion: null,
    },
    {
      id: 22,
      question: 'Answer Answer Answer Answer Answer ',
      checkQuestion: null,
    },
    {
      id: 23,
      question: 'Answer Question',
      checkQuestion: null,
    },
  ],
}

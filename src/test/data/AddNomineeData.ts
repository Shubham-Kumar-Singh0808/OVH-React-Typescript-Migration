import { IncomingNominationFormDetails } from '../../types/Achievements/AddNominee/AddNomineeTypes'

export const mockNominationFormDetails: IncomingNominationFormDetails = {
  id: null,
  employeeId: null,
  employeeName: null,
  achievementTypeId: null,
  achievementType: null,
  nominationQuestionDataDtosId: [
    {
      id: null,
      questions: 'Hii Question',
      feedBack: null,
    },
    {
      id: null,
      questions: 'question 18',
      feedBack: null,
    },
    {
      id: null,
      questions: 'question 18',
      feedBack: null,
    },
    {
      id: null,
      questions: '<p>test</p>',
      feedBack: null,
    },
  ],
  cycleID: 20,
  cycleName: 'cycle',
  fromMonth: '02/2022',
  toMonth: '03/2022',
  rating: null,
  finalComments: null,
  nominationStatus: null,
  activateFlag: null,
  createdBy: null,
  createdDate: null,
}

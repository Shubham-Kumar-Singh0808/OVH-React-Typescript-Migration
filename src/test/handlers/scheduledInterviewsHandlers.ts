import { rest } from 'msw'
import { scheduledInterviewsAPiConfig } from '../../middleware/api/apiList'
import { mockScheduledCandidatesData } from '../data/scheduledInterviewsData'

export const scheduledInterviewsHandlers = [
  // hive activity report api mock
  rest.get(
    scheduledInterviewsAPiConfig.searchScheduledCandidates,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockScheduledCandidatesData,
        }),
      )
    },
  ),
]

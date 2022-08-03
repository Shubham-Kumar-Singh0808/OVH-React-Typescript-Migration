import { rest } from 'msw'
import {
  employeeCertificationsApiConfig,
  scheduledInterviewsApiConfig,
} from '../../middleware/api/apiList'
import { mockTechnologies } from '../data/employeeTechnologiesData'
import {
  mockScheduledCandidatesData,
  mockScheduledCandidatesForEmployeeData,
} from '../data/scheduledInterviewsData'

export const scheduledInterviewsHandlers = [
  // scheduled candidates api mock
  rest.get(
    scheduledInterviewsApiConfig.searchScheduledCandidates,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockScheduledCandidatesData,
        }),
      )
    },
  ),
  // scheduled candidates for employee api mock
  rest.get(
    scheduledInterviewsApiConfig.searchScheduledCandidatesForEmployee,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockScheduledCandidatesForEmployeeData,
        }),
      )
    },
  ),
  // technologies api mock
  rest.get(
    employeeCertificationsApiConfig.getTechnologies,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockTechnologies,
        }),
      )
    },
  ),
]

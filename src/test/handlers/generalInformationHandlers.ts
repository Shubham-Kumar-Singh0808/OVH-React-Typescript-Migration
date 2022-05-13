import { rest } from 'msw'
import { employeeGeneralInformationApi } from '../../middleware/api/apiList'
import { mockGeneralInformationData } from '../data/generalInformationData'

export const generalInformationHandlers = [
  rest.get(
    employeeGeneralInformationApi.getLoggedInEmployeeData,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),

  rest.get(
    employeeGeneralInformationApi.getLoggedInEmployeeData,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGeneralInformationData))
    },
  ),
]

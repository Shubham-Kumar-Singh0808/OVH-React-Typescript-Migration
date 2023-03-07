import { rest } from 'msw'
import { appraisalConfigurationsApiConfig } from '../../middleware/api/apiList'
import { mockAppraisalCycle } from '../data/appraisalConfigurationsData'

export const addRoomListHandlers = [
  rest.get(appraisalConfigurationsApiConfig.cycle, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockAppraisalCycle },
      }),
    )
  }),
]

import { rest } from 'msw'
import { addConfigurationsApiConfig } from '../../middleware/api/apiList'
import { mockCycleRecords } from '../data/addConfigurationData'

export const addConfigurationHandlers = [
  rest.get(addConfigurationsApiConfig.addAppraisalCycle, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  rest.get(addConfigurationsApiConfig.addAppraisalCycle, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCycleRecords))
  }),
]

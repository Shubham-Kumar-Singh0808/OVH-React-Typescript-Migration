import { rest } from 'msw'
import { userApiConfig } from '../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../data/userAccessToFeaturesData'

export const userAccessToFeaturesHandlers = [
  // user access to features api mock
  rest.get(userApiConfig.getUserAccessToFeatures, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockUserAccessToFeaturesData,
      }),
    )
  }),
]

import { rest } from 'msw'
import { addLocationListApiConfig } from '../../middleware/api/apiList'
import { mockTemplateTypes } from '../data/addLocationListData'

export const addLocationListHandlers = [
  // addClient api mock
  rest.get(
    addLocationListApiConfig.getAllMeetingLocations,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  rest.get(addLocationListApiConfig.addLocation, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTemplateTypes))
  }),
]

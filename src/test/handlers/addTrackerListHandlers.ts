import { rest } from 'msw'
import { addTrackerApiConfig } from '../../middleware/api/apiList'
import { mockTrackerList } from '../data/addTrackerListData'

export const trackerHandlers = [
  rest.get(addTrackerApiConfig.addNewTracker, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  rest.get(addTrackerApiConfig.deleteTrackerList, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTrackerList))
  }),
]

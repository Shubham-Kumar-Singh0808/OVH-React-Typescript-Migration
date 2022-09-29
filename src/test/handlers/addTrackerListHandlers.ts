import { rest } from 'msw'
import { addTrackerApiConfig } from '../../middleware/api/apiList'
import { mockAddTrackerList } from '../data/addTrackerListData'

export const trackerHandlers = [
  rest.get(addTrackerApiConfig.addNewTracker, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockAddTrackerList,
      }),
    )
  }),

  rest.delete(addTrackerApiConfig.deleteTracker, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]

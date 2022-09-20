import { rest } from 'msw'
import { eventListApiConfig } from '../../middleware/api/apiList'
import { mockEventList } from '../data/eventListData'

export const eventListHandlers = [
  // getAllEvents api mock
  rest.get(eventListApiConfig.getAllEvents, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEventList,
      }),
    )
  }),
]

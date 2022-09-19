import { rest } from 'msw'
import { eventTypeListApiConfig } from '../../middleware/api/apiList'
import { mockEventTypeList } from '../data/eventTypeListData'

export const eventTypeListHandlers = [
  // getAllEventTypes api mock
  rest.get(eventTypeListApiConfig.getAllEventTypes, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEventTypeList,
      }),
    )
  }),
  // deleteEventType api mock
  rest.delete(eventTypeListApiConfig.deleteEventType, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
      }),
    )
  }),
  // addEventType api mock
  rest.post(eventTypeListApiConfig.addEventType, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // updateEventType api mock
  rest.put(eventTypeListApiConfig.updateEventType, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: [],
      }),
    )
  }),
]

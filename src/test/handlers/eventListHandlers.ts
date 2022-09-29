import { rest } from 'msw'
import { eventListApiConfig } from '../../middleware/api/apiList'
import { mockEventList } from '../data/eventListData'
import { mockFeedbackFormList } from '../data/feedbackFormListData'

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
  // cancelEvent api mock
  rest.put(eventListApiConfig.cancelEvent, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // uploadFeedbackForm api mock
  rest.post(eventListApiConfig.uploadFeedbackForm, (_req, res, ctx) => {
    const statusResult = ctx.json({
      status: 200,
      data: {},
    })
    return res(statusResult)
  }),
  rest.get(eventListApiConfig.getFeedbackFormList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockFeedbackFormList,
      }),
    )
  }),
]

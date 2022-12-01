import { rest } from 'msw'
import { resignationListApiConfig } from '../../middleware/api/apiList'
import { mockClearanceDetails } from '../data/resignationListData'

export const resignationHandlers = [
  // clearanceCertificateComments api mock
  rest.get(resignationListApiConfig.getClearanceDetails, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockClearanceDetails,
      }),
    )
  }),
]

import { rest } from 'msw'
import { panDetailsApiConfig } from '../../middleware/api/apiList'
import { mockBankInformation } from '../data/panDetailsData'

export const panDetailsHandlers = [
  rest.get(panDetailsApiConfig.bankInformation, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockBankInformation },
      }),
    )
  }),
  rest.post(panDetailsApiConfig.updateFinanceInformation, (_req, res, ctx) => {
    const updateResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(updateResponse)
  }),
  rest.post(
    panDetailsApiConfig.uploadEmployeeFinanceDetails,
    (_req, res, ctx) => {
      const uploadResponse = ctx.json({
        status: 200,
        data: {},
      })
      return res(uploadResponse)
    },
  ),
]

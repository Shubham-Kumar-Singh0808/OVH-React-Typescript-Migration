import { rest } from 'msw'
import { bankDetailsApiConfig } from '../../middleware/api/apiList'
import { mockBankInformation } from '../data/panDetailsData'

export const bankDetailsHandlers = [
  rest.get(bankDetailsApiConfig.getBankNameLookup, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockBankInformation },
      }),
    )
  }),
  rest.post(bankDetailsApiConfig.saveBankInformation, (_req, res, ctx) => {
    const updateResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(updateResponse)
  }),
  rest.post(bankDetailsApiConfig.updateBankInformation, (_req, res, ctx) => {
    const uploadResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(uploadResponse)
  }),
  rest.delete(bankDetailsApiConfig.deleteBankAccount, (_req, res, ctx) => {
    const deleteResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(deleteResponse)
  }),
]

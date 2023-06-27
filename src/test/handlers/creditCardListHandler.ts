import { rest } from 'msw'
import { CreditCardListApiConfig } from '../../middleware/api/apiList'
import { mockCreditCardListData } from '../data/creditCardListData'

export const declarationFormHandlers = [
  // getCreditCardListInfo api mock
  rest.get(CreditCardListApiConfig.getCardsList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockCreditCardListData,
      }),
    )
  }),
]

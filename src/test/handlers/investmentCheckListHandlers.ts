import { rest } from 'msw'
import { InvestmentCheckListApiConfig } from '../../middleware/api/apiList'
import { mockInvestments, mockSections } from '../data/investmentCheckListData'

export const itDeclarationListHandlers = [
  // getSections api mock
  rest.get(InvestmentCheckListApiConfig.getSections, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockSections,
      }),
    )
  }),
  // getInvestments api mock
  rest.get(InvestmentCheckListApiConfig.getInvestments, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockInvestments,
      }),
    )
  }),
]

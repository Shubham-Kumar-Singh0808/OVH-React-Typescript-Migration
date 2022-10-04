import { rest } from 'msw'
import { dispHandbook, employeeHandbook } from '../../middleware/api/apiList'
import { mockHandbookList } from '../data/handbookListData'

export const employeeHandbookHandlers = [
  // getAllHandbookListApi mock
  rest.get(employeeHandbook.getHandbooks, (_req, res, ctx) => {
    const handbookResponse = ctx.json({
      status: 200,
      data: mockHandbookList,
    })
    return res(handbookResponse)
  }),
  rest.get(dispHandbook.dispHandbook, (_req, res, ctx) => {
    const showHandbookResponse = ctx.json({
      status: 200,
      data: mockHandbookList,
    })
    return res(showHandbookResponse)
  }),
]

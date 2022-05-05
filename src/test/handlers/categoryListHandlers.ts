import { categoriesApi } from '../../middleware/api/apiList'
import { mockCategories } from '../data/categoryListData'
import { rest } from 'msw'

export const categoryListHandlers = [
  // addCategory api mock
  rest.get(categoriesApi.addCategory, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // getAllCategories api mock
  rest.get(categoriesApi.getAllCategories, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllCategories api mock
  rest.get(categoriesApi.getAllCategories, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCategories))
  }),
]

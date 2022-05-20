import { qualificationCategoryApiConfig } from '../../middleware/api/apiList'
import { mockQualificationCategories } from '../data/qualificationCategoryListData'
import { rest } from 'msw'

export const qualificationCategoryListHandlers = [
  // addQualificationCategory api mock
  rest.get(
    qualificationCategoryApiConfig.addNewQualificationCategory,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  // getAllQualificationCategories api mock
  rest.get(
    qualificationCategoryApiConfig.getQualificationCategories,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllQualificationCategories api mock
  rest.get(
    qualificationCategoryApiConfig.getQualificationCategories,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockQualificationCategories))
    },
  ),
]

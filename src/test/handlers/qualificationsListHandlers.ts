import { qualificationsApi } from '../../middleware/api/apiList'
import { mockQualifications } from '../data/qualificationListData'
import { rest } from 'msw'

export const categoryListHandlers = [
  // getAllQualifications api mock
  rest.get(qualificationsApi.getEmployeeQualifications, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllQualifications api mock
  rest.get(qualificationsApi.getEmployeeQualifications, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockQualifications))
  }),
]

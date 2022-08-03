import { rest } from 'msw'
import { addNewTemplateApiConfig } from '../../middleware/api/apiList'
import { mockTemplateTypes } from '../data/addMailTemplateData'

export const categoryListHandlers = [
  // addTemplate api mock
  rest.get(addNewTemplateApiConfig.addNewMailTemplate, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // getAllTemplateTypes api mock
  rest.get(addNewTemplateApiConfig.getAssetTypes, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllTemplateTypes api mock
  rest.get(addNewTemplateApiConfig.getAssetTypes, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTemplateTypes))
  }),
]

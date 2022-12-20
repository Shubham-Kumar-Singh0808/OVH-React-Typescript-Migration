import { rest } from 'msw'
import { AddAchieverApiConfig } from '../../middleware/api/apiList'
import { mockAchievementTypeDetails } from '../data/AddAchieverData'

export const addAchieverHandlers = [
  rest.post(AddAchieverApiConfig.addAchievementType, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  rest.delete(AddAchieverApiConfig.deleteAchievementType, (_req, res, ctx) => {
    const response = ctx.json({
      status: 200,
      data: {},
    })
    return res(response)
  }),
  rest.get(AddAchieverApiConfig.getAchievementTypeDetails, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockAchievementTypeDetails,
      }),
    )
  }),
  rest.put(
    AddAchieverApiConfig.updateAchievementTypeDetails,
    (_req, res, ctx) => {
      const resp = ctx.json({
        status: 200,
        data: {},
      })
      return res(resp)
    },
  ),
]

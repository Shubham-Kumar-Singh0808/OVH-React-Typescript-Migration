import { rest } from 'msw'
import { AddAchieverApiConfig } from '../../middleware/api/apiList'
import {
  mockAchievementTypeDetails,
  mockActiveEmployeeList,
  mockEmployeeData,
} from '../data/AddAchieverData'

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
  rest.get(AddAchieverApiConfig.getImageData, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeeData,
      }),
    )
  }),
  rest.get(AddAchieverApiConfig.getActiveEmployeeList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockActiveEmployeeList,
      }),
    )
  }),
  rest.post(AddAchieverApiConfig.addAchievement, (_req, res, ctx) => {
    const respones = ctx.json({
      data: {},
      status: 200,
    })
    return res(respones)
  }),
]

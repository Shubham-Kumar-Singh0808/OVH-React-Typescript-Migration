import { mockUserRoleFeatures } from '../data/UserRoleFeaturesData'
import { mockUserRoleSubFeatures } from '../data/UserRoleSubFeaturesData'
import { mockUserRoles } from '../data/userRolesData'
import { rest } from 'msw'
import { userRolesConfigurationApi } from '../../middleware/api/apiList'

export const userRolesAndPermissionsHandlers = [
  // getUserRoles api mock
  rest.get(userRolesConfigurationApi.getUserRoles, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getUserRoles api mock
  rest.get(userRolesConfigurationApi.getUserRoles, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserRoles))
  }),
  // getUserRoleSubFeatures api mock
  rest.get(userRolesConfigurationApi.getSubFeatures, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getUserRoleSubFeatures api mock
  rest.get(userRolesConfigurationApi.getSubFeatures, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserRoleSubFeatures))
  }),
  // getUserRoleFeaturesUnderRole api mock
  rest.get(userRolesConfigurationApi.featuresUnderRole, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getUserRoleFeaturesUnderRole api mock
  rest.get(userRolesConfigurationApi.featuresUnderRole, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserRoleFeatures))
  }),
  // isUserRoleExists api mock
  rest.get(userRolesConfigurationApi.isUserRoleExists, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // isUserRoleExists api mock
  rest.get(userRolesConfigurationApi.isUserRoleExists, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  // addNewUserRole api mock
  rest.get(userRolesConfigurationApi.addNewUserRole, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]

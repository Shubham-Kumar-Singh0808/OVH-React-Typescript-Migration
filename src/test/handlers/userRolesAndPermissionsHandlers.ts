import { rest } from 'msw'
import { mockUserRoleFeatures } from '../data/UserRoleFeaturesData'
import { mockIncomingSubFeatures } from '../data/userRolesConfigurationData'
import { mockUserRoles } from '../data/userRolesData'
import { userRolesConfigurationApiConfig } from '../../middleware/api/apiList'

export const userRolesAndPermissionsHandlers = [
  // getUserRoles api mock
  rest.get(userRolesConfigurationApiConfig.getUserRoles, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getUserRoles api mock
  rest.get(userRolesConfigurationApiConfig.getUserRoles, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserRoles))
  }),
  // getUserRoleSubFeatures api mock
  rest.get(userRolesConfigurationApiConfig.getSubFeatures, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getUserRoleSubFeatures api mock
  rest.get(userRolesConfigurationApiConfig.getSubFeatures, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockIncomingSubFeatures))
  }),
  // getUserRoleFeaturesUnderRole api mock
  rest.get(
    userRolesConfigurationApiConfig.featuresUnderRole,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getUserRoleFeaturesUnderRole api mock
  rest.get(
    userRolesConfigurationApiConfig.featuresUnderRole,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockUserRoleFeatures))
    },
  ),
  // isUserRoleExists api mock
  rest.get(
    userRolesConfigurationApiConfig.isUserRoleExists,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // isUserRoleExists api mock
  rest.get(
    userRolesConfigurationApiConfig.isUserRoleExists,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    },
  ),
  // addNewUserRole api mock
  rest.get(userRolesConfigurationApiConfig.createUserRole, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]

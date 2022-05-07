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
]

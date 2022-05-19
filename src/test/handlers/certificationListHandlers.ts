import { qualificationsApiConfig } from '../../middleware/api/apiList'
import { mockCertificationCategories } from '../data/certificationListData'
import { rest } from 'msw'

export const certificationListHandlers = [
  // getAllQualificationCategories api mock
  rest.get(
    qualificationsApiConfig.getEmployeeCertificatesList,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllQualificationCategories api mock
  rest.get(
    qualificationsApiConfig.getEmployeeCertificatesList,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockCertificationCategories))
    },
  ),
]

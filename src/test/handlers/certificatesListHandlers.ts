import { qualificationsApi } from '../../middleware/api/apiList'
import { mockCertificates } from '../data/certificationListData'
import { rest } from 'msw'

export const certificatesListHandlers = [
  // getAllCertificates api mock
  rest.get(qualificationsApi.getEmployeeCertificatesList, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllCertificates api mock
  rest.get(qualificationsApi.getEmployeeCertificatesList, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCertificates))
  }),
]

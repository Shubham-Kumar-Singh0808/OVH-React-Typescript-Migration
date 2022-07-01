import { rest } from 'msw'
import { certificateListApiConfig } from '../../middleware/api/apiList'
import { mockCertificateList } from '../data/certificateListData'

export const certificateListHandlers = [
  //getAllEmployeeCertificates api mock
  rest.get(
    certificateListApiConfig.getAllEmployeeCertificates,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: { list: mockCertificateList },
        }),
      )
    },
  ),
]

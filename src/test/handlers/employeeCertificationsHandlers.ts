import { rest } from 'msw'
import { employeeCertificationsApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeCertifications } from '../data/employeeCertificationData'

export const employeeCertificationHandlers = [
  // getAllEmployeeSkills api mock
  rest.get(
    employeeCertificationsApiConfig.getEmployeeCertificates,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockEmployeeCertifications,
        }),
      )
    },
  ),
  //deleteEmployeeSkill api mock
  rest.delete(
    employeeCertificationsApiConfig.deleteEmployeeCertificate,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
]

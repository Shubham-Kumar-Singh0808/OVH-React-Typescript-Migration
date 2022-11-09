import { rest } from 'msw'
import { employeeSkillsApiConfig } from '../../middleware/api/apiList'
import { mockEmployeeSkills } from '../data/employeeSkillsData'

export const employeeSkillHandlers = [
  // getAllEmployeeSkills api mock
  rest.get(employeeSkillsApiConfig.getEmployeeSkills, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeeSkills,
      }),
    )
  }),
  //deleteEmployeeSkill api mock
  rest.delete(employeeSkillsApiConfig.deleteEmployeeSkill, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]

import { rest } from 'msw'
import { itDeclarationFormApiConfig } from '../../middleware/api/apiList'
import { mockInvestments } from '../data/investmentCheckListData'
import {
  mockEmployeeInformation,
  mockSections,
} from '../data/itDeclarationFormData'

export const declarationFormHandlers = [
  // getEmployeeInfo api mock
  rest.get(itDeclarationFormApiConfig.getEmployeeInfo, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeeInformation,
      }),
    )
  }),
  // getInvests api mock
  rest.get(
    itDeclarationFormApiConfig.getInvestsBySectionId,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockInvestments,
        }),
      )
    },
  ),
  // getSections api mock
  rest.get(
    itDeclarationFormApiConfig.getSectionsHavingInvests,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockSections,
        }),
      )
    },
  ),
  // isITDeclarationFormExist api mock
  rest.get(
    itDeclarationFormApiConfig.isITDeclarationFormExist,
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

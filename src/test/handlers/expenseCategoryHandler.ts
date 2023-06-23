// import { rest } from 'msw'
// import { categoryListApiConfig } from '../../middleware/api/apiList'
// import { mockExpenseCategory } from '../data/expenseCategoryData'

// export const expenseCategoryListHandlers = [
//   // getAllcategoryList api mock
//   rest.get(categoryListApiConfig.getCategoryList, (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         status: 200,
//         data: mockExpenseCategory,
//       }),
//     )
//   }),
//   // deletecategoryList api mock
//   rest.delete(categoryListApiConfig.deleteCategory, (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         status: 200,
//       }),
//     )
//   }),
//   // addcategoryList api mock
//   rest.put(categoryListApiConfig.updateCategory, (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         status: 200,
//         data: [],
//       }),
//     )
//   }),
//   // updatecategoryList api mock
//   // eslint-disable-next-line sonarjs/no-identical-functions
//   rest.get(categoryListApiConfig.editCategory, (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         status: 200,
//         data: [],
//       }),
//     )
//   }),
// ]
import { rest } from 'msw'
import { categoryListApiConfig } from '../../middleware/api/apiList'
import { mockExpenseCategory } from '../data/expenseCategoryData'

export const expenseCategoryListHandlers = [
  // getAllCategories api mock
  rest.get(categoryListApiConfig.getCategoryList, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllCategories api mock
  rest.get(categoryListApiConfig.getCategoryList, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockExpenseCategory))
  }),

  // editcategoryList api mock
  // eslint-disable-next-line sonarjs/no-identical-functions
  rest.get(categoryListApiConfig.editCategory, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),

  // deletecategoryList api mock
  // eslint-disable-next-line sonarjs/no-identical-functions
  rest.delete(categoryListApiConfig.deleteCategory, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]

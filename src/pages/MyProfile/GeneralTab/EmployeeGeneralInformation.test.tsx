import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import GeneralTab from './GeneralTab'
import { Provider } from 'react-redux'
import React from 'react'
import { employeeGeneralInformationApi } from '../../../middleware/api/apiList'
import { getEmployeeGeneralInformation } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { mockGeneralInformationData } from '../../../test/data/generalInformationData'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockUseDispatchValue = '1984'
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))
const url = employeeGeneralInformationApi.getLoggedInEmployeeData
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockGeneralInformationData)),
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(
      `Please add request handler for ${req.url.toString()} in your MSW server requests.`,
    )
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    )
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
const employeeId = '1997'
const employeeGeneralInformationSlice = () =>
  stateStore.getState().getLoggedInEmployeeData.generalInformation

describe('Employee General Information Testing', () => {
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformation(employeeId as string),
    )
    expect(employeeGeneralInformationSlice()).toMatchObject(
      mockGeneralInformationData,
    )
  })
})

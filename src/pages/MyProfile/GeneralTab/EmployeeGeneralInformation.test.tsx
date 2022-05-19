import '@testing-library/jest-dom'

import * as reactRedux from 'react-redux'

import { render, screen } from '@testing-library/react'

import EmployeeGeneralInformation from './GeneralInformation'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { employeeGeneralInformationApiConfig } from '../../../middleware/api/apiList'
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
const url = employeeGeneralInformationApiConfig.getLoggedInEmployeeData
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
  test('should render Sidebar menu without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeGeneralInformation />
      </ReduxProvider>,
    )
    screen.debug()
    expect(screen.getByText('General Information')).toBeInTheDocument()
  })
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformation(employeeId as string),
    )
    expect(employeeGeneralInformationSlice()).toMatchObject(
      mockGeneralInformationData,
    )
  })
})

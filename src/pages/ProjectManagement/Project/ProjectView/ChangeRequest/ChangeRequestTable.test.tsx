import '@testing-library/jest-dom'

import React from 'react'
import ChangeRequestTable from './ChangeRequestTable'
import { cleanup, render, screen } from '../../../../../test/testUtils'
import { mockChangeRequest } from '../../../../../test/data/projectChangeRequestData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ChangeRequestTable
      setEditChangeRequest={jest.fn()}
      setEditDescription={jest.fn()}
      setToggle={jest.fn()}
    />
  </div>
)

describe('ChangeRequestTable Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        projectChangeRequest: {
          changeRequestList: mockChangeRequest,
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockChangeRequest.size),
    ).toBeInTheDocument()
  })
  test('should render with data ', () => {
    expect(screen.getByText('vinay')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

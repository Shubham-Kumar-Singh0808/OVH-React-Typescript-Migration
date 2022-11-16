import React from 'react'
import '@testing-library/jest-dom'
import ResignationViewList from './ResignationViewList'
import { mockResignationView } from '../../../test/data/submitViewResignationData'
import { render, screen } from '../../../test/testUtils'

describe('ResignationViewList Component Testing', () => {
  describe('should render ResignationViewList with data', () => {
    render(<ResignationViewList />, {
      preloadedState: {
        submitViewResignation: {
          resignationView: mockResignationView,
        },
      },
    })

    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('Resigned')).toBeInTheDocument()
      expect(screen.getByText('12/03/2022')).toBeInTheDocument()
    })
  })
})

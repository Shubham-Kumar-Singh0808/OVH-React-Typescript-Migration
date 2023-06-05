import React from 'react'
import '@testing-library/jest-dom'
import SQAAuditTimeLine from './SQAAuditTimeLine'
import { render, screen } from '../../../test/testUtils'
import { mockSQAAuditHistoryDetails } from '../../../test/data/sqaAuditReportData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAAuditTimeLine />
  </div>
)

describe('SQAAuditTimeLine Component Testing', () => {
  describe('should render SQAAuditTimeLine Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          sqaAuditReport: {
            sqaAuditHistory: mockSQAAuditHistoryDetails,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockSQAAuditHistoryDetails.list.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('Testmarch')).toBeInTheDocument()
      expect(screen.getByText('Demo Project Testing')).toBeInTheDocument()
      expect(screen.getByText('Prasadarao Bhiri')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('Mamatha Thunam')).toBeInTheDocument()
      expect(screen.getByText('06-Mar-2023 05:08:48 PM')).toBeInTheDocument()
    })
    test('should render created button with data ', () => {
      const createdElement = screen.getAllByTestId('created-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('sqa-update-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
  })
})

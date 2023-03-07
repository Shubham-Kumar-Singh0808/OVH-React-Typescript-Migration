import React from 'react'
import '@testing-library/jest-dom'
import SQAReportDetails from './SQAReportDetails'
import { render, screen } from '../../../test/testUtils'
import { mockSQAAuditViewReport } from '../../../test/data/sqaAuditReportData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAReportDetails />
  </div>
)

describe('SQAReportDetails Component Testing', () => {
  describe('should render SQAReportDetails Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          sqaAuditReport: {
            getAuditDetails: mockSQAAuditViewReport,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('test3')).toBeInTheDocument()
      expect(screen.getByText('Open')).toBeInTheDocument()
      expect(screen.getByText('java spring boot')).toBeInTheDocument()
    })
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppraisalConfigurations from './AppraisalConfigurations'
import { render } from '../../../test/testUtils'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('AppraisalConfigurations without data', () => {
  beforeEach(() => {
    render(<AppraisalConfigurations />, {
      preloadedState: {
        appraisalCycleSlice: {
          appraisalCycle: mockAppraisalCycle,
          isLoading: ApiLoadingState.idle,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should be able to render  AppraisalConfigurations  Title', () => {
    expect(screen.getByText('Appraisal Configurations')).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Add Configuration',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
})

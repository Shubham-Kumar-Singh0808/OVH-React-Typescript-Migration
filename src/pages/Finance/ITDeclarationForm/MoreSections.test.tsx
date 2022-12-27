import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MoreSections from './MoreSections'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/investmentCheckListData'

const cancelButton = 'df-cancel-btn'
const mockCancelSectionHandler = jest.fn()
describe('More Sections Component Testing', () => {
  beforeEach(() => {
    render(
      <MoreSections
        sectionItem={{
          sectionId: 1,
          sectionName: '80 C',
          sectionLimit: 100000,
          invests: mockInvestments,
        }}
        handleShowRemoveSectionModal={jest.fn()}
        handleConfirmCancelSection={mockCancelSectionHandler}
        setSectionList={jest.fn()}
        sectionList={[]}
        index={0}
        setFormSectionList={jest.fn()}
        formSectionList={[]}
      />,
      {
        preloadedState: {
          itDeclarationForm: {
            isLoading: ApiLoadingState.succeeded,
            sections: mockSections,
            investments: mockInvestments,
          },
        },
      },
    )
  })
  test('should render Section Name', () => {
    expect(screen.getByText('Sections:')).toBeInTheDocument()
    expect(screen.getByText('80 C')).toBeInTheDocument()
  })
  test('should render cancel section button', () => {
    const cancelSection = screen.getByTestId(cancelButton)
    userEvent.click(cancelSection)
    expect(mockCancelSectionHandler).toBeCalledTimes(0)
  })
})

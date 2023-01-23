import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import InvestmentCheckListEntry from './InvestmentCheckListEntry'
import { render, screen } from '../../../test/testUtils'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/investmentCheckListData'

const mockSectionsData = {
  sectionId: '6',
  sectionName: '80 E',
  sectionLimit: '100000',
  invests: [
    {
      investmentId: 10,
      investmentName: 'Interest on Education Loan for Higher Studies',
      maxLimit: 0,
      description:
        'Applicable only for taxpayer, spouse or children or for a student for whom the taxpayer is a legal guardian.<br/><div><br/></div>',
      requiredDocs: 'Interest certificate from Bank',
      sectionId: 6,
      sectionName: '80 E',
    },
  ],
}

const mockSetSelectedSectionId = jest.fn()
const mockSetIsIconVisible = jest.fn()
const toRender = (
  <InvestmentCheckListEntry
    id={1}
    section={{
      sectionId: 6,
      sectionName: mockSectionsData.sectionName,
      sectionLimit: mockSectionsData.sectionLimit,
      invests: [],
    }}
    selectedSectionId={6}
    setSelectedSectionId={mockSetSelectedSectionId}
    isIconVisible={true}
    setIsIconVisible={mockSetIsIconVisible}
  />
)

describe('Investment CheckList Entry Component testing with different data', () => {
  beforeEach(() => {
    render(
      <InvestmentCheckListEntry
        id={1}
        selectedSectionId={6}
        setSelectedSectionId={mockSetSelectedSectionId}
        isIconVisible={false}
        setIsIconVisible={mockSetIsIconVisible}
        section={{
          sectionId: 0,
          sectionName: '',
          sectionLimit: 0,
          invests: [],
        }}
      />,
      {
        preloadedState: {
          investmentCheckList: {
            investments: mockInvestments,
            sections: mockSections,
          },
        },
      },
    )
  })
  test('should render collapseIcon', () => {
    const rowCollapseIcon = screen.getByTestId('ic-collapseIcon')
    userEvent.click(rowCollapseIcon)
    expect(rowCollapseIcon).toBeTruthy()
  })
})

import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import MailTemplateTypeTable from './MailTemplateTypeTable'
import { render, screen } from '../../../../test/testUtils'
import { mockMailTemplateTypes } from '../../../../test/data/addMailTemplateTypeData'

describe('Mail Template Table Component Testing', () => {
  test('should render mailTemplate List Table component with out crashing', () => {
    render(<MailTemplateTypeTable />, {
      preloadedState: {
        addMailTemplateType: {
          mailTemplateType: mockMailTemplateTypes,
        },
      },
    })
    const deleteBtn = screen.getByTestId('btn-delete0')
    userEvent.click(deleteBtn)
    expect(screen.getByText('Delete TemplateType'))
  })
})

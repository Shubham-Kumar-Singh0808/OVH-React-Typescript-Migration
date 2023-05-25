import React from 'react'
import ChangeReporteeFilterOptions from './ChangeReporteeFilterOptions'
import { fireEvent, render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ChangeReporteeFilterOptions />
  </div>
)

describe('ChangeReportees FilterOptions testing', () => {
  test('Verify that user can select another Category Manager', () => {
    render(toRender, {
      preloadedState: {},
    })
    const reportees = screen.getByRole('radio', { name: 'Reportees' })
    const hrAssociates = screen.getByRole('radio', { name: 'HR Associates' })
    expect(reportees).toBeChecked()
    fireEvent.click(hrAssociates)
    expect(reportees).not.toBeChecked()
    expect(hrAssociates).toBeChecked()
  })
})

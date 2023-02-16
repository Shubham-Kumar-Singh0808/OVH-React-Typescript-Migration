import React from 'react'
import '@testing-library/jest-dom'
import SelectProjectName from './SelectProjectName'
import { cleanup, fireEvent, render, screen } from '../../../test/testUtils'
import { mockProjectNames } from '../../../test/data/allocateEmployeeData'
import { mockGetAuditDetails } from '../../../test/data/editAuditFormData'

describe('ProjectName Component', () => {
  describe('Empty value of  ProjectName Component', () => {
    beforeEach(() => {
      render(
        <SelectProjectName
          projects={mockProjectNames}
          setSelectProjectId={jest.fn()}
          projectValue={mockGetAuditDetails.projectName}
        />,
        {
          preloadedState: {
            allocateEmployee: {
              getAllProjects: mockProjectNames,
            },
            addNewAuditForm: {
              editAuditFormDetails: mockGetAuditDetails,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should be able to render Project Component Title', () => {
      expect(screen.getByText('ABS CBN Support')).toBeInTheDocument()
    })

    test('should be able to render ProjectName Component label', () => {
      expect(screen.getByText('Project Name :')).toBeTruthy()
    })

    // test('should be able to render ProjectName Component placeholder', () => {
    //   expect(screen.getByRole('combobox')).toBeInTheDocument()
    // })
    // test('should be able to enter in input field', () => {
    //   const input = screen.getByPlaceholderText('Project Name')
    //   expect(input).toHaveValue('')
    // })

    // test('should be able to call onChange', () => {
    //   const input = screen.getByRole('combobox')
    //   fireEvent.change(input, 'Vinesh')
    //   expect(input).toHaveValue('')
    // })
    // test('should be able to call onSelect', () => {
    //   const input = screen.getByRole('combobox')

    //   fireEvent.select(input, 'Vinesh')
    //   expect(input).toHaveValue('')
    // })
  })
})

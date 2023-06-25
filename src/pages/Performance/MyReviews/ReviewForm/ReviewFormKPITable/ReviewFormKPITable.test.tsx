import React from 'react'
import ReviewFormKPITable from './ReviewFormKPITable'
import { cleanup, render, screen } from '../../../../../test/testUtils'
import { mockInitialEmployeeAppraisalForm } from '../../../../../test/data/myReviewData'
import {
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
} from '../../../../../types/Performance/MyReview/myReviewTypes'

const chosenKraIndex = 1
const chosenKraId = mockInitialEmployeeAppraisalForm.kra[chosenKraIndex].id
const chosenKpis = mockInitialEmployeeAppraisalForm.kra[chosenKraIndex].kpis

const managerRating = 'Manager Rating'
const managerComments = 'Manager Comments'

describe('My Review KPI Table', () => {
  describe('render component when employee has not submitted the form', () => {
    beforeEach(() => {
      render(<ReviewFormKPITable kraId={chosenKraId} kpis={chosenKpis} />, {
        preloadedState: {
          myReview: {
            myReviewFormStatus: MyReviewFormStatus.saveForEmployee,
            appraisalForm: {
              appraisalFormStatus: null,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('all correct columns are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'KPI Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Self Rating' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Comments' }),
      ).toBeTruthy()
    })

    test('correct number of kpis are rendered', () => {
      expect(screen.getAllByTestId('myReview-kpiRow')).toHaveLength(
        chosenKpis.length,
      )
    })
  })

  describe('render component when employee has submitted', () => {
    beforeEach(() => {
      render(<ReviewFormKPITable kraId={chosenKraId} kpis={chosenKpis} />, {
        preloadedState: {
          myReview: {
            // changing this only as this component and manager columns is depending only on these 2 properties
            myReviewFormStatus: MyReviewFormStatus.submitForEmployee,
            appraisalForm: {
              appraisalFormStatus: null,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('manager columns are still not rendered', () => {
      expect(
        screen.queryByRole('columnheader', { name: managerRating }),
      ).not.toBeTruthy()
      expect(
        screen.queryByRole('columnheader', { name: managerComments }),
      ).not.toBeTruthy()
    })
  })

  describe('render component for manager', () => {
    beforeEach(() => {
      render(<ReviewFormKPITable kraId={chosenKraId} kpis={chosenKpis} />, {
        preloadedState: {
          myReview: {
            // changing this only as this component and manager columns is depending only on these 2 properties
            myReviewFormStatus: MyReviewFormStatus.submitForEmployee,
            appraisalForm: {
              appraisalFormStatus:
                MyReviewAppraisalFormStatus.NotSubmittedByYou,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('manager columns are still rendered forever', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'KPI Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Self Rating' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Comments' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: managerRating }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: managerComments }),
      ).toBeTruthy()
    })
  })

  describe('render component for employee after manager has submitted', () => {
    beforeEach(() => {
      render(<ReviewFormKPITable kraId={chosenKraId} kpis={chosenKpis} />, {
        preloadedState: {
          myReview: {
            // changing this only as this component and manager columns is depending only on these 2 properties
            myReviewFormStatus: MyReviewFormStatus.pendingagreement,
            appraisalForm: {
              appraisalFormStatus: null,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('manager columns are rendered for employee now onwards', () => {
      expect(
        screen.getByRole('columnheader', { name: managerRating }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: managerComments }),
      ).toBeTruthy()
    })
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import AppraisalForm from './AppraisalForm'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AppraisalForm />
  </div>
)

describe('Review Form Component Testing', () => {
  test('should render ReviewForm component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('My Review')).toBeInTheDocument()
  })
})

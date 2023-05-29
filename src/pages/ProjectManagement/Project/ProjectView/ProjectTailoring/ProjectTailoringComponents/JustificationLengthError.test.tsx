import React from 'react'
import JustificationLengthError from './JustificationLengthError'
import { render, screen, cleanup } from '../../../../../../test/testUtils'

const toRender = <JustificationLengthError showError={true} length={20} />

describe('Justification Length Error - Project Tailoring', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  screen.debug()

  test('error is rendered and text is correct', () => {
    expect(screen.getByText('Please write 20 characters')).toBeInTheDocument()
  })
})

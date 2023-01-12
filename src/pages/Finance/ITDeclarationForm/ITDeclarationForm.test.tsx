import '@testing-library/jest-dom'
import React from 'react'
import ITDeclarationForm from './ITDeclarationForm'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationForm />
  </div>
)

describe('IT Declaration Form Component Testing', () => {
  test('should render IT Declaration Form component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('IT Declaration Form')).toBeInTheDocument()
  })
})

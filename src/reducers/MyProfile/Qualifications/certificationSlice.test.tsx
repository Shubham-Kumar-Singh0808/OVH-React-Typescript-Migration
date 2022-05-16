import certificationSlice from './certificationSlice'

describe('Certification Section Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = certificationSlice(initialState, action)
    expect(result).toEqual({})
  })
})

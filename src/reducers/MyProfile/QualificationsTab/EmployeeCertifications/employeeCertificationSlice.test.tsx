import { ApiLoadingState } from '../../../../middleware/api/apiList'
import employeeCertificationsSlice from '../../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { EditEmployeeCertificates } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

describe('Certification Section Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeCertificationsSlice(initialState, action)
    expect(result).toEqual({
      editCertificateDetails: {} as EditEmployeeCertificates,
      getAllTechnologies: [],
      typeOfCertificate: [],
      certificationDetails: [],
      error: null,
      isLoading: ApiLoadingState.idle,
    })
  })
})

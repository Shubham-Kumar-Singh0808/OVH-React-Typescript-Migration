import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { EditEmployeeCertificates } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import employeeCertificatesSlice from '../../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'

describe('Certification Section Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeCertificatesSlice(initialState, action)
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

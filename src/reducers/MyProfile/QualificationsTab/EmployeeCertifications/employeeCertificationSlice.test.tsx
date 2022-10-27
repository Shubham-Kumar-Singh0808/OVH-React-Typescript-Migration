import employeeCertificateReducer, {
  employeeCertificateService,
} from './employeeCertificationSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { EditEmployeeCertificate } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { mockEmployeeCertifications } from '../../../../test/data/employeeCertificationData'

describe('employeeCertifications Slice', () => {
  describe('employeeCertificationsReducer', () => {
    const initialState = {
      editCertificateDetails: {} as EditEmployeeCertificate,
      getAllTechnologies: [],
      typeOfCertificate: [],
      certificationDetails: [],
      selectedEmployeeCertifications: [],
      error: null,
      isLoading: ApiLoadingState.idle,
    }
    it('Should be able to set isLoading to "loading" if getEmployeeCertificates is pending', () => {
      const action = {
        type: employeeCertificateService.getEmployeeCertificates.pending.type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: null,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getEmployeeCertificates is fulfilled', () => {
      const action = {
        type: employeeCertificateService.getEmployeeCertificates.fulfilled.type,
        payload: mockEmployeeCertifications,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: mockEmployeeCertifications,
        selectedEmployeeCertifications: [],
        error: null,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getEmployeeCertificates is rejected', () => {
      const action = {
        type: employeeCertificateService.getEmployeeCertificates.rejected.type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: undefined,
        isLoading: ApiLoadingState.failed,
      })
    })
    it('Should be able to set isLoading to "loading" if deleteEmployeeCertificate is pending', () => {
      const action = {
        type: employeeCertificateService.deleteEmployeeCertificate.pending.type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: null,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "succeeded" if deleteEmployeeCertificate is fulfilled', () => {
      const action = {
        type: employeeCertificateService.deleteEmployeeCertificate.fulfilled
          .type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: null,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "succeeded" if deleteEmployeeCertificate is rejected', () => {
      const action = {
        type: employeeCertificateService.deleteEmployeeCertificate.rejected
          .type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: undefined,
        isLoading: ApiLoadingState.failed,
      })
    })
    it('Should be able to set isLoading to "loading" if getEmployeeCertificate is pending', () => {
      const action = {
        type: employeeCertificateService.getEmployeeCertificate.pending.type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: null,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getEmployeeCertificate is rejected', () => {
      const action = {
        type: employeeCertificateService.getEmployeeCertificate.rejected.type,
      }
      const state = employeeCertificateReducer(initialState, action)
      expect(state).toEqual({
        editCertificateDetails: {} as EditEmployeeCertificate,
        getAllTechnologies: [],
        typeOfCertificate: [],
        certificationDetails: [],
        selectedEmployeeCertifications: [],
        error: undefined,
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})

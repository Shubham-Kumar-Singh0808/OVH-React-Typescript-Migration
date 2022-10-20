import employeeSkillReducer, {
  employeeSkillServices,
} from './employeeSkillSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { EditEmployeeSkills } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import { mockEmployeeSkills } from '../../../../test/data/employeeSkillsData'

describe('employeeSkill Slice', () => {
  describe('employeeSkillReducer', () => {
    const initialState = {
      isLoading: true,
      skillDetails: [],
      selectedEmployeeSkills: [],
      AddEditSkill: {} as EditEmployeeSkills,
      CategorySkillList: [],
    }
    it('Should be able to set isLoading to "loading" if getEmployeeSkills is pending', () => {
      const action = {
        type: employeeSkillServices.getEmployeeSkills.pending.type,
      }
      const state = employeeSkillReducer(initialState, action)
      expect(state).toEqual({
        isLoading: true,
        skillDetails: [],
        selectedEmployeeSkills: [],
        AddEditSkill: {} as EditEmployeeSkills,
        CategorySkillList: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllEvents is fulfilled', () => {
      const action = {
        type: employeeSkillServices.getEmployeeSkills.fulfilled.type,
        payload: mockEmployeeSkills,
      }
      const state = employeeSkillReducer(initialState, action)
      expect(state).toEqual({
        isLoading: false,
        skillDetails: mockEmployeeSkills,
        selectedEmployeeSkills: [],
        AddEditSkill: {} as EditEmployeeSkills,
        CategorySkillList: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if getEmployeeSkills is rejected', () => {
      const action = {
        type: employeeSkillServices.getEmployeeSkills.rejected.type,
      }
      const state = employeeSkillReducer(initialState, action)
      expect(state).toEqual({
        isLoading: false,
        skillDetails: [],
        selectedEmployeeSkills: [],
        AddEditSkill: {} as EditEmployeeSkills,
        CategorySkillList: [],
      })
    })
  })
})

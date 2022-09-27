import reducer, { addTemplateService } from './addMailTemplateSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAssetTypes } from '../../../../test/data/addMailTemplateData'

describe('addNewMailTemplate Slice', () => {
  describe('Reducer', () => {
    const initialAddNewMailTemplateState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      getAllLookups: {
        assetTypeList: [],
      },
    }

    it('Should be able to set isLoading to "loading" if getAssetTypes is pending', () => {
      const action = {
        type: addTemplateService.getAssetTypes.pending.type,
      }
      const state = reducer(initialAddNewMailTemplateState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        getAllLookups: {
          assetTypeList: [],
        },
      })
    })

    it('Should be able to set isLoading to "failed" if getAssetTypes is rejected', () => {
      const rejectedAction = {
        type: addTemplateService.getAssetTypes.rejected.type,
      }
      const state = reducer(initialAddNewMailTemplateState, rejectedAction)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        getAllLookups: {
          assetTypeList: [],
        },
      })
    })

    it('Should be able to set isLoading to "success" if getAssetTypes is fulfilled', () => {
      const action = {
        type: addTemplateService.getAssetTypes.fulfilled.type,
        payload: mockAssetTypes,
      }
      const state = reducer(initialAddNewMailTemplateState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        getAllLookups: {
          assetTypeList: mockAssetTypes.assetTypeList,
        },
      })
    })
    it('Should be able to set isLoading to "failed" if addNewMailTemplate is rejected', () => {
      const rejectedAction = {
        type: addTemplateService.addNewMailTemplate.rejected.type,
      }
      const state = reducer(initialAddNewMailTemplateState, rejectedAction)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        getAllLookups: {
          assetTypeList: [],
        },
      })
    })
    it('Should be able to set isLoading to "success" if addNewMailTemplate is fulfilled', () => {
      const action = {
        type: addTemplateService.addNewMailTemplate.fulfilled.type,
      }
      const state = reducer(initialAddNewMailTemplateState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        getAllLookups: {
          assetTypeList: [],
        },
      })
    })

    it('Should be able to set isLoading to "loading" if addNewMailTemplate is pending', () => {
      const pendingAction = {
        type: addTemplateService.addNewMailTemplate.pending.type,
      }
      const state = reducer(initialAddNewMailTemplateState, pendingAction)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        getAllLookups: {
          assetTypeList: [],
        },
      })
    })
  })
})

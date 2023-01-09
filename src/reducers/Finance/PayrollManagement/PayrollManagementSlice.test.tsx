import PayrollManagementReducer, {
  initialPayrollManagementState,
  payrollManagementService,
} from './PayrollManagementSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetPaySlipReportResponse,
  CurrentPayslip,
} from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

describe('Payroll Management Slice', () => {
  describe('readExcelFile test', () => {
    it('Should be able to set isLoading to "loading" if readExcelFile is pending', () => {
      const action = {
        type: payrollManagementService.readExcelFile.pending.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "success" if readExcelFile is fulfilled', () => {
      const action = {
        type: payrollManagementService.readExcelFile.fulfilled.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: undefined,
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "failed" if readExcelFile is rejected', () => {
      const action = {
        type: payrollManagementService.readExcelFile.rejected.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })
  })
  describe('saveExcelFile test', () => {
    it('Should be able to set isLoading to "loading" if saveExcelFile is pending', () => {
      const action = {
        type: payrollManagementService.saveExcelFile.pending.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "success" if saveExcelFile is fulfilled', () => {
      const action = {
        type: payrollManagementService.saveExcelFile.fulfilled.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: undefined,
      })
    })

    it('Should be able to set isLoading to "failed" if saveExcelFile is rejected', () => {
      const action = {
        type: payrollManagementService.saveExcelFile.rejected.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })
  })
  describe('getCurrentPayslip test', () => {
    it('Should be able to set isLoading to "loading" if getCurrentPayslip is pending', () => {
      const action = {
        type: payrollManagementService.getCurrentPayslip.pending.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "success" if getCurrentPayslip is fulfilled', () => {
      const action = {
        type: payrollManagementService.getCurrentPayslip.fulfilled.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: undefined,
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "failed" if getCurrentPayslip is rejected', () => {
      const action = {
        type: payrollManagementService.getCurrentPayslip.rejected.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })
  })

  describe('updatePayslip test', () => {
    it('Should be able to set isLoading to "loading" if updatePayslip is pending', () => {
      const action = {
        type: payrollManagementService.updatePayslip.pending.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "success" if updatePayslip is fulfilled', () => {
      const action = {
        type: payrollManagementService.updatePayslip.fulfilled.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: undefined,
        excelData: [],
        uplaodExcelFile: [],
      })
    })

    it('Should be able to set isLoading to "failed" if updatePayslip is rejected', () => {
      const action = {
        type: payrollManagementService.updatePayslip.rejected.type,
      }
      const state = PayrollManagementReducer(
        initialPayrollManagementState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        currentPaySlipData: {} as GetPaySlipReportResponse,
        listSize: 0,
        paySlipInfo: [],
        paySlipList: { list: [], size: 0 },
        editPayslip: {} as CurrentPayslip,
        excelData: [],
        uplaodExcelFile: [],
      })
    })
  })
})

describe('deletePayslip test', () => {
  it('Should be able to set isLoading to "loading" if deletePayslip is pending', () => {
    const action = {
      type: payrollManagementService.deletePayslip.pending.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.loading,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "success" if deletePayslip is fulfilled', () => {
    const action = {
      type: payrollManagementService.deletePayslip.fulfilled.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.succeeded,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "failed" if deletePayslip is rejected', () => {
    const action = {
      type: payrollManagementService.deletePayslip.rejected.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.failed,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })
})

describe('deleteCheckedPayslips test', () => {
  it('Should be able to set isLoading to "loading" if deleteCheckedPayslips is pending', () => {
    const action = {
      type: payrollManagementService.deleteCheckedPayslips.pending.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.loading,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "success" if deleteCheckedPayslips is fulfilled', () => {
    const action = {
      type: payrollManagementService.deleteCheckedPayslips.fulfilled.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.succeeded,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "failed" if deleteCheckedPayslips is rejected', () => {
    const action = {
      type: payrollManagementService.deleteCheckedPayslips.rejected.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.failed,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })
})

describe('deleteCheckedPayslips test', () => {
  it('Should be able to set isLoading to "loading" if searchEmployee is pending', () => {
    const action = {
      type: payrollManagementService.searchEmployee.pending.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.loading,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "success" if searchEmployee is fulfilled', () => {
    const action = {
      type: payrollManagementService.searchEmployee.fulfilled.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.succeeded,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: undefined,
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "failed" if searchEmployee is rejected', () => {
    const action = {
      type: payrollManagementService.searchEmployee.rejected.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.failed,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })
})

describe('downloadExcelFile test', () => {
  it('Should be able to set isLoading to "loading" if downloadExcelFile is pending', () => {
    const action = {
      type: payrollManagementService.downloadExcelFile.pending.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.loading,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "success" if downloadExcelFile is fulfilled', () => {
    const action = {
      type: payrollManagementService.downloadExcelFile.fulfilled.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.succeeded,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })

  it('Should be able to set isLoading to "failed" if downloadExcelFile is rejected', () => {
    const action = {
      type: payrollManagementService.downloadExcelFile.rejected.type,
    }
    const state = PayrollManagementReducer(
      initialPayrollManagementState,
      action,
    )
    expect(state).toEqual({
      isLoading: ApiLoadingState.failed,
      error: null,
      currentPaySlipData: {} as GetPaySlipReportResponse,
      listSize: 0,
      paySlipInfo: [],
      paySlipList: { list: [], size: 0 },
      editPayslip: {} as CurrentPayslip,
      excelData: [],
      uplaodExcelFile: [],
    })
  })
})

import {
  Invest,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import {
  FormInvestment,
  FormSection,
  ITForm,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { interchangeMonthAndDay } from '../ITDeclarationForm/ITDeclarationFormHelpers'

export const initialITForm: ITForm = {
  cycleId: 0,
  designation: '',
  employeeId: 0,
  employeeName: '',
  filePath: null,
  formSectionsDTOs: [],
  fromDate: '',
  grandTotal: 0,
  isAgree: null,
  itDeclarationFormId: 0,
  organisationName: '',
  panNumber: '',
  toDate: '',
}

export const numbersOnlyRegex = /\D/g

export const initialFormInvestment: FormInvestment = {
  formInvestmentId: null,
  investmentId: -1,
  investmentName: null,
  customAmount: '',
}

export const initialInvestObject: Invest = {
  investmentId: -1,
  investmentName: '',
  maxLimit: 0,
  description: null,
  requiredDocs: '',
  sectionId: -1,
  sectionName: '',
}

export const getSubTotalAmountOfEachSection = (
  investmentList: FormInvestment[],
): number => {
  return investmentList.reduce(
    (accum, currentInvestment) => accum + +currentInvestment.customAmount,
    0,
  )
}

export const getSectionById = (
  originalSectionList: Sections[],
  sectionId: number,
): Sections => {
  return originalSectionList?.filter(
    (section) => section.sectionId === sectionId,
  )[0]
}

export const getInvestmentById = (
  originalSectionList: Sections[],
  sectionId: number,
  investmentId: number,
): Invest => {
  const finalInvestment = originalSectionList
    .filter((section) => section.sectionId === sectionId)[0]
    .invests.filter((investment) => investment.investmentId === investmentId)[0]
  if (finalInvestment === undefined) {
    return initialInvestObject
  }
  return finalInvestment
}

export const findFormSectionById = (
  sectionList: FormSection[],
  sectionId: number,
): FormSection | undefined => {
  return sectionList.find((sections) => sections.sectionId === sectionId)
}

export const isInvestmentNotFilledOut = (
  userSections: FormSection[],
): boolean => {
  return userSections.some((section) =>
    section.formInvestmentDTO.some(
      (investment) =>
        investment.customAmount === initialFormInvestment.customAmount ||
        investment.customAmount === '' ||
        investment.investmentId === initialFormInvestment.investmentId,
    ),
  )
}

export const getInvestmentDataFromInvestType = (
  sectionsWithInvests: Sections[],
  sectionId: number,
  investment: FormInvestment,
): Invest => {
  const section = sectionsWithInvests?.filter(
    (section) => section.sectionId === sectionId,
  )[0]
  const finalInvestment = section?.invests.filter(
    (invest) => invest.investmentId === investment.investmentId,
  )[0]
  if (finalInvestment === undefined) {
    return initialInvestObject //if new investment / section
  }
  return finalInvestment
}

export const getGrandTotalFromSubSectionsTotal = (
  userSections: FormSection[],
): number => {
  let totalSum = 0
  for (let i = 0; i < userSections.length; i++) {
    totalSum += getSubTotalAmountOfEachSection(
      userSections[i].formInvestmentDTO,
    )
  }
  return totalSum
}

export const isSubSectionTotalExceedingMaxLimit = (
  userSections: FormSection[],
): boolean => {
  for (let i = 0; i < userSections.length; i++) {
    const sectionSum = getSubTotalAmountOfEachSection(
      userSections[i].formInvestmentDTO,
    )
    if (sectionSum > userSections[i].maxLimit) {
      return true
    }
  }
  return false
}

export const isDateValid = (dateString: string): boolean => {
  return !isNaN(new Date(dateString).getTime())
}

export const returnEmptyStringIfDateInvalid = (dateString: string): string => {
  if (isDateValid(dateString)) {
    return interchangeMonthAndDay(dateString)
  }
  return ''
}

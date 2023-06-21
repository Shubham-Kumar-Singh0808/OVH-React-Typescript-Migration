import moment from 'moment'
import { emptyString } from '../../../constant/constantData'
import {
  FormInvestmentDTO,
  Invest,
  Investment,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import { deviceLocale } from '../../../utils/dateFormatUtils'

export const initialInvestment: Investment = {
  id: 1,
  investmentId: '',
  customAmount: '',
  requiredDocs: '',
  description: null,
}
export const initialSections: Sections = {
  sectionId: -1,
  sectionName: emptyString,
  sectionLimit: -1,
  invests: [],
}
export const defaultSelectSection = 'Select Section'

export const reNumberSerialsOfInvestmentListAndRemove = (
  list: Investment[],
  removedInvestmentId: number,
): Investment[] => {
  const indexInList = list.findIndex(
    (item) => +item.investmentId === removedInvestmentId,
  )
  if (indexInList !== -1) {
    const newList = [
      ...list.slice(0, indexInList),
      ...list.slice(indexInList + 1),
    ]

    // update the sno property of remaining items
    newList.forEach((item, i) => {
      item.id = i + 1
    })
    return newList
  }
  return list
}

export const convertInvestmentToFormInvestmentDTO = (
  list: Investment[],
): FormInvestmentDTO[] => {
  const newList: FormInvestmentDTO[] = list.map((item) => ({
    investmentId: +item.investmentId,
    customAmount: item.customAmount,
  }))

  return newList
}

export const getInvestment = (
  sectionList: Sections[],
  index: number,
  investmentId: number,
): undefined | Invest => {
  return sectionList[index].invests.find(
    (item) => item.investmentId === investmentId,
  )
}

export const formLabelProps = {
  htmlFor: 'inputSection',
  className: 'col-form-label sections-label',
}

export const getFormattedDate = (enteredDate: string): string => {
  return enteredDate
    ? moment(
        new Date(enteredDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('DD/MM/YYYY')
    : ''
}

// this is being used in other components too.....
export const interchangeMonthAndDay = (enteredDate: string): string => {
  if (enteredDate === '') {
    return ''
  }
  const parts = enteredDate.split('/')
  const date = new Date(+parts[2], +parts[0] - 1, +parts[1]) // year, month (zero-based), day
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const compareDate = (cycleDate: string, joinDate: string): boolean => {
  const cycleDateParse = Date.parse(cycleDate)
  const joinDateParse = Date.parse(joinDate)
  return cycleDateParse < joinDateParse
}

// used to convert the incoming date to words date of format [month, day, year]
export const getWordsDate = (dateString: string): Array<string> => {
  const [day, month, year] = dateString.split('/')

  const date = new Date(`${month}/${day}/${year}`)
  const chck = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return chck.split(' ').map((item) => item.replace(',', '')) //month, day, year
}

export const declareStatement =
  'I, declare that the above statement is true to the best of my knowledge and belief. In the event of any change that may occur during the year pertaining to the information given in the form, I undertake to inform the same to the company. Income Tax liability arising due to failure, if any, for not making / not intimating payment / investment made or proposed to be made by me and / or any wrong declaration would be my responsibility. I further undertake to provide all documentary proofs of payment made by me and if I fail to do so, the company can make full deduction of income tax dues from salary.'

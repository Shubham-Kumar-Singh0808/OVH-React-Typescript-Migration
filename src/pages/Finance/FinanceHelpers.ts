import { BankInfo } from '../../types/Finance/PanDetails/panDetailsTypes'

export const getSortedBankInfoBasedOnAccNo = (list: BankInfo[]): BankInfo[] => {
  const sortedList = [...list]
  return sortedList.sort((a, b) => {
    const bankAccNumA = a.bankAccountNumber.padEnd(20, '0')
    const bankAccNumB = b.bankAccountNumber.padEnd(20, '0')
    return parseInt(bankAccNumA, 10) - parseInt(bankAccNumB, 10)
  })
}

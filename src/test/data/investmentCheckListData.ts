import {
  Invest,
  Section,
} from '../../types/Finance/InvestmentCheckList/investmentCheckListTypes'

export const mockInvestments: Invest[] = [
  {
    investmentId: 1,
    investmentName: 'LIC',
    maxLimit: 0,
    description: 'testA',
    requiredDocs: 'Document of Payment of LIC Premium',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 2,
    investmentName: 'PPF (Public Provident Fund)',
    maxLimit: 0,
    description: '.',
    requiredDocs: 'Investment Document to be Submitted',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 3,
    investmentName: 'Five year Bank or Post office Tax saving Deposits',
    maxLimit: 0,
    description: '',
    requiredDocs: 'Invested Document to be Submited',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 4,
    investmentName: 'NSC (National Savings Certificates)',
    maxLimit: 0,
    description: 'testB',
    requiredDocs: 'Investment Document to be Submited',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 5,
    investmentName: 'Principal repayment of Home Loan',
    maxLimit: 0,
    description: 'testC',
    requiredDocs:
      'Bank Statement / Letter from Bank (Principle and Interest saperately)',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 6,
    investmentName: 'SCSS (Post office Senior Citizen Savings Scheme)',
    maxLimit: 0,
    description: 'testD',
    requiredDocs: 'Invested  Document to be Submited',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 7,
    investmentName: 'Sukanya Samriddhi Account Deposit Scheme',
    maxLimit: 0,
    description: 'testE',
    requiredDocs: 'Premium paid document to be submitted',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 8,
    investmentName: 'Children’s Tuition Fees',
    maxLimit: 0,
    description: 'only for 2 childrens',
    requiredDocs: 'Fees receipts',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 17,
    investmentName: 'Unit Linked Insurance Policy (ULIP)',
    maxLimit: 0,
    description: '<br/>',
    requiredDocs: 'Investment Document to be Submit',
    sectionId: 1,
    sectionName: '80 C',
  },
  {
    investmentId: 18,
    investmentName:
      'Stamp Duty, other taxes while purchasing new House property',
    maxLimit: 0,
    description: 'Total 80C Maximum Deduction : 150000/-<br/>',
    requiredDocs:
      'stamp duty paid \nother taxes paid \nonly new house property purchased',
    sectionId: 1,
    sectionName: '80 C',
  },
]

export const mockSections: Section[] = [
  {
    sectionId: 1,
    sectionName: '80 C',
    sectionLimit: 1500000,
    invests: [
      {
        investmentId: 3,
        investmentName: 'Five year Bank or Post office Tax saving Deposits',
        maxLimit: 0,
        description: '',
        requiredDocs: 'Invested Document to be Submited',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 6,
        investmentName: 'SCSS (Post office Senior Citizen Savings Scheme)',
        maxLimit: 0,
        description: 'testH',
        requiredDocs: 'Invested  Document to be Submited',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 5,
        investmentName: 'Principal repayment of Home Loan',
        maxLimit: 0,
        description: 'testI',
        requiredDocs:
          'Bank Statement / Letter from Bank (Principle and Interest saperately)',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 18,
        investmentName:
          'Stamp Duty, other taxes while purchasing new House property',
        maxLimit: 0,
        description: 'Total 80C Maximum Deduction : 150000/-<br/>',
        requiredDocs:
          'stamp duty paid \nother taxes paid \nonly new house property purchased',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 1,
        investmentName: 'LIC',
        maxLimit: 0,
        description: 'testJ',
        requiredDocs: 'Document of Payment of LIC Premium',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 7,
        investmentName: 'Sukanya Samriddhi Account Deposit Scheme',
        maxLimit: 0,
        description: 'testG',
        requiredDocs: 'Premium paid document to be submitted',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 4,
        investmentName: 'NSC (National Savings Certificates)',
        maxLimit: 0,
        description: 'testF',
        requiredDocs: 'Investment Document to be Submited',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 17,
        investmentName: 'Unit Linked Insurance Policy (ULIP)',
        maxLimit: 0,
        description: '<br/>',
        requiredDocs: 'Investment Document to be Submit',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 8,
        investmentName: 'Children’s Tuition Fees',
        maxLimit: 0,
        description: 'only for 2 childrens',
        requiredDocs: 'Fees receipts',
        sectionId: 1,
        sectionName: '80 C',
      },
      {
        investmentId: 2,
        investmentName: 'PPF (Public Provident Fund)',
        maxLimit: 0,
        description: '.',
        requiredDocs: 'Investment Document to be Submitted',
        sectionId: 1,
        sectionName: '80 C',
      },
    ],
  },
  {
    sectionId: 3,
    sectionName: '80 D',
    sectionLimit: 60000,
    invests: [
      {
        investmentId: 12,
        investmentName: 'Medical Insurance',
        maxLimit: 60000,
        description:
          'SF &lt; 60 y  - Rs.25,000 ,HC - Rs. 5000 = 30000<br/><div>SF + parents &lt; 60 y - 50000 ,HC - Rs. 5000 = 55000</div><div>SF + parents &gt; 60 y - 55000 ,HC - Rs. 5000 = 60000<br/></div><div>SF- Self and family</div><div>HC- Health Check up</div>',
        requiredDocs: '1. Premium Receipts\n2. If > 60 years Age Proof',
        sectionId: 3,
        sectionName: '80 D',
      },
    ],
  },
  {
    sectionId: 6,
    sectionName: '80 E',
    sectionLimit: 100000,
    invests: [
      {
        investmentId: 10,
        investmentName: 'Interest on Education Loan for Higher Studies',
        maxLimit: 0,
        description:
          'Applicable only for taxpayer, spouse or children or for a student for whom the taxpayer is a legal guardian.<br/><div><br/></div>',
        requiredDocs: 'Interest certificate from Bank',
        sectionId: 6,
        sectionName: '80 E',
      },
    ],
  },
  {
    sectionId: 7,
    sectionName: '80 G',
    sectionLimit: 100000,
    invests: [
      {
        investmentId: 11,
        investmentName: 'Donations',
        maxLimit: 0,
        description:
          '<div><span style="color: rgb(30, 49, 79);">Any donations made in cash exceeding Rs 2000 will not be allowed as deduction</span><br/></div><div>Deduction is based on the Institution / Society to which donation is given.</div>',
        requiredDocs:
          'Donation Receipt \nOn the receipt (clearly mentioned that 80G is applicable )',
        sectionId: 7,
        sectionName: '80 G',
      },
    ],
  },
  {
    sectionId: 8,
    sectionName: '80 CCD',
    sectionLimit: 50000,
    invests: [
      {
        investmentId: 13,
        investmentName: 'self-contribution to National Pension Scheme',
        maxLimit: 50000,
        description:
          '<span style="color: rgb(30, 49, 79);">Additional deduction</span><span style="color: rgb(30, 49, 79);"> of </span><span style="color: rgb(30, 49, 79);">up to Rs 50,000 can be availed in excess of 150000 under 80 C</span>',
        requiredDocs: 'investment document',
        sectionId: 8,
        sectionName: '80 CCD',
      },
    ],
  },
  {
    sectionId: 9,
    sectionName: '24',
    sectionLimit: 200000,
    invests: [
      {
        investmentId: 14,
        investmentName: 'Interest on Home Loan',
        maxLimit: 200000,
        description:
          'Interest payment on Home Loan Maximum Rs.200000/- u/s 24B<div>Principle Payment on Home Loan is deducted u/s 80 C</div>',
        requiredDocs:
          'Banker certificate \nInterest and principle payment to be shown saperately',
        sectionId: 9,
        sectionName: '24',
      },
    ],
  },
  {
    sectionId: 10,
    sectionName: '10 exemptionA',
    sectionLimit: 15000,
    invests: [
      {
        investmentId: 16,
        investmentName: 'House rent',
        maxLimit: 400000,
        description:
          '“Please enter your Monthly Rent details as per the Rent Receipt/Lease Deed. Submission of Lease Deed, Landlord PAN No and payment proof are mandatory, as applicable.”<br/>',
        requiredDocs:
          'Rental Agreement, Rent Paid bills & copy of Landlord PAN if rent paid is more than 1,00,000',
        sectionId: 10,
        sectionName: '10 exemption',
      },
      {
        investmentId: 15,
        investmentName: 'Medical Bills',
        maxLimit: 15000,
        description: 'Medical Bills for Taxpayer,Spouse,childrens',
        requiredDocs: 'Medical Bills for Taxpayer,Spouse,childrens',
        sectionId: 10,
        sectionName: '10 exemption',
      },
    ],
  },
  {
    sectionId: 11,
    sectionName: '10',
    sectionLimit: 100000,
    invests: [
      {
        investmentId: 19,
        investmentName: 'House Rent Paid to Landlord',
        maxLimit: 0,
        description:
          '“Please enter your Monthly Rent details as per the Rent Receipt/Lease Deed. Submission of Lease Deed, Landlord PAN No and payment proof are mandatory, as applicable.” If rent paid paid is more than 1,00,000, please provide us the  copy of Landlord PAN .',
        requiredDocs:
          'Rental Agreement, rental payment receipts & If rent paid paid is more than 1,00,000, please provide us the  copy of Landlord PAN',
        sectionId: 11,
        sectionName: '10',
      },
    ],
  },
  {
    sectionId: 12,
    sectionName: 'Test',
    sectionLimit: 10000,
    invests: [
      {
        investmentId: 21,
        investmentName: 'Test Investment 1',
        maxLimit: 10000,
        description:
          "test description of 'Test Investment Name1' Investment 123",
        requiredDocs: 'Test Documents upload 123',
        sectionId: 12,
        sectionName: 'Test',
      },
    ],
  },
]

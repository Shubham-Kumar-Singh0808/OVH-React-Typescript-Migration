import {
  GetProductSpecificationListDetails,
  ProductSpecifications,
} from '../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

export const mockProductSpecificationList: ProductSpecifications[] = [
  {
    id: 369,
    productId: 201,
    productName: 'Testing Flow',
    manufacturerId: 254,
    manufacturerName: 'Pavani',
    productSpecification: 'Testing',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'test Test',
    updatedBy: '',
    createdDate: '17/05/2023',
    updatedDate: '',
  },
  {
    id: 366,
    productId: 77,
    productName: 'Cables',
    manufacturerId: 157,
    manufacturerName: 'MAXICOM',
    productSpecification: 'test',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'test test',
    updatedBy: '',
    createdDate: '16/05/2023',
    updatedDate: '',
  },
  {
    id: 365,
    productId: 112,
    productName: 'MS Office 2010',
    manufacturerId: 134,
    manufacturerName: 'Microsoft',
    productSpecification: 'trest123',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'srikanth kottpati',
    updatedBy: 'test abc',
    createdDate: '19/05/2023',
    updatedDate: '02/05/2023',
  },
  {
    id: 364,
    productId: 154,
    productName: 'ANY CAST',
    manufacturerId: 209,
    manufacturerName: 'ANY CAST',
    productSpecification: 'ss',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'trest Test',
    updatedBy: '',
    createdDate: '11/05/2023',
    updatedDate: '',
  },
  {
    id: 363,
    productId: 185,
    productName: 'Dell',
    manufacturerId: 246,
    manufacturerName: 'somesh2',
    productSpecification: 'test',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Thriveni Bathula',
    updatedBy: '',
    createdDate: '08/05/2023',
    updatedDate: '',
  },
  {
    id: 362,
    productId: 185,
    productName: 'Dell',
    manufacturerId: 246,
    manufacturerName: 'somesh2',
    productSpecification:
      'Icons <span style="text-align: right;">Specification</span>',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Karunakar Karrolla',
    updatedBy: '',
    createdDate: '07/05/2023',
    updatedDate: '',
  },
  {
    id: 361,
    productId: 2,
    productName: 'Monitor',
    manufacturerId: 23,
    manufacturerName: 'Compaq (or) Acer (Or) LG (or) Gateway',
    productSpecification: 'Test',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Pavan Gollapalli',
    updatedBy: '',
    createdDate: '09/05/2023',
    updatedDate: '',
  },
  {
    id: 360,
    productId: 183,
    productName: 'WorldTest',
    manufacturerId: 246,
    manufacturerName: 'somesh2',
    productSpecification: '<h2>test</h2>',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'abc Test',
    updatedBy: '',
    createdDate: '05/05/2023',
    updatedDate: '',
  },
  {
    id: 359,
    productId: 182,
    productName: 'May',
    manufacturerId: 246,
    manufacturerName: 'somesh2',
    productSpecification: 'Tetsing Purpose',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'abc Test',
    updatedBy: 'test Test',
    createdDate: '14/05/2023',
    updatedDate: '02/05/2023',
  },
  {
    id: 358,
    productId: 179,
    productName: 'Laptop',
    manufacturerId: 245,
    manufacturerName: 'somesh',
    productSpecification: 'RAM dsfsdfsdf',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'anusha Test',
    updatedBy: '',
    createdDate: '03/02/2023',
    updatedDate: '',
  },
  {
    id: 357,
    productId: 164,
    productName: 'Access Point',
    manufacturerId: 225,
    manufacturerName: 'tp-link',
    productSpecification: 'sXDS',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Mamatha Thunam',
    updatedBy: '',
    createdDate: '01/12/2022',
    updatedDate: '',
  },
  {
    id: 356,
    productId: 31,
    productName: 'CSS6 Suite For UI Designers',
    manufacturerId: 29,
    manufacturerName: 'Adobe',
    productSpecification: ',mmmkkkkkkk',
    assetTypeId: 2,
    assetType: 'Software',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Sandeep Guzzarlamudi',
    updatedBy: '',
    createdDate: '01/09/2022',
    updatedDate: '',
  },
  {
    id: 354,
    productId: 38,
    productName: 'Laptop',
    manufacturerId: 39,
    manufacturerName: 'Dell',
    productSpecification:
      'Intel(R)Core(TM)i7-7500U CPU @2.70 GHz 2.90 GHz<div>16 GB RAM</div><div>1 TB HDD</div>',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'text Bommali',
    updatedBy: '',
    createdDate: '04/04/2019',
    updatedDate: '',
  },
  {
    id: 353,
    productId: 38,
    productName: 'Laptop',
    manufacturerId: 183,
    manufacturerName: 'Microsoft',
    productSpecification: 'MICROSOFT - SURFACE PRO6 BLACK',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'sunny Bommali',
    updatedBy: '',
    createdDate: '02/04/2019',
    updatedDate: '',
  },
  {
    id: 352,
    productId: 176,
    productName: 'MI 8 text Bar',
    manufacturerId: 242,
    manufacturerName: 'MI',
    productSpecification: 'MI 8 text Bar',
    assetTypeId: 3,
    assetType: 'Utilities',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'test Polam',
    updatedBy: '',
    createdDate: '30/03/2019',
    updatedDate: '',
  },
  {
    id: 351,
    productId: 175,
    productName: 'Metro Wholesale Store',
    manufacturerId: 241,
    manufacturerName: 'Metro Wholesale',
    productSpecification: 'Dealer in wholesale and retail',
    assetTypeId: 3,
    assetType: 'Utilities',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'polam Polam',
    updatedBy: '',
    createdDate: '26/03/2019',
    updatedDate: '',
  },
  {
    id: 350,
    productId: 174,
    productName: 'Mobile Pouch',
    manufacturerId: 240,
    manufacturerName: 'Aeoss',
    productSpecification: 'Mobile Pouch carrier',
    assetTypeId: 3,
    assetType: 'Utilities',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'test Dagilla',
    updatedBy: '',
    createdDate: '25/03/2019',
    updatedDate: '',
  },
  {
    id: 349,
    productId: 173,
    productName: 'DVR',
    manufacturerId: 239,
    manufacturerName: 'HIK Vision',
    productSpecification: 'Working',
    assetTypeId: 1,
    assetType: 'Hardware',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'dagilla Dagilla',
    updatedBy: '',
    createdDate: '24/03/2019',
    updatedDate: '',
  },
  {
    id: 348,
    productId: 173,
    productName: 'DVR',
    manufacturerId: 238,
    manufacturerName: 'MX Be Secure',
    productSpecification: 'Dome Camera',
    assetTypeId: 3,
    assetType: 'Utilities',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'test Polam',
    updatedBy: '',
    createdDate: '22/03/2019',
    updatedDate: '',
  },
  {
    id: 347,
    productId: 145,
    productName: 'Laptop bag Backpack',
    manufacturerId: 237,
    manufacturerName: 'DELL FROM CTC',
    productSpecification: 'Dell laptop bags from computer bazar',
    assetTypeId: 3,
    assetType: 'Utilities',
    roleId: null,
    departmentId: null,
    departmentName: null,
    createdBy: 'Nithin nithin',
    updatedBy: '',
    createdDate: '27/03/2019',
    updatedDate: '',
  },
]
export const mockProductSpecification: GetProductSpecificationListDetails = {
  size: 350,
  list: [
    {
      id: 369,
      productId: 201,
      productName: 'Testing Flow',
      manufacturerId: 254,
      manufacturerName: 'Pavani',
      productSpecification: 'Testing',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'test Test',
      updatedBy: '',
      createdDate: '17/05/2023',
      updatedDate: '',
    },
    {
      id: 366,
      productId: 77,
      productName: 'Cables',
      manufacturerId: 157,
      manufacturerName: 'MAXICOM',
      productSpecification: 'test',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'test test',
      updatedBy: '',
      createdDate: '16/05/2023',
      updatedDate: '',
    },
    {
      id: 365,
      productId: 112,
      productName: 'MS Office 2010',
      manufacturerId: 134,
      manufacturerName: 'Microsoft',
      productSpecification: 'trest123',
      assetTypeId: 2,
      assetType: 'Software',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'srikanth kottpati',
      updatedBy: 'test abc',
      createdDate: '12/05/2023',
      updatedDate: '12/05/2023',
    },
    {
      id: 364,
      productId: 154,
      productName: 'ANY CAST',
      manufacturerId: 209,
      manufacturerName: 'ANY CAST',
      productSpecification: 'ss',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'trest Test',
      updatedBy: '',
      createdDate: '11/05/2023',
      updatedDate: '',
    },
    {
      id: 363,
      productId: 185,
      productName: 'Dell',
      manufacturerId: 246,
      manufacturerName: 'somesh2',
      productSpecification: 'test',
      assetTypeId: 2,
      assetType: 'Software',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Thriveni Bathula',
      updatedBy: '',
      createdDate: '08/05/2023',
      updatedDate: '',
    },
    {
      id: 362,
      productId: 185,
      productName: 'Dell',
      manufacturerId: 246,
      manufacturerName: 'somesh2',
      productSpecification:
        'Icons <span style="text-align: right;">Specification</span>',
      assetTypeId: 2,
      assetType: 'Software',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Karunakar Karrolla',
      updatedBy: '',
      createdDate: '04/05/2023',
      updatedDate: '',
    },
    {
      id: 361,
      productId: 2,
      productName: 'Monitor',
      manufacturerId: 23,
      manufacturerName: 'Compaq (or) Acer (Or) LG (or) Gateway',
      productSpecification: 'Test',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Pavan Gollapalli',
      updatedBy: '',
      createdDate: '04/05/2023',
      updatedDate: '',
    },
    {
      id: 360,
      productId: 183,
      productName: 'WorldTest',
      manufacturerId: 246,
      manufacturerName: 'somesh2',
      productSpecification: '<h2>test</h2>',
      assetTypeId: 2,
      assetType: 'Software',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'abc Test',
      updatedBy: '',
      createdDate: '05/05/2023',
      updatedDate: '',
    },
    {
      id: 359,
      productId: 182,
      productName: 'May',
      manufacturerId: 246,
      manufacturerName: 'somesh2',
      productSpecification: 'Tetsing Purpose',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'abc Test',
      updatedBy: 'Stagging Test',
      createdDate: '03/05/2023',
      updatedDate: '03/05/2023',
    },
    {
      id: 358,
      productId: 179,
      productName: 'Laptop',
      manufacturerId: 245,
      manufacturerName: 'somesh',
      productSpecification: 'RAM dsfsdfsdf',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Stagging Test',
      updatedBy: '',
      createdDate: '03/02/2023',
      updatedDate: '',
    },
    {
      id: 357,
      productId: 164,
      productName: 'Access Point',
      manufacturerId: 225,
      manufacturerName: 'tp-link',
      productSpecification: 'sXDS',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Mamatha Thunam',
      updatedBy: '',
      createdDate: '01/12/2022',
      updatedDate: '',
    },
    {
      id: 356,
      productId: 31,
      productName: 'CSS6 Suite For UI Designers',
      manufacturerId: 29,
      manufacturerName: 'Adobe',
      productSpecification: ',mmmkkkkkkk',
      assetTypeId: 2,
      assetType: 'Software',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Sandeep Guzzarlamudi',
      updatedBy: '',
      createdDate: '01/09/2022',
      updatedDate: '',
    },
    {
      id: 354,
      productId: 38,
      productName: 'Laptop',
      manufacturerId: 39,
      manufacturerName: 'Dell',
      productSpecification:
        'Intel(R)Core(TM)i7-7500U CPU @2.70 GHz 2.90 GHz<div>16 GB RAM</div><div>1 TB HDD</div>',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Pramod Bommali',
      updatedBy: '',
      createdDate: '04/04/2019',
      updatedDate: '',
    },
    {
      id: 353,
      productId: 38,
      productName: 'Laptop',
      manufacturerId: 183,
      manufacturerName: 'Microsoft',
      productSpecification: 'MICROSOFT - SURFACE PRO6 BLACK',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Pramod Bommali',
      updatedBy: '',
      createdDate: '02/04/2019',
      updatedDate: '',
    },
    {
      id: 352,
      productId: 176,
      productName: 'MI 8 Speaker Bar',
      manufacturerId: 242,
      manufacturerName: 'MI',
      productSpecification: 'MI 8 Speaker Bar',
      assetTypeId: 3,
      assetType: 'Utilities',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'text Polam',
      updatedBy: '',
      createdDate: '27/03/2019',
      updatedDate: '',
    },
    {
      id: 351,
      productId: 175,
      productName: 'Metro Wholesale Store',
      manufacturerId: 241,
      manufacturerName: 'Metro Wholesale',
      productSpecification: 'Dealer in wholesale and retail',
      assetTypeId: 3,
      assetType: 'Utilities',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'text Polam',
      updatedBy: '',
      createdDate: '26/03/2019',
      updatedDate: '',
    },
    {
      id: 350,
      productId: 174,
      productName: 'Mobile Pouch',
      manufacturerId: 240,
      manufacturerName: 'Aeoss',
      productSpecification: 'Mobile Pouch carrier',
      assetTypeId: 3,
      assetType: 'Utilities',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Sampath Dagilla',
      updatedBy: '',
      createdDate: '25/03/2019',
      updatedDate: '',
    },
    {
      id: 349,
      productId: 173,
      productName: 'DVR',
      manufacturerId: 239,
      manufacturerName: 'HIK Vision',
      productSpecification: 'Working',
      assetTypeId: 1,
      assetType: 'Hardware',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Sampath Dagilla',
      updatedBy: '',
      createdDate: '24/03/2019',
      updatedDate: '',
    },
    {
      id: 348,
      productId: 173,
      productName: 'DVR',
      manufacturerId: 238,
      manufacturerName: 'MX Be Secure',
      productSpecification: 'Dome Camera',
      assetTypeId: 3,
      assetType: 'Utilities',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Nithin Polam',
      updatedBy: '',
      createdDate: '21/03/2019',
      updatedDate: '',
    },
    {
      id: 347,
      productId: 145,
      productName: 'Laptop bag Backpack',
      manufacturerId: 237,
      manufacturerName: 'DELL FROM CTC',
      productSpecification: 'Dell laptop bags from computer bazar',
      assetTypeId: 3,
      assetType: 'Utilities',
      roleId: null,
      departmentId: null,
      departmentName: null,
      createdBy: 'Nithin Polam',
      updatedBy: '',
      createdDate: '21/03/2019',
      updatedDate: '',
    },
  ],
}

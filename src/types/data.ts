

export interface IUser  {
  //Personal details
  _id: string;
  firstName: string | undefined;
  lastName: string | undefined;
  occupation: string | undefined;
  role: string;
  email: string;
  phoneNumber: string | undefined;
  password: string | undefined;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  email_otp: number | undefined;
  email_otp_expire: Date | undefined;


  //Broker details
  dhan_auth_token: string | undefined;
  dhan_client_id: string | undefined;
  isBrokerConnected: boolean;
  mentorId: string | null,
  mentor?: IUser | null

  //Profile image
  profile_image_key: string;
  profile_image_url: string;

  //BD
  isBD: boolean;
  referralCode: string ;
  reffererId: string | null;
  usersCount: number;
  paidUsersCount: number;

  createdAt?:string

}
export interface ISales{
  _id: string;
  referralCode: string;
  userId: string;
  usersCount: number;
  paidUsersCount: number;
}
export interface IQuestion{
    _id: string;
    key: string;
    title: string;
    type: string;
    responses: number;
    created: string;
    status: string;
    isPre: boolean;
    isRequired: boolean;
}
export interface IAlert{
  key: string;
  value: string;
  created: string;
}


export type PositionType = "LONG" | "SHORT" | "CLOSED";
export type ExchangeSegment =
  | "NSE_EQ"
  | "NSE_FNO"
  | "NSE_CURRENCY"
  | "BSE_EQ"
  | "BSE_FNO"
  | "BSE_CURRENCY"
  | "MCX_COMM";
export type ProductType = "CNC" | "INTRADAY" | "MARGIN" | "MTF" | "CO" | "BO";
export type OptionType = "CALL" | "PUT";

export interface IPosition {
  userId:string;
  dhanClientId: string;
  tradingSymbol: string;
  securityId: string;
  positionType: PositionType;
  exchangeSegment: ExchangeSegment;
  productType: ProductType;
  buyAvg: number;
  buyQty: number;
  costPrice: number;
  sellAvg: number;
  sellQty: number;
  netQty: number;
  realizedProfit: number;
  unrealizedProfit: number;
  rbiReferenceRate: number;
  multiplier: number;
  carryForwardBuyQty: number;
  carryForwardSellQty: number;
  carryForwardBuyValue: number;
  carryForwardSellValue: number;
  dayBuyQty: number;
  daySellQty: number;
  dayBuyValue: number;
  daySellValue: number;
  drvExpiryDate: string;
  drvOptionType: OptionType;
  drvStrikePrice: number;
  crossCurrency: boolean;
}


type Exchange = "NSE" | "BSE" | "MCX" | "NCDEX";

export interface IHoldings {
  exchange: Exchange;
  tradingSymbol: string;
  securityId: string;
  isin: string;
  totalQty: number;
  dpQty: number;
  t1Qty: number;
  availableQty: number;
  collateralQty: number;
  avgCostPrice: number;
  userId: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderProfile: string;
  createdAt: string;
  mediaUrl?: string;
  conversationId: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IJournalEntry extends Document {
  date: string | number | Date;
  _id: string;
  userId: string;
  type: 'entry' | 'exit';
  responses: {
    question: any;
    answer: string;
  }[];
  reviewId:string|null;
  isActive: boolean;
}

export type UserLoginResponse ={
  user:IUser,
  message:string,
  success:boolean,
  token:string
}
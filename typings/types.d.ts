type Waiver = {
  waiverId: string;
  title: string;
  prefillId: string | null;
  createdOn: string;
  expirationDate: string;
  expired: boolean;
  verified: boolean;
  kiosk: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  isMinor: boolean;
  autoTag: string;
  tags: string[];
};

type SingleWaiver = {
  waiverId?: string;
  templateId?: string;
  title?: string;
  createdOn?: string;
  expired?: boolean;
  verified?: boolean;
  kiosk?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  isMinor?: boolean;
  autoTag?: string;
  tags?: string[];
  participants?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    isMinor?: boolean;
    minorExpired?: boolean;
    gender?: string;
    phone?: string;
    tags?: string[];
    customParticipantFields?: Record<string, unknown>;
    flags?: string[];
  }[];
  email?: string;
  marketingAllowed?: boolean;
  marketingAllowedCheckbox?: boolean;
  clientIP?: string;
  typedSignatures?: {
    participants?: string[];
    guardian?: string[];
    bodySignatures?: string[];
    bodyInitials?: string[];
  };
  photos?: number;
};

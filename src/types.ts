export interface DocumentProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  documentType: string;
  documentNumber: string;
  expiryDate: string;
  extractedSkillsOrDetails: string[];
  confidence: number;
  documentTypesVaulted?: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  type: "Government Scheme" | "Scholarship" | "Job";
  matchPercentage: number;
  reward: string;
  deadline: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  org: string;
  image: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface VaultedDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  expiryDate?: string;
  status: "Verified" | "Expiring Soon" | "Processing";
}

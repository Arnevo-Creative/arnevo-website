export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  details: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  client: string;
  services: string[];
  accentColor: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
  detailedText: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  interests: string[];
  message: string;
}

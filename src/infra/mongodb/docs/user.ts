/**
 * Represents the raw structure of a User document in MongoDB.
 * Using snake_case for database-level consistency.
 */
export interface UserDocument {
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
  email: string;
  country: string;
  phone: string;
  website?: string;
  volume: string;
  source: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

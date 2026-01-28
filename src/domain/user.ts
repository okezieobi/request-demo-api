import { Base } from "./base";

export class User extends Base {
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  emailAddress: string;
  country: string;
  phoneNumber: string;
  companyWebsite?: string; // Optional field
  monthlyProcessingVolume: string; // Kept as string to handle currency symbols/ranges
  referralSource: string; // "How did you hear about Enif"
  description?: string;

  constructor(data: Partial<User>) {
    super(data);
    this.firstName = data.firstName ?? "";
    this.lastName = data.lastName ?? "";
    this.jobTitle = data.jobTitle ?? "";
    this.companyName = data.companyName ?? "";
    this.emailAddress = data.emailAddress ?? "";
    this.country = data.country ?? "";
    this.phoneNumber = data.phoneNumber ?? "";
    this.companyWebsite = data.companyWebsite;
    this.monthlyProcessingVolume = data.monthlyProcessingVolume || "";
    this.referralSource = data.referralSource ?? "";
    this.description = data.description;
  }

  /**
   * Helper method to get the full name of the requester
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Logic to format data for an API payload
   */
  toJSON() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      job_title: this.jobTitle,
      company_name: this.companyName,
      email: this.emailAddress,
      country: this.country,
      phone: this.phoneNumber,
      website: this.companyWebsite,
      volume: this.monthlyProcessingVolume,
      source: this.referralSource,
      notes: this.description,
      ...super.toJSON(),
    };
  }
}

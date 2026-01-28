import { User } from "../domain/user";
import { UserDocument } from "../infra/mongodb/documents/user";

export class UserMapper {
  static toDomain(raw: UserDocument): User {
    return new User({
      firstName: raw.first_name,
      lastName: raw.last_name,
      jobTitle: raw.job_title,
      companyName: raw.company_name,
      emailAddress: raw.email,
      country: raw.country,
      phoneNumber: raw.phone,
      companyWebsite: raw.website,
      monthlyProcessingVolume: raw.volume,
      referralSource: raw.source,
      description: raw.notes,
    });
  }

  static toPersistence(user: User): UserDocument {
    return {
      first_name: user.firstName,
      last_name: user.lastName,
      job_title: user.jobTitle,
      company_name: user.companyName,
      email: user.emailAddress,
      country: user.country,
      phone: user.phoneNumber,
      website: user.companyWebsite,
      volume: user.monthlyProcessingVolume,
      source: user.referralSource,
      notes: user.description,
      created_at: user.createdAt, // Logic for new records
      updated_at: user.updatedAt,
    };
  }
}

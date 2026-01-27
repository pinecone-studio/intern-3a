import mongoose, { Schema } from 'mongoose';

export type ReferralSchemaType = {
  candidateLastName: string;
  candidateFirstName: string;
  candidateTelNumber: string;
  candidateEmail: string;
  candidateLinkedinUrl: string;
  candidateFieldOfInterest: string;
  candidateCurrentStatus: 'CURRENTLY_EMPLOYED' | 'STUDENT' | 'UNEMPLOYED' | 'OTHER';
  candidateResume: { type: String; required: true };
  hasCandidateConsent: { type: String; required: true };
  isNotCurrentEmployee: { type: String; required: true };
  relationWithCandidate: 'FORMER_COLLEAGUE' | 'ALUMNI' | 'FRIEND' | 'FAMILY_RELATIVES' | 'OTHER';
  refferalReason: { type: String; required: true };
};

export const ReferralSchema = new Schema(
  {
    candidateLastName: { type: String, required: true },
    candidateFirstName: { type: String, required: true },
    candidateTelNumber: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    candidateLinkedinUrl: { type: String },
    candidateFieldOfInterest: { type: String },
    candidateCurrentStatus: { type: String, enum: ['CURRENTLY_EMPLOYED', 'STUDENT', 'UNEMPLOYED', 'OTHER'], required: true },
    candidateResume: { type: String, required: true },
    hasCandidateConsent: { type: Boolean, required: true },
    isNotCurrentEmployee: { type: Boolean, required: true },
    relationWithCandidate: { type: String, enum: ['FORMER_COLLEAGUE', 'ALUMNI', 'FRIEND', 'FAMILY_RELATIVES', 'OTHER'], required: true },
    refferalReason: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Referral = mongoose.models.Referral || mongoose.model<ReferralSchemaType>('Referral', ReferralSchema);

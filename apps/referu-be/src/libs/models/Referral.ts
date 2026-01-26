import mongoose, { Schema } from 'mongoose';

export type ReferralSchemaType = {
  candidateLastName: string;
  candidateFirstName: string;
  candidateTelNumber: string;
  candidateEmail: string;
  candidateLinkedinUrl: string;
  candidateFieldOfInterest: string;
  candidateCurrentStatus: string;
  candidateResume: { type: String; required: true };
  hasCandidateConsent: { type: String; required: true };
  isNotCurrentEmployee: { type: String; required: true };
  relationWithCandidate: { type: String; required: true };
  refferalReason: { type: String; required: true };
};

export const ReferralSchema = new Schema(
  {
    candidateLastName: { type: String, required: true },
    candidateFirstName: { type: String, required: true },
    candidateTelNumber: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    candidateLinkedinUrl: { type: String, required: true },
    candidateFieldOfInterest: { type: String },
    candidateCurrentStatus: { type: String, required: true },
    candidateResume: { type: String, required: true },
    hasCandidateConsent: { type: Boolean, required: true },
    isNotCurrentEmployee: { type: Boolean, required: true },
    relationWithCandidate: { type: String, required: true },
    refferalReason: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Referral = mongoose.models.Referral || mongoose.model<ReferralSchemaType>('Referral', ReferralSchema);

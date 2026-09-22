import { PatientFormDefaultValues } from "@/constants";

/**
 * Sample data used by the "Fill demo data" buttons so visitors can walk the
 * whole patient flow without typing anything. Everything here has to satisfy
 * the schemas in lib/validation.ts — phone numbers are E.164, dates are real
 * Date objects, and the physician must be one of the Doctors in ./index.ts.
 */

const DEMO_PERSONA = {
  name: "Alex Morgan",
  phone: "+15551234567",
  address: "14 Willow Street, Brooklyn, NY 11201",
  occupation: "Software Engineer",
  emergencyContactName: "Jamie Morgan",
  emergencyContactNumber: "+15559876543",
  primaryPhysician: "Leila Cameron",
};

// createUser() returns the existing user when the email is already taken, which
// would skip a later visitor past the registration form entirely. Keep the
// persona fixed but make every click a new person.
const demoEmail = () =>
  `alex.morgan+demo${Date.now().toString(36)}@example.com`;

export const getDemoUser = () => ({
  name: DEMO_PERSONA.name,
  email: demoEmail(),
  phone: DEMO_PERSONA.phone,
});

export const getDemoPatient = (user: User) => ({
  ...PatientFormDefaultValues,
  name: user.name,
  email: user.email,
  phone: user.phone,
  birthDate: new Date(1992, 4, 18),
  gender: "Female" as Gender,
  address: DEMO_PERSONA.address,
  occupation: DEMO_PERSONA.occupation,
  emergencyContactName: DEMO_PERSONA.emergencyContactName,
  emergencyContactNumber: DEMO_PERSONA.emergencyContactNumber,
  primaryPhysician: DEMO_PERSONA.primaryPhysician,
  treatmentConsent: true,
  disclosureConsent: true,
  privacyConsent: true,
});

// Three days out, at a clean 10:00, so the request reads like a real one.
const demoSchedule = () => {
  const date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  date.setHours(10, 0, 0, 0);
  return date;
};

export const getDemoAppointment = () => ({
  primaryPhysician: DEMO_PERSONA.primaryPhysician,
  schedule: demoSchedule(),
  reason: "Annual check-up and blood pressure review",
  note: "Prefer a morning slot if one is available",
  cancellationReason: "",
});

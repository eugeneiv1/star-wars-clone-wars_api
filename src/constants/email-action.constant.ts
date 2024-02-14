import { EEmailAction } from "../enums/email-action.enum";

export const emailTemplate = {
  [EEmailAction.WELCOME]: {
    subject: "Welcome to our service",
    templateName: "welcome",
  },
  [EEmailAction.FORGOT]: {
    subject: "Password restoration",
    templateName: "forgot",
  },
  [EEmailAction.REMIND]: {
    subject: "Please come back, we miss You",
    templateName: "remind",
  },
  [EEmailAction.SETADMINPASSWORD]: {
    subject: "Please set your own password",
    templateName: "adminSignUp",
  },
};

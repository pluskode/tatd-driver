import { z } from 'zod';

// Factory to produce Login Validation Schema dynamically based on current language
export const getLoginSchema = (t) =>
  z.object({
    mobile: z
      .string()
      .min(1, { message: t.login.errorMobileLen })
      .length(10, { message: t.login.errorMobileLen })
      .regex(/^\d+$/, { message: t.login.errorMobileDigits }),
  });

// Factory to produce OTP Validation Schema dynamically based on current language
export const getOtpSchema = (t) =>
  z.object({
    otp: z
      .string()
      .min(1, { message: t.otp.errorInvalid })
      .length(4, { message: t.otp.errorInvalid })
      .regex(/^\d+$/, { message: t.otp.errorInvalid }),
  });

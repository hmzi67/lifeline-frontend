import { useMemo } from "react";
import type { LegalPageData, LegalPageType } from "@/types/legal";
import {
  COOKIE_POLICY_DATA,
  PRIVACY_POLICY_DATA,
  TERMS_CONDITIONS_DATA,
} from "@/constants/legalConstants";

const LEGAL_CONTENT: Record<LegalPageType, LegalPageData> = {
  privacy: PRIVACY_POLICY_DATA,
  terms: TERMS_CONDITIONS_DATA,
  cookies: COOKIE_POLICY_DATA,
};

export const useLegalContent = (type: LegalPageType): LegalPageData =>
  useMemo(() => LEGAL_CONTENT[type], [type]);

import { useState, useEffect } from "react";
import type { LegalPageData, LegalPageType } from "@/types/legal";
import {
  PRIVACY_POLICY_DATA,
  TERMS_CONDITIONS_DATA,
} from "@/constants/legalConstants";

export const useLegalContent = (type: LegalPageType): LegalPageData => {
  const [data, setData] = useState<LegalPageData>(
    type === "privacy" ? PRIVACY_POLICY_DATA : TERMS_CONDITIONS_DATA
  );

  useEffect(() => {
    // This could be extended to fetch from an API in the future
    const contentData =
      type === "privacy" ? PRIVACY_POLICY_DATA : TERMS_CONDITIONS_DATA;
    setData(contentData);
  }, [type]);

  return data;
};

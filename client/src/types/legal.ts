export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalPageData {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
}

export type LegalPageType = "privacy" | "terms";

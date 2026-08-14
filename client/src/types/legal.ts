export interface LegalListItem {
  /** Optional bold lead-in, e.g. "Account Security:" */
  label?: string;
  text: string;
}

export interface LegalSubsection {
  title?: string;
  content?: string;
  items?: LegalListItem[];
}

export interface LegalSection {
  id: string;
  title: string;
  /** Intro paragraph shown before any list/subsections. */
  content?: string;
  items?: LegalListItem[];
  subsections?: LegalSubsection[];
  /** Callout rendered after the section body (disclaimers, guarantees). */
  note?: string;
  /** Closing paragraph rendered after the body. */
  outro?: string;
  /** Optional in-app link rendered at the end of the section. */
  link?: { to: string; label: string };
}

export interface LegalContact {
  company: string;
  email: string;
}

export interface LegalPageData {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: LegalSection[];
  contact?: LegalContact;
}

export type LegalPageType = "privacy" | "terms" | "cookies";

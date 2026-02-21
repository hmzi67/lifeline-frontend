import type { LegalPageData } from "@/types/legal";

export const formatLastUpdated = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateTableOfContents = (data: LegalPageData) => {
  return data.sections.map((section) => ({
    id: section.id,
    title: section.title,
    href: `#${section.id}`,
  }));
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import featured from "@/assets/featured.jpg";

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  type: string;
  cover: string;
  images: string[];
  description: string;
};

export const featuredImage = featured;

export const projects: Project[] = [
  {
    id: "forme",
    title: "Formé",
    category: "Poster series",
    year: "2026",
    type: "Self-initiated",
    cover: work1,
    images: [work1, work3],
    description:
      "A four-part poster series exploring balance through reduced geometric forms. Printed in risograph black on uncoated stock.",
  },
  {
    id: "alpha",
    title: "Alpha",
    category: "Packaging",
    year: "2025",
    type: "Client project",
    cover: work2,
    images: [work2, work6],
    description:
      "Packaging system for a minimal skincare line. Debossed marks, no ink, one paper stock across the full range.",
  },
  {
    id: "chronicles",
    title: "The Chronicles",
    category: "Editorial",
    year: "2025",
    type: "Client project",
    cover: work3,
    images: [work3, work1],
    description:
      "Art direction and layout for a quarterly print journal. A single grid, two type sizes, generous margins.",
  },
  {
    id: "atlas",
    title: "Atlas",
    category: "Signage",
    year: "2024",
    type: "Studio work",
    cover: work4,
    images: [work4, work5],
    description:
      "Wayfinding system for an office campus. Numerals lead, labels follow, contrast does the navigating.",
  },
  {
    id: "monogram",
    title: "Monogram Vol. 1",
    category: "Identity",
    year: "2024",
    type: "Self-initiated",
    cover: work5,
    images: [work5, work2],
    description:
      "Twelve constructed monograms built on a shared geometric grid. An exercise in consistency over invention.",
  },
  {
    id: "carry",
    title: "Carry",
    category: "Branding",
    year: "2024",
    type: "Client project",
    cover: work6,
    images: [work6, work4],
    description:
      "Retail identity and print collateral for a slow-fashion label. One mark, tonal application, nothing louder.",
  },
];

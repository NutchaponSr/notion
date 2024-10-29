export const categories = [
  { 
    label: "Core", 
    query: "CC",
    className: [
      "bg-[#F7E3DE] dark:bg-[#4A302B]",
      "text-[#BC554D] dark:text-[#B6524B]",
    ],
  },
  { 
    label: "Functional", 
    query: "FC",
    className: [
      "bg-[#D8E5EE]",
      "text-[#527DA5] dark:text-[#527CCA]",
    ],
  },
  { 
    label: "Technical", 
    query: "TC",
    className: [
      "bg-[#DFECDD] dark:bg-[#2C3C31]", 
      "text-[#598164] dark:text-[#589669]"
    ],
  },
];

export enum Types {
  CC = "CC",
  FC = "FC",
  TC = "TC",
}

export type CompetencyInstant = {
  id: string, 
  name: string, 
  icon: string | null,
  type: Types,
  updatedAt: string,
  updatedBy: string,
} 
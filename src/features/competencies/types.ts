export const categories = [
  { 
    label: "Core", 
    query: "CC",
    className: [
      "bg-[#F7E3DE] dark:bg-[#4A302B]",
      "fill-[#BC554D] dark:fill-[#B6524B]",
    ],
  },
  { 
    label: "Functional", 
    query: "FC",
    className: [
      "bg-[#D8E5EE] dark:bg-[#143a4e]",
      "fill-[#527DA5] dark:fill-[#527CCA]",
    ],
  },
  { 
    label: "Technical", 
    query: "TC",
    className: [
      "bg-[#DFECDD] dark:bg-[#2C3C31]", 
      "fill-[#598164] dark:fill-[#589669]"
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
export const categories = [
  { 
    label: "Core", 
    query: "CC",
    className: [
      "bg-[#F7E3DE] dark:bg-[#4A302B]",
      "text-[#BC554D] dark:text-[#B6524B]",
    ],
    fill: "#BC554D",
  },
  { 
    label: "Functional", 
    query: "FC",
    className: [
      "bg-[#D8E5EE] dark:bg-[#143a4e]",
      "text-[#527DA5] dark:text-[#527CCA]",
    ],
    fill: "#527DA5",
  },
  { 
    label: "Technical", 
    query: "TC",
    className: [
      "bg-[#DFECDD] dark:bg-[#2C3C31]", 
      "text-[#598164] dark:text-[#589669]"
    ],
    fill: "#598164",
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
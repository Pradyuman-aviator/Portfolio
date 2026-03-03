import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "gdg-hamirpur",
    companyName: "Google Developer Group (GDG) Hamirpur",
    positions: [
      {
        id: "gdg-exec",
        title: "GDG Abyss & GDG Genesis Organizer",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Community",
        icon: "business",
        description: `- Organizer for GDG Abyss and GDG Genesis under Google Developer Groups Hamirpur.
- Mentored juniors in web development, GitHub workflows, and open-source best practices.
- Supported and organized technical workshops, coding sessions, and developer meetups.`,
        skills: [
          "Community Building",
          "Leadership",
          "Web Development",
          "React",
          "UI/UX",
          "GitHub",
          "Public Speaking",
          "Mentorship",
          "Event Management",
        ],
      },
    ],
    isCurrentEmployer: false,
  },

  {
    id: "hacksecure",
    companyName: "HackSecure",
    positions: [
      {
        id: "hacksecure-org",
        title: "Organizer",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Community",
        icon: "business",
        description: `- Organizer for HackSecure.`,
        skills: [
          "Event Organization",
          "Team Coordination",
          "Cybersecurity",
        ],
      },
    ],
  },

  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "nit-hamirpur",
        title: "B.Tech in Civil Engineering — NIT Hamirpur",
        employmentPeriod: {
          start: "08.2024",
          end: "05.2028",
        },
        icon: "education",
        description: `- Currently pursuing B.Tech in Civil Engineering.
- Strong focus on engineering principles, data structures, and algorithms.
- Executive Member at GDG Hamirpur.`,
        skills: [
          "C++",
          "Data Structures",
          "Algorithms",
          "Operating Systems",
          "DBMS",
          "Software Engineering",
          "Problem Solving",
        ],
      },
      {
        id: "mvm-nadaun",
        title: "MVM Nadaun — Class VI to XII",
        employmentPeriod: {
          start: "06.2018",
          end: "03.2024",
        },
        icon: "education",
        description: `- Completed schooling from Class 6 to Class 12 at MVM Nadaun.
- Built a strong foundation in mathematics, science, and logical problem-solving.
- Actively participated in academic and technical competitions.`,
        skills: [
          "Mathematics",
          "Logical Reasoning",
          "Science",
          "Discipline",
          "Self-learning",
        ],
      },
    ],
  },
];

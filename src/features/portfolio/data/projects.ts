import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "sentinel",
    title: "Sentinel",
    period: {
      start: "2024",
    },
    link: "https://github.com/Pradyuman-aviator/networksecurity",
    skills: [
      "Network Security",
      "Python",
      "Machine Learning",
    ],
    description: `A project focused on network security.
- Analyzes and secures network infrastructure
- Uses modern techniques for monitoring`,
  },
  {
    id: "myportfolio",
    title: "Personal Portfolio",
    period: {
      start: "12.2024",
    },
    link: "https://github.com/Pradyuman-aviator/Portfolio",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MDX",
      "Portfolio",
      "SEO",
    ],
    description: `A modern, responsive developer portfolio showcasing my projects, open-source contributions, and technical journey.
- Built with Next.js and Tailwind CSS
- Includes a built-in markdown blog and project showcases
- Optimized for performance, accessibility, and SEO`,
    isExpanded: true,
  },

  {
    id: "medivault",
    title: "MediVault (DMEDS+)",
    period: {
      start: "02.2025",
    },
    link: "https://github.com/Pradyuman-aviator",
    skills: [
      "Blockchain",
      "Ethereum",
      "Solidity",
      "React",
      "Node.js",
      "IPFS",
      "Pinata",
      "Web3.js",
    ],
    description: `A decentralized medical record management system focused on privacy and secure data sharing.
- Stores medical records on IPFS using Pinata
- Smart contracts written in Solidity
- Wallet-based authentication using MetaMask
- Designed scalable frontend with React and Tailwind CSS`,
  },

  {
    id: "decentralized-fir",
    title: "Decentralized FIR Management System",
    period: {
      start: "04.2025",
    },
    link: "https://github.com/Pradyuman-aviator",
    skills: [
      "Blockchain",
      "Ethereum",
      "Solidity",
      "React",
      "Node.js",
      "IPFS",
      "Web3",
    ],
    description: `A decentralized system for filing and tracking FIRs with separate user and police interfaces.
- Ensures transparency and immutability using blockchain
- Supports role-based access for civilians and police
- Stores FIR data securely using IPFS`,
  },


  {
    id: "academic-projects",
    title: "CP-31: Academic & Practice Projects",
    period: {
      start: "2024",
    },
    link: "https://github.com/Pradyuman-aviator/cp-31",
    skills: ["C++", "Data Structures", "Algorithms", "OOP", "Problem Solving"],
    description: `A collection of academic and practice projects built as part of coursework and self-learning.
- Implemented core data structures and algorithms in C++
- Solved competitive programming problems on Codeforces and LeetCode`,
  },
];

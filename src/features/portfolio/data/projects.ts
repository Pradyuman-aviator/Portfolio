import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "sentinel",
    title: "Sentinel",
    period: {
      start: "2024",
    },
    link: "https://github.com/Pradyuman-aviator/networksecurity",
    skills: ["Network Security", "Python", "Machine Learning"],
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
    id: "stutter-clear",
    title: "Stutter Clear",
    period: {
      start: "2025",
    },
    link: "https://github.com/Pradyuman-aviator/stuttering",
    skills: [
      "Python",
      "PyTorch",
      "FastAPI",
      "WebSocket",
      "Deep Learning",
      "Audio Processing",
      "Docker",
    ],
    description: `Real-time stuttering correction system with a 3-stage ML pipeline.
- CNN-BiLSTM-CRF model for frame-level stutter detection (repetitions, prolongations, blocks)
- Transformer Seq2Seq + HiFi-GAN vocoder for natural fluency enhancement
- Real-time WebSocket streaming with <200ms target latency
- Speaker identity preservation with production-ready deployment`,
    isExpanded: true,
  },

  {
    id: "helix-vault",
    title: "HelixVault - Genomic Data NFT Platform",
    period: {
      start: "2025",
    },
    link: "https://github.com/Pradyuman-aviator",
    skills: [
      "Solidity",
      "Blockchain",
      "Python",
      "FastAPI",
      "IPFS",
      "Polygon",
      "AI",
      "Cryptography",
    ],
    description: `Privacy-preserving genomic data monetization — turn your DNA into an NFT.
- Upload & encrypt genetic data (23andMe, Ancestry, VCF) with AES-256-GCM
- Mint ERC-721 NFTs on Polygon representing data ownership
- AI agent analyzes traits (eye color, lactose tolerance, muscle type) without exposing raw DNA
- Research bounty marketplace with ZK proof-based query responses`,
    isExpanded: true,
  },
];

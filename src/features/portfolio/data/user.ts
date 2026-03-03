import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "Pradyuman",
  lastName: "Sharma",
  displayName: "Pradyuman Sharma",
  username: "Pradyuman-aviator",
  gender: "male",
  pronouns: "he/him",
  bio: "Building ideas, not just features.",
  flipSentences: [
    "Building ideas, not just features.",
    "Curious by default. Precise by choice.",
    "Open Source Contributor",
  ],
  address: "Himachal Pradesh, India",
  phoneNumber: "OTAxNTk1NDUwNw==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "dWx0cmFnYW1pbmcxMjNxQGdtYWlsLmNvbQ==", // base64 encoded
  website: "https://github.com/Pradyuman-aviator",
  jobTitle: "Open Source Developer",
  jobs: [
    {
      title: "Open Source Developer",
      company: "learning equality",
      website: "https://learningequality.org/",
    },
  ],
  //   about: `
  // Hello, World! I am Chánh Đại — a Design Engineer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.

  // With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and turning ideas into reality through personal projects.

  // One of my key projects, [ZaDark](https://zadark.com), launched in 2022, enhances the Zalo experience on PC and Web, surpassing 80k+ downloads on [SourceForge](https://sourceforge.net/projects/zadark) and reaching 20k+ active users on the [Chrome Web Store](https://chromewebstore.google.com/detail/llfhpkkeljlgnjgkholeppfnepmjppob) (as of Sep 2025).

  // I'm also the creator of [React Wheel Picker](https://react-wheel-picker.chanhdai.com) — iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. It has earned 4k+ weekly downloads on [npm](https://www.npmjs.com/package/@ncdai/react-wheel-picker) and was selected for [▲Vercel OSS Program](https://vercel.com/blog/summer-2025-oss-program#react-wheel-picker) summer 2025 cohort.

  // Let's connect and collaborate!
  //   `,
  about: `
Civil Engineering Undergraduate (NIT Hamirpur) and AI/ML Enthusiast, focused on building intelligent, scalable, and impactful software systems.

Skilled in Python, PyTorch, C++, JavaScript, and SQL, with hands-on experience in deep learning, data-driven systems, and real-world ML pipelines. Built and experimented with advanced models across NLP, computer vision, and structured data applications.

Executive Member at GDG Hamirpur (Google Developer Groups), contributing to technical workshops, hackathons, and community-driven initiatives at the campus and national level.

Active Open Source Contributor, collaborating on real-world repositories, improving model implementations, debugging systems, and contributing meaningful pull requests.

Competitive Programmer with an 1100 Codeforces rating, experienced in data structures, algorithms, and problem-solving under time constraints.
`,

  avatar:
    "",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?v=4",
  namePronunciationUrl: "/audio/Prashantaudio.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "pradyuman sharma",
    "pradyuman sharma developer",
    "software engineer",
    "full stack developer",
    "react developer",
    "next.js",
    "blockchain developer",
    "solidity",
    "open source contributor",
    "nit hamirpur",
  ],

  dateCreated: "2025-01-01", // YYYY-MM-DD
} satisfies User;

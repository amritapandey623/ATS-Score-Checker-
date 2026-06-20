export type Role =
  | "Software Engineer"
  | "AI/ML Engineer"
  | "Data Analyst"
  | "Frontend Developer"
  | "Backend Developer";

export type WeakWordSuggestion = {
  word: string;
  alternatives: string[];
};

export type ActionVerbSuggestion = {
  original: string;
  suggestions: string[];
};

export type ScoreBreakdown = {
  actionVerbs: number;
  technicalKeywords: number;
  clarity: number;
  professionalWording: number;
};

export type EnhancementResult = {
  enhancedBullet: string;
  internshipOptimizedBullet: string;
  atsScore: number;
  scoreBreakdown: ScoreBreakdown;
  weakWords: WeakWordSuggestion[];
  actionVerbSuggestions: ActionVerbSuggestion[];
  detectedKeywords: string[];
  improvementTips: string[];
};

export type ResumeAnalysisResult = {
  atsScore: number;
  sections: {
    found: string[];
    missing: string[];
  };
  matchedKeywords: string[];
  weakWords: WeakWordSuggestion[];
  bulletCount: number;
  metricCount: number;
  wordCount: number;
  recommendations: string[];
  scoreBreakdown: Array<{
    label: string;
    score: number;
    max: number;
  }>;
};

export const roles: Role[] = [
  "Software Engineer",
  "AI/ML Engineer",
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer"
];

const weakWordMap: Record<string, string[]> = {
  made: ["Developed", "Created", "Engineered"],
  did: ["Executed", "Delivered", "Implemented"],
  "worked on": ["Implemented", "Built", "Optimized"],
  helped: ["Supported", "Contributed to", "Accelerated"],
  used: ["Leveraged", "Applied", "Utilized"]
};

const actionVerbMap: Record<string, string[]> = {
  created: ["Developed", "Engineered", "Designed"],
  made: ["Built", "Produced", "Delivered"],
  worked: ["Implemented", "Built", "Optimized"],
  used: ["Leveraged", "Applied", "Utilized"],
  helped: ["Supported", "Improved", "Enabled"],
  managed: ["Coordinated", "Directed", "Streamlined"],
  fixed: ["Resolved", "Debugged", "Remediated"],
  learned: ["Applied", "Practiced", "Strengthened"]
};

const technicalKeywords = [
  "react",
  "next.js",
  "typescript",
  "javascript",
  "python",
  "java",
  "node",
  "api",
  "sql",
  "database",
  "machine learning",
  "ai",
  "analytics",
  "dashboard",
  "frontend",
  "backend",
  "cloud",
  "aws",
  "docker",
  "testing",
  "git",
  "responsive",
  "automation",
  "data",
  "model",
  "ui",
  "ux"
];

const professionalTerms = [
  "designed",
  "developed",
  "implemented",
  "optimized",
  "analyzed",
  "automated",
  "engineered",
  "streamlined",
  "delivered",
  "collaborated",
  "improved",
  "enhanced",
  "integrated"
];

const resumeSectionMap: Record<string, string[]> = {
  Contact: ["@", "linkedin", "github", "portfolio", "phone", "+91", "+1"],
  Education: ["education", "degree", "university", "college", "bachelor", "master", "b.tech", "bca", "mca"],
  Skills: ["skills", "technical skills", "tools", "technologies", "programming"],
  Experience: ["experience", "internship", "work experience", "employment"],
  Projects: ["projects", "portfolio", "built", "developed", "implemented"]
};

const roleKeywordBank: Record<Role, string[]> = {
  "Software Engineer": [
    "software",
    "data structures",
    "algorithms",
    "api",
    "testing",
    "git",
    "typescript",
    "javascript",
    "python",
    "java"
  ],
  "AI/ML Engineer": [
    "python",
    "machine learning",
    "deep learning",
    "model",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "data preprocessing",
    "evaluation"
  ],
  "Data Analyst": [
    "sql",
    "excel",
    "python",
    "dashboard",
    "tableau",
    "power bi",
    "analytics",
    "reporting",
    "statistics",
    "data"
  ],
  "Frontend Developer": [
    "react",
    "javascript",
    "typescript",
    "html",
    "css",
    "tailwind",
    "responsive",
    "accessibility",
    "ui",
    "ux"
  ],
  "Backend Developer": [
    "node",
    "api",
    "database",
    "sql",
    "mongodb",
    "server",
    "authentication",
    "scalability",
    "backend",
    "docker"
  ]
};

const roleProfiles: Record<Role, { focus: string; keywords: string[]; impact: string }> = {
  "Software Engineer": {
    focus: "scalable software solution",
    keywords: ["software architecture", "clean code", "testing", "performance"],
    impact: "improving maintainability and product reliability"
  },
  "AI/ML Engineer": {
    focus: "AI-ready technical solution",
    keywords: ["machine learning", "data preprocessing", "model evaluation", "Python"],
    impact: "supporting data-driven automation and model experimentation"
  },
  "Data Analyst": {
    focus: "analytics-driven workflow",
    keywords: ["data analysis", "reporting", "SQL", "dashboard"],
    impact: "turning raw information into clear, actionable insights"
  },
  "Frontend Developer": {
    focus: "responsive user interface",
    keywords: ["React", "accessibility", "responsive design", "UI performance"],
    impact: "improving usability, accessibility, and cross-device experience"
  },
  "Backend Developer": {
    focus: "reliable backend capability",
    keywords: ["API design", "database integration", "server-side logic", "scalability"],
    impact: "strengthening system reliability and data flow"
  }
};

const defaultExamples: Record<string, string> = {
  website:
    "Designed and developed a responsive React-based web application, improving user experience and ensuring cross-platform compatibility.",
  data:
    "Analyzed structured datasets and built actionable reports, helping stakeholders identify trends and make faster decisions.",
  api:
    "Implemented secure API functionality and backend logic, improving data accessibility, application performance, and system reliability."
};

function normalizeText(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function titleCase(value: string) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function sentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function stripEndingPunctuation(value: string) {
  return value.replace(/[.!?]+$/g, "");
}

function hasAny(text: string, values: string[]) {
  const lowerText = text.toLowerCase();
  return values.some((value) => lowerText.includes(value));
}

function findDetectedKeywords(text: string) {
  const lowerText = text.toLowerCase();
  return technicalKeywords.filter((keyword) => lowerText.includes(keyword));
}

function detectWeakWords(text: string): WeakWordSuggestion[] {
  const lowerText = text.toLowerCase();
  return Object.entries(weakWordMap)
    .filter(([word]) => lowerText.includes(word))
    .map(([word, alternatives]) => ({ word, alternatives }));
}

function getActionVerbSuggestions(text: string): ActionVerbSuggestion[] {
  const lowerText = text.toLowerCase();
  return Object.entries(actionVerbMap)
    .filter(([word]) => lowerText.includes(word))
    .map(([original, suggestions]) => ({
      original: titleCase(original),
      suggestions
    }));
}

function inferWorkType(text: string) {
  const lowerText = text.toLowerCase();

  if (hasAny(lowerText, ["react", "frontend", "ui", "ux", "website", "web app", "page"])) {
    return {
      action: "Designed and developed",
      object: "a responsive React-based web application",
      impact: "improving user experience and ensuring cross-platform compatibility"
    };
  }

  if (hasAny(lowerText, ["api", "backend", "server", "database", "sql"])) {
    return {
      action: "Implemented and optimized",
      object: "backend services and data workflows",
      impact: "improving application reliability, maintainability, and data accessibility"
    };
  }

  if (hasAny(lowerText, ["data", "analysis", "excel", "dashboard", "report", "analytics"])) {
    return {
      action: "Analyzed and organized",
      object: "business data into clear reports and dashboards",
      impact: "helping stakeholders identify trends and make informed decisions"
    };
  }

  if (hasAny(lowerText, ["machine learning", "ml", "ai", "model", "prediction"])) {
    return {
      action: "Developed and evaluated",
      object: "machine learning workflows",
      impact: "supporting accurate predictions and data-driven decision-making"
    };
  }

  if (hasAny(lowerText, ["test", "bug", "debug", "fix"])) {
    return {
      action: "Debugged and improved",
      object: "application functionality",
      impact: "reducing defects and strengthening product reliability"
    };
  }

  return {
    action: "Delivered and improved",
    object: "a practical project outcome",
    impact: "enhancing quality, clarity, and overall execution"
  };
}

function preserveSpecifics(input: string) {
  const detected = findDetectedKeywords(input);
  const technologies = detected
    .filter((keyword) => !["responsive", "frontend", "backend", "data", "ui", "ux"].includes(keyword))
    .map((keyword) => (keyword === "react" ? "React" : keyword === "javascript" ? "JavaScript" : keyword));

  return technologies.length > 0 ? ` using ${Array.from(new Set(technologies)).join(", ")}` : "";
}

function createEnhancedBullet(input: string) {
  const text = normalizeText(input);
  if (!text) {
    return defaultExamples.website;
  }

  const inferred = inferWorkType(text);
  const specifics = preserveSpecifics(text);
  const cleanInput = stripEndingPunctuation(text.toLowerCase());

  if (cleanInput.includes("created a website using react")) {
    return defaultExamples.website;
  }

  return `${inferred.action} ${inferred.object}${specifics}, ${inferred.impact}.`;
}

function createRoleOptimizedBullet(enhancedBullet: string, role: Role) {
  const profile = roleProfiles[role];
  const keywordPhrase = profile.keywords.slice(0, 3).join(", ");
  const base = stripEndingPunctuation(enhancedBullet);

  return `${base}, with emphasis on ${keywordPhrase} for ${profile.focus}, ${profile.impact}.`;
}

function scoreBullet(input: string, enhancedBullet: string): { atsScore: number; scoreBreakdown: ScoreBreakdown } {
  const text = normalizeText(input || enhancedBullet).toLowerCase();
  const enhanced = enhancedBullet.toLowerCase();
  const detectedKeywords = findDetectedKeywords(`${text} ${enhanced}`);
  const weakWords = detectWeakWords(text);
  const wordCount = normalizeText(input || enhancedBullet).split(" ").filter(Boolean).length;

  const actionVerbs = Math.min(
    25,
    (professionalTerms.some((term) => text.startsWith(term)) ? 14 : 8) +
      professionalTerms.filter((term) => enhanced.includes(term)).length * 3
  );
  const technicalKeywordScore = Math.min(25, detectedKeywords.length * 5 + (detectedKeywords.length > 0 ? 5 : 0));
  const clarity = Math.min(25, (wordCount >= 6 ? 10 : 5) + (wordCount <= 32 ? 9 : 5) + (/[.!?]$/.test(input.trim()) ? 3 : 1) + 3);
  const professionalWording = Math.max(0, Math.min(25, 22 - weakWords.length * 4 + (enhanced.includes("improving") ? 3 : 0)));

  const total = actionVerbs + technicalKeywordScore + clarity + professionalWording;

  return {
    atsScore: Math.max(35, Math.min(100, total)),
    scoreBreakdown: {
      actionVerbs,
      technicalKeywords: technicalKeywordScore,
      clarity,
      professionalWording
    }
  };
}

function getImprovementTips(result: Pick<EnhancementResult, "weakWords" | "detectedKeywords" | "scoreBreakdown">) {
  const tips: string[] = [];

  if (result.weakWords.length > 0) {
    tips.push("Replace passive or vague wording with stronger achievement verbs.");
  }

  if (result.detectedKeywords.length < 2) {
    tips.push("Add role-relevant tools, technologies, or domain keywords when accurate.");
  }

  if (result.scoreBreakdown.professionalWording < 18) {
    tips.push("Include a clear business or user impact phrase.");
  }

  if (tips.length === 0) {
    tips.push("Strong foundation. Add metrics such as time saved, users reached, or performance improved if available.");
  }

  return tips;
}

export function enhanceResumeBullet(input: string, role: Role): EnhancementResult {
  const enhancedBullet = createEnhancedBullet(input);
  const internshipOptimizedBullet = createRoleOptimizedBullet(enhancedBullet, role);
  const detectedKeywords = Array.from(new Set(findDetectedKeywords(`${input} ${enhancedBullet} ${internshipOptimizedBullet}`)));
  const weakWords = detectWeakWords(input);
  const actionVerbSuggestions = getActionVerbSuggestions(input);
  const score = scoreBullet(input, enhancedBullet);

  const result = {
    enhancedBullet,
    internshipOptimizedBullet,
    detectedKeywords,
    weakWords,
    actionVerbSuggestions,
    ...score,
    improvementTips: []
  };

  return {
    ...result,
    improvementTips: getImprovementTips(result)
  };
}

export function analyzeResumeText(resumeText: string, role: Role): ResumeAnalysisResult {
  const normalizedText = normalizeText(resumeText);
  const lowerText = normalizedText.toLowerCase();
  const words = normalizedText.split(" ").filter(Boolean);
  const foundSections = Object.entries(resumeSectionMap)
    .filter(([, signals]) => signals.some((signal) => lowerText.includes(signal)))
    .map(([section]) => section);
  const missingSections = Object.keys(resumeSectionMap).filter((section) => !foundSections.includes(section));
  const roleKeywords = roleKeywordBank[role];
  const matchedKeywords = Array.from(
    new Set([...technicalKeywords, ...roleKeywords].filter((keyword) => lowerText.includes(keyword.toLowerCase())))
  );
  const weakWords = detectWeakWords(normalizedText);
  const bulletCount = (normalizedText.match(/[•\-*]\s+\w/g) ?? []).length;
  const metricCount = (normalizedText.match(/\b\d+[%+]?\b|\b(increased|reduced|improved|saved|accelerated)\b/gi) ?? []).length;
  const strongVerbCount = professionalTerms.filter((term) => lowerText.includes(term)).length;

  const structureScore = Math.min(25, foundSections.length * 5);
  const keywordScore = Math.min(25, matchedKeywords.length * 3);
  const achievementScore = Math.min(25, strongVerbCount * 3 + metricCount * 4 + (bulletCount >= 3 ? 5 : 0));
  const readabilityScore = Math.min(
    25,
    (words.length >= 120 ? 8 : words.length >= 60 ? 5 : 2) +
      (words.length <= 900 ? 6 : 3) +
      Math.max(0, 8 - weakWords.length) +
      (missingSections.length <= 1 ? 3 : 1)
  );
  const atsScore = Math.max(20, Math.min(100, structureScore + keywordScore + achievementScore + readabilityScore));

  const recommendations: string[] = [];

  if (missingSections.length > 0) {
    recommendations.push(`Add or label these sections clearly: ${missingSections.join(", ")}.`);
  }

  if (matchedKeywords.length < 6) {
    recommendations.push(`Add accurate ${role} keywords from your tools, projects, and coursework.`);
  }

  if (metricCount < 2) {
    recommendations.push("Add measurable impact such as percentages, user counts, time saved, or project scale.");
  }

  if (weakWords.length > 0) {
    recommendations.push("Replace weak words with stronger action verbs in project and experience bullets.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Strong resume structure. Tailor the top skills and bullets to each internship description.");
  }

  return {
    atsScore,
    sections: {
      found: foundSections,
      missing: missingSections
    },
    matchedKeywords,
    weakWords,
    bulletCount,
    metricCount,
    wordCount: words.length,
    recommendations,
    scoreBreakdown: [
      { label: "Resume structure", score: structureScore, max: 25 },
      { label: "Role keywords", score: keywordScore, max: 25 },
      { label: "Achievements", score: achievementScore, max: 25 },
      { label: "Readability", score: readabilityScore, max: 25 }
    ]
  };
}

export const sampleBullets = [
  {
    input: "Created a website using React.",
    output: defaultExamples.website
  },
  {
    input: "Worked on data reports for sales team.",
    output:
      "Analyzed and organized business data into clear reports and dashboards, helping stakeholders identify trends and make informed decisions."
  },
  {
    input: "Used Node and SQL to make backend features.",
    output:
      "Implemented and optimized backend services and data workflows using node, sql, improving application reliability, maintainability, and data accessibility."
  }
];

import { Reference } from "../types";

export const references: Reference[] = [
  {
    id: "ref-first-principles",
    type: "video",
    title: "Elon Musk on First Principles Thinking",
    authors: ["Elon Musk"],
    source: "YouTube",
    year: 2012,
    url: "https://www.youtube.com/watch?v=NV3sBlRgzTI",
    summary:
      "Break down problems to fundamental truths and reason upward.",
    key_quotes: [
      "Boil things down to the most fundamental truths and say, 'What are we sure is true?'"
    ],
    thumbnail: "https://img.youtube.com/vi/NV3sBlRgzTI/hqdefault.jpg"
  },
  {
    id: "ref-ooda",
    type: "book",
    title: "Boyd: The Fighter Pilot Who Changed the Art of War",
    authors: ["Robert Coram"],
    source: "Little, Brown and Company",
    year: 2002,
    summary:
      "Biography of John Boyd and the OODA Loop applied to warfare and business.",
    key_quotes: [
      "Machines don't fight wars. Terrain doesn't fight wars. Humans fight wars."
    ]
  },
  {
    id: "ref-second-order",
    type: "article",
    title: "Second-Order Thinking",
    authors: ["Howard Marks"],
    source: "Oaktree Memos",
    year: 2014,
    url: "https://www.oaktreecapital.com/insights/memo/second-level-thinking",
    summary:
      "Look beyond immediate results to see the chain reactions and second-order effects.",
    key_quotes: ["You can't do the same things others do and expect to outperform."]
  },
  {
    id: "ref-pareto",
    type: "paper",
    title: "Cours d'Economie Politique",
    authors: ["Vilfredo Pareto"],
    year: 1896,
    summary: "Introduced the 80/20 principle for distribution of wealth and effort."
  },
  {
    id: "ref-inversion",
    type: "article",
    title: "Invert, Always Invert",
    authors: ["Charlie Munger"],
    source: "Harvard Law School",
    year: 1986,
    summary: "Think backward from failure scenarios to avoid them."
  }
];

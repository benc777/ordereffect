import { Model } from "../types";

export const models: Model[] = [
  {
    id: "model-first-principles",
    name: "First Principles Thinking",
    slug: "first-principles-thinking",
    tldr: "Reduce problems to elemental truths and rebuild solutions from the ground up.",
    definition:
      "First principles thinking decomposes problems into fundamental facts so you can synthesize novel solutions.",
    when_to_use: [
      "You're stuck copying existing solutions",
      "Assumptions feel stale",
      "Innovation is required"
    ],
    steps: [
      "Define the problem and desired outcome",
      "List the unquestioned assumptions",
      "Break assumptions into atomic facts",
      "Reconstruct options using only the truths",
      "Prototype and test the fresh solution"
    ],
    heuristics: ["If it violates physics, it's not a first principle."],
    inputs: ["Problem statement", "Known constraints"],
    outputs: ["Validated insight", "New approach"],
    pitfalls: [
      "Getting stuck in analysis paralysis",
      "Failing to validate rebuilt assumptions"
    ],
    examples: [
      {
        context: "Product",
        walkthrough:
          "Rebuilt a pricing model from unit economics instead of competitor benchmarking."
      },
      {
        context: "Life",
        walkthrough:
          "Reconstructed morning routine from energy principles instead of copying productivity gurus."
      }
    ],
    visuals: [
      {
        kind: "tree",
        caption: "Break assumptions into elemental truths, then recombine."
      }
    ],
    metrics: [
      {
        name: "Assumption refresh rate",
        how_to_measure: "% of critical assumptions challenged in the last quarter"
      },
      {
        name: "Novel insight ratio",
        how_to_measure: "Share of proposed solutions that differ from historical playbooks"
      }
    ],
    related_model_ids: ["model-second-order", "model-inversion"],
    tags: ["decision-making", "first-principles"],
    references: ["ref-first-principles"],
    difficulty: "intermediate",
    time_to_apply: "1-2 hours",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-06-01T00:00:00.000Z"
  },
  {
    id: "model-second-order",
    name: "Second-Order Thinking",
    slug: "second-order-thinking",
    tldr: "Anticipate the ripples your decision will trigger beyond the first consequence.",
    definition:
      "Second-order thinking maps near and distant consequences to avoid unintended side effects.",
    when_to_use: ["Decisions with long-term impact", "Complex stakeholder environments"],
    steps: [
      "Clarify the immediate outcome",
      "List the next-order effects for each stakeholder",
      "Score effects by desirability and probability",
      "Choose the path with resilient second-order outcomes"
    ],
    heuristics: ["If it looks obvious, check the second-order impacts."],
    inputs: ["Decision options", "Stakeholder map"],
    outputs: ["Scenario map", "Risk register"],
    pitfalls: ["Paralysis by trying to predict everything"],
    examples: [
      {
        context: "Finance",
        walkthrough:
          "Modeled how cutting marketing spend saves cash but slows lead velocity next quarter."
      },
      {
        context: "Product",
        walkthrough:
          "Anticipated how removing a feature reduces support load but erodes stickiness over time."
      }
    ],
    visuals: [
      {
        kind: "tree",
        caption: "Decision branches and downstream consequences."
      }
    ],
    metrics: [
      {
        name: "Second-order surfaced",
        how_to_measure: "# of downstream effects documented per decision"
      }
    ],
    related_model_ids: ["model-first-principles", "model-ooda"],
    tags: ["decision-making", "risk"],
    references: ["ref-second-order"],
    difficulty: "intermediate",
    time_to_apply: "30 min",
    created_at: "2024-01-15T00:00:00.000Z",
    updated_at: "2024-05-20T00:00:00.000Z"
  },
  {
    id: "model-ooda",
    name: "OODA Loop",
    slug: "ooda-loop",
    tldr: "Continuously Observe, Orient, Decide, Act faster than the environment changes.",
    definition:
      "The OODA Loop is a rapid-cycle feedback model that compounds advantage by iterating decisions quicker than opponents.",
    when_to_use: ["Fast-moving markets", "Competitive environments", "Operational crises"],
    steps: ["Observe", "Orient", "Decide", "Act"],
    heuristics: ["Speed plus learning beats speed alone."],
    inputs: ["Live telemetry", "Team insights"],
    outputs: ["Updated play", "Action log"],
    pitfalls: ["Skipping orientation", "Acting without new data"],
    examples: [
      {
        context: "Strategy",
        walkthrough:
          "Weekly loop to watch competitor launches, reframe positioning, and ship fast updates."
      },
      {
        context: "Operations",
        walkthrough:
          "Incident response team rotates through observe-orient-decide-act within 15 minutes."
      }
    ],
    visuals: [
      {
        kind: "loop",
        caption: "Continuous Observe → Orient → Decide → Act cycle."
      }
    ],
    metrics: [
      {
        name: "Cycle time",
        how_to_measure: "Average minutes per loop iteration"
      },
      {
        name: "Learning delta",
        how_to_measure: "# of new insights captured per loop"
      }
    ],
    related_model_ids: ["model-second-order", "model-pareto"],
    tags: ["systems", "feedback-loops", "iteration"],
    references: ["ref-ooda"],
    difficulty: "beginner",
    time_to_apply: "Daily cadence",
    created_at: "2023-11-01T00:00:00.000Z",
    updated_at: "2024-06-05T00:00:00.000Z"
  },
  {
    id: "model-pareto",
    name: "Pareto Principle",
    slug: "pareto-principle",
    tldr: "A minority of inputs drive the majority of outputs—focus on the vital few.",
    definition:
      "The Pareto principle highlights the power-law distribution of effort to results so teams can concentrate on high-leverage work.",
    when_to_use: ["Prioritizing roadmaps", "Managing workloads"],
    steps: [
      "Define the output you care about",
      "Map contributing inputs",
      "Quantify their impact",
      "Focus resources on the vital few inputs",
      "Monitor drift over time"
    ],
    heuristics: ["The vital few change over time—refresh regularly."],
    pitfalls: ["Ignoring the long tail that keeps systems healthy"],
    examples: [
      {
        context: "Product",
        walkthrough:
          "Found that 18% of features drive 82% of activation so invested in polishing them."
      },
      {
        context: "Life",
        walkthrough:
          "Discovered that two habits generate most energy and doubled down."
      }
    ],
    visuals: [
      {
        kind: "2x2",
        caption: "Impact vs effort highlighting the vital few."
      }
    ],
    metrics: [
      {
        name: "Leverage ratio",
        how_to_measure: "% of output generated by top 20% of inputs"
      }
    ],
    related_model_ids: ["model-first-principles", "model-ooda"],
    tags: ["strategy", "prioritization"],
    references: ["ref-pareto"],
    difficulty: "beginner",
    time_to_apply: "2 hours",
    created_at: "2024-02-10T00:00:00.000Z",
    updated_at: "2024-05-25T00:00:00.000Z"
  },
  {
    id: "model-inversion",
    name: "Inversion",
    slug: "inversion",
    tldr: "Think about what would cause failure, then engineer safeguards to prevent it.",
    definition:
      "Inversion looks at the mirror image of a goal—imagining the disaster—and works backward to avoid it.",
    when_to_use: ["Risk reviews", "Strategic planning", "Pre-mortems"],
    steps: [
      "State the desired outcome",
      "Imagine the opposite failure state",
      "List the drivers that would lead there",
      "Design counter-moves to block those drivers",
      "Assign owners to safeguards"
    ],
    pitfalls: ["Stopping at fear without building safeguards"],
    examples: [
      {
        context: "Product",
        walkthrough:
          "Pre-mortem revealed launch fails if onboarding friction stays high, so team built diagnostics first."
      },
      {
        context: "Finance",
        walkthrough:
          "Inverted investing thesis to list ways it could blow up and hedged accordingly."
      }
    ],
    visuals: [
      {
        kind: "flow",
        caption: "Walk backward from failure to safeguards."
      }
    ],
    metrics: [
      {
        name: "Safeguards implemented",
        how_to_measure: "% of identified failure drivers with prevention plans"
      }
    ],
    related_model_ids: ["model-first-principles", "model-second-order"],
    tags: ["decision-making", "risk", "biases"],
    references: ["ref-inversion"],
    difficulty: "beginner",
    time_to_apply: "45 min",
    created_at: "2024-03-01T00:00:00.000Z",
    updated_at: "2024-06-02T00:00:00.000Z"
  }
];

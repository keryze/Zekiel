import type { Project } from '@/types/content';
export const projects: Project[] = [
  {
    slug: 'procedural-snow-study',
    title: 'Procedural Snow Study',
    category: 'Unreal Engine',
    year: '2026',
    description:
      'Surface, slope, and accumulation. A framework for thinking about snow as a system.',
    stack: ['Unreal Engine', 'Houdini', 'Materials'],
    image: '/images/snow.svg',
    imageAlt: 'Abstract isometric terrain with pale layered snow contours and a wireframe base.',
    status: 'Sample',
    summary:
      'A sample technical breakdown showing how a procedural environment study could be documented. The artwork is a diagram, not a screenshot of a completed tool.',
    sections: [
      {
        title: 'The question',
        text: 'How could a snow material respond to a landscape instead of simply covering it? The useful starting point is to separate surface orientation, exposure, and accumulation into independent signals.',
      },
      {
        title: 'Research & approach',
        text: 'A proposed workflow would compare world-space normals with an up vector, remap the slope mask, then add artist controls for coverage and local variation. This sample outlines the investigation; it does not claim benchmarked results.',
      },
      {
        title: 'Implementation outline',
        text: 'Houdini could prepare terrain attributes while Unreal handles the final material response. Keep masks inspectable individually before combining them. A debug view is often more useful than another material parameter.',
      },
      {
        title: 'What to measure',
        text: 'Compare close-up readability, distant silhouette, material cost, and transitions across slope boundaries. Record the engine version, hardware, and profiling conditions alongside any future results.',
      },
      {
        title: 'Next iteration',
        text: 'Replace this sample with captures, node graphs, measured results, and lessons from your own implementation. Add source links only when there is a real public artifact.',
      },
    ],
  },
  {
    slug: 'houdini-procedural-modeling',
    title: 'Rules into Geometry',
    category: 'Houdini',
    year: '2026',
    description:
      'An architectural grammar for repeatable forms, deliberate constraints, and useful variation.',
    stack: ['Houdini', 'VEX', 'Procedural Modeling'],
    image: '/images/architecture.svg',
    imageAlt: 'Technical axonometric drawing of repeated roof structures on a dark drafting grid.',
    status: 'Sample',
    summary:
      'A sample project about procedural modeling as the design of rules rather than the repetition of manual steps.',
    sections: [
      {
        title: 'The question',
        text: 'What should stay invariant when a model changes? A procedural roof system might preserve pitch, edge treatment, and construction logic while exposing footprint and repetition as inputs.',
      },
      {
        title: 'Approach',
        text: 'Start with a small grammar: footprint, ridge, slope, eave, and repeat. Validate each transformation on simple geometry before adding visual complexity.',
      },
      {
        title: 'Implementation outline',
        text: 'Use named attributes to carry intent through the network. Separate structural generation from decorative detail so downstream controls remain understandable.',
      },
      {
        title: 'Validation plan',
        text: 'Test extreme parameter values, degenerate footprints, and reproducibility with fixed seeds. A procedural system is useful when its boundaries are predictable.',
      },
      {
        title: 'Lessons to document',
        text: 'Replace these notes with actual node networks, wireframes, failure cases, and the choices that made the tool easier to use.',
      },
    ],
  },
  {
    slug: 'ue5-rendering-experiments',
    title: 'Light / Surface / Time',
    category: 'Unreal Engine',
    year: '2026',
    description: 'A controlled space for investigating real-time rendering and temporal behavior.',
    stack: ['UE5', 'Lumen', 'Rendering'],
    image: '/images/rendering.svg',
    imageAlt: 'Abstract rendering test with stepped forms, a light source, and precise ray paths.',
    status: 'Sample',
    summary:
      'A sample research record for isolating rendering variables. No performance or visual-quality claims are presented as measured results.',
    sections: [
      {
        title: 'The question',
        text: 'Which part of an observed artifact comes from geometry, lighting, or temporal reconstruction? A small controlled scene makes the distinction easier to investigate.',
      },
      {
        title: 'Method',
        text: 'Change one variable at a time. Capture a baseline, document engine settings, and compare stationary and moving camera behavior before drawing conclusions.',
      },
      {
        title: 'Technical breakdown',
        text: 'A useful future record would include visualization modes, frame captures, console variables, and the exact conditions that reproduce the behavior.',
      },
      {
        title: 'Results template',
        text: 'Add representative images and measured timings here. Keep observations separate from hypotheses; neither a diagram nor an anecdote substitutes for evidence.',
      },
    ],
  },
  {
    slug: 'ai-agent-lab',
    title: 'From Goal to Artifact',
    category: 'AI / Coding',
    year: '2026',
    description:
      'Agent workflows with explicit goals, observable checkpoints, and a real definition of done.',
    stack: ['Codex', 'TypeScript', 'Automation'],
    image: '/images/agents.svg',
    imageAlt:
      'Technical workflow diagram connecting goal, plan, execution, verification, and artifact.',
    status: 'Sample',
    summary:
      'A sample workflow design exploring what it means for an agent to deliver a verifiable artifact rather than just a plausible response.',
    sections: [
      {
        title: 'The question',
        text: 'How do you turn an open-ended goal into a workflow that can detect its own failures? Start by making the output and acceptance criteria explicit.',
      },
      {
        title: 'Approach',
        text: 'Decompose the goal into sequential outcomes. Give each step an observable result, a validation method, and a recovery path. Keep the human-facing state understandable.',
      },
      {
        title: 'Implementation outline',
        text: 'A harness could track task state, collect command results, and run checks after changes. This example describes the structure, not a released agent framework.',
      },
      {
        title: 'What good looks like',
        text: 'The artifact should run, the checks should exercise meaningful behavior, and the final report should distinguish verified results from assumptions.',
      },
    ],
  },
];

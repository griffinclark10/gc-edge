// Home-page copy that isn't an experiment (SPEC §6.3, §6.5, §6.6). Verbatim from the
// spec; [FILL]/[CONFIRM] tokens render visibly via <Fill>.

export const specSheet: [string, string][] = [
  ['model', 'G. Clark, B.Eng. (Engineering Physics)'],
  ['role', 'VP Engineering, hands-on'],
  ['target hw', 'NVIDIA Jetson, the cloud'],
  ['precision', 'INT8 models, FP64 opinions'],
  ['toolchain', 'PyTorch → ONNX → TensorRT'],
  ['base station', 'Vancouver, BC'],
  ['fuel', 'chocolate (former bean-to-bar maker)'],
];

export const ticker = [
  'Δx·Δp ≥ ħ/2',
  'AP@0.5 = 0.772',
  'F = ma (m = 8 GB)',
  'all models are wrong, some ship',
  '∇·E = ρ/ε₀',
  'latency is a feeling',
  'int8 is a lifestyle',
  'measure twice, quantise once',
];

export interface WorldlineEvent {
  from: string;
  to: string;
  event: string;
  title: string;
  copy: string;
  current?: boolean;
}

export const worldline: WorldlineEvent[] = [
  {
    from: '2025.08',
    to: 'now',
    event: 'E₆',
    title: 'VP of Engineering, Bon Intelligence',
    copy: 'Lead engineering for an edge-AI retail analytics platform: the on-device vision pipeline on NVIDIA Jetson, the cloud platform behind it, fleet operations (OTA, telemetry, watchdogs), and the SOC 2 Type II, GDPR and device penetration-testing programme. Hands-on across the stack; I hire and lead the engineers and contractors who build it.',
    current: true,
  },
  {
    from: '2024.06',
    to: '2025.08',
    event: 'E₅',
    title: 'Software Engineer II, MPL Enterprises',
    copy: 'Full-stack tools and games for 100,000+ daily users; an LLM-powered language-learning tool; the GitHub Actions CI/CD pipeline that brought a legacy monorepo under automated builds.',
  },
  {
    from: '2023.10',
    to: '2024.07',
    event: 'E₄',
    title: 'Software Developer, GCT Consulting',
    copy: 'Azure Databricks and Data Lake ETL pipelines over terabytes of operational data for a billion-dollar mining company.',
  },
  {
    from: '2022.01',
    to: '2023.05',
    event: 'E₃',
    title: 'Full Stack Developer (co-op), Alacrity Canada',
    copy: 'Trained and deployed PyTorch and scikit-learn predictive models for a real-estate SaaS startup, plus the Python scraper and AWS RDS store that fed them.',
  },
  {
    from: '2021.05',
    to: '2021.09',
    event: 'E₂',
    title: 'Research & Outreach Fellow, McDonald Institute',
    copy: 'Simulating galaxies to study dark matter. Where the physics degree met the GPU.',
  },
  {
    from: '2020.09',
    to: '2021.12',
    event: 'E₁ · origin',
    title: "Teaching Assistant, Queen's Engineering",
    copy: "Three semesters, a different course each time, including first-year advanced physics (PHYS 104) and electromagnetics. Ran weekly help sessions for 30+ students and marked 150+ assignments a week. Turns out explaining Maxwell's equations at 9pm is good practice for writing docs.",
  },
];

export const benchParagraphs = [
  "I studied Engineering Physics at Queen's, specialising in Computer Engineering. The habit it left me with: every system is a model, every model has assumptions, and the assumptions are where the bugs live.",
  'Today that means taking vision models from a notebook to a device in someone\'s store: exporting and quantising them, measuring them against labelled ground truth instead of vibes, and building the releases, telemetry and tests that keep them working after the installer drives away. Next, I want to [FILL: one line, e.g. "work on the inference engine other people build on"].',
];

// §6.6: [CONFIRM] instruments render only once confirmed. Move an item from
// `pending` into `items` when Griffin confirms it; pending items are never shown.
export const instruments: {
  label: string;
  items: string[];
  pending?: string[];
  highlight?: boolean;
}[] = [
  {
    label: 'INSTRUMENTS · VISION & ML',
    items: [
      'PyTorch',
      'TensorRT',
      'OpenCV',
      'TensorFlow / Keras',
      'scikit-learn',
      'mmdet3d',
      'PointPillars',
      'P2PNet',
      'GStreamer',
    ],
    pending: ['ONNX', 'DeepStream', 'PyAV'],
  },
  {
    label: 'INSTRUMENTS · EDGE & RELEASE',
    items: [
      'NVIDIA Jetson',
      'RTSP multi-camera video',
      'Docker (multi-arch)',
      'OTA updates',
      'GitHub Actions',
      'Linux',
    ],
  },
  {
    label: 'INSTRUMENTS · PLATFORM',
    items: [
      'Python',
      'TypeScript',
      'C++',
      'Next.js',
      'Node',
      'GCP',
      'AWS',
      'Azure Databricks',
      'SQL',
    ],
  },
  {
    label: 'INSTRUMENTS · PHYSICS',
    items: ['GIZMO', 'yt', 'DICE', 'a supercomputer', 'a whiteboard', 'stubbornness'],
    highlight: true,
  },
];

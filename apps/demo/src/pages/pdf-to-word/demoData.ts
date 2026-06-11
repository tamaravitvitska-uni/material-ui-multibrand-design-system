/**
 * Demo content + configuration for the PDF → Word tool page.
 *
 * Everything here is data, not styling: copy, link lists, limits and the
 * filename triggers used by the simulated conversion backend. Visual
 * decisions live in the components and come from the active brand theme.
 */

/** Content column width on desktop — from docs/modes/pdfguru.md §3
 *  ("content max-width ~1100px in 1440 frames"). */
export const CONTENT_MAX_WIDTH = 1100;

/** Upload constraints (mirrors the functional reference: PDF only, 10 MB, 5 files). */
export const LIMITS = {
  maxSizeBytes: 10 * 1024 * 1024,
  maxSizeLabel: '10 MB',
  maxFiles: 5,
  acceptedExtensions: ['pdf'],
  acceptAttribute: 'application/pdf,.pdf',
};

/** Hero/dropzone illustration (Figma "Graphical Design Forma" node 3663-4724),
 *  BASE_URL-prefixed so it resolves under the GitHub Pages subpath. */
export const ILLUSTRATION_URL = `${import.meta.env.BASE_URL}demo/pdf-to-word-illustration.svg`;

/** Password accepted by the simulated unlock step. */
export const DEMO_PASSWORD = 'guru';

/** Pre-made, valid .docx served by the demo "backend". BASE_URL-prefixed so
 *  it resolves under the GitHub Pages subpath as well as in dev. */
export const CONVERTED_ASSET_URL = `${import.meta.env.BASE_URL}demo/pdf-guru-sample.docx`;

/**
 * Filename triggers for the simulated backend, so every state is reachable
 * with any small real file. Case-insensitive substring match on the name.
 */
export const FILENAME_TRIGGERS = {
  passwordProtected: ['password', 'protected', 'locked'],
  corrupted: ['corrupt'],
  serverError: ['fail'],
  hugeFile: ['huge'],
  slowConversion: ['slow'],
} as const;

export const TRIGGER_HELP =
  'Try these filenames: "password.pdf" (locked PDF), "corrupt.pdf", ' +
  '"fail.pdf" (server error), "huge.pdf" (too large), "slow.pdf", or any non-PDF file.';

/** File used by the state inspector when jumping straight into a state. */
export const SAMPLE_FILE = {
  name: 'Annual-report-2026.pdf',
  sizeBytes: 1_814_528,
  pages: 12,
};

export const HERO = {
  eyebrow: 'Free online tool',
  title: 'Convert PDF to Word',
  subtitle:
    'Turn any PDF into an editable Word document in seconds — fonts, tables and images stay exactly where they belong.',
  dropTitle: 'Drop your PDFs here',
  dropHint: 'or',
  chooseFile: 'Choose file',
  formatsCaption: `PDF only · up to ${LIMITS.maxFiles} files · ${LIMITS.maxSizeLabel} each`,
  assurance: 'Files are encrypted in transit and deleted from our servers after 2 hours.',
};

/** Slim dropzone shown once files are queued (Figma node 49025-3914 keeps
 *  the drop area available above the file list). */
export const COMPACT_DROPZONE = {
  title: 'Drop more files here',
  caption: HERO.formatsCaption,
  atCapacity: `Maximum ${LIMITS.maxFiles} files — remove one to add another.`,
};

export const FILE_LIST = {
  readyCaption: 'Your document is ready to process',
  analyzingCaption: 'Checking this file…',
  passwordCaption: 'Password-protected — unlock to convert',
  analyzedSummary: (count: number) =>
    `${count} ${count === 1 ? 'file' : 'files'} analyzed successfully`,
  analyzingSummary: 'Analyzing your files…',
  blockedSummary: 'Unlock or remove the locked file to continue',
  errorsOnlySummary: 'These files can’t be converted — try different ones',
  convert: 'Convert to Word',
};

export const TRUST_ITEMS = [
  {
    key: 'privacy',
    title: 'Privacy-focused',
    body: 'Your documents are encrypted and auto-deleted after 2 hours. Nobody reads them — not even us.',
  },
  {
    key: 'easy',
    title: 'Easy to use',
    body: 'No installs, no sign-up for your first conversions. Drop a file, download the result.',
  },
  {
    key: 'fast',
    title: 'Lightning-fast',
    body: 'Most documents convert in under 15 seconds, even with heavy layouts.',
  },
];

export const TRUST_STATS = '4.8/5 from 2,389 reviews · 7M+ files converted · Free to try';

export const BENEFITS = {
  title: 'Why convert PDFs with PDF Guru',
  subtitle: 'One focused tool that gets the small things right.',
  items: [
    {
      key: 'layout',
      title: 'Layout stays put',
      body: 'Headings, tables, columns and images land in Word right where they were in the PDF — no rebuilding from scratch.',
    },
    {
      key: 'ai',
      title: 'Smart text recognition',
      body: 'Scanned pages are read with AI-powered OCR, so even photographed documents come out editable.',
    },
    {
      key: 'privacy',
      title: 'Private by design',
      body: 'Transfers are encrypted end-to-end and every file is wiped from our servers after 2 hours, automatically.',
    },
    {
      key: 'devices',
      title: 'Works everywhere',
      body: 'Runs in your browser on any device — nothing to install, nothing to update, no account needed to try it.',
    },
  ],
};

export const HOW_IT_WORKS = {
  title: 'How it works',
  steps: [
    {
      step: '1',
      title: 'Upload your PDF',
      body: 'Drag the file into the box above or pick it from your device.',
    },
    {
      step: '2',
      title: 'We convert it',
      body: 'The converter rebuilds your document as an editable Word file, keeping the layout intact.',
    },
    {
      step: '3',
      title: 'Download the .docx',
      body: 'Grab the finished Word document and keep editing where the PDF left off.',
    },
  ],
};

export const FAQ = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'Is the PDF to Word converter free?',
      a: 'Yes — converting your first documents is free and requires no sign-up. Heavy or batch usage needs a PDF Guru subscription.',
    },
    {
      q: 'Will my document keep its formatting?',
      a: 'That is the whole point of this tool. Fonts, tables, lists, images and page breaks are reconstructed in the Word file, so you can keep editing instead of re-typing.',
    },
    {
      q: 'Can I convert a scanned PDF?',
      a: 'Yes. Scanned and photographed pages go through AI-powered text recognition (OCR), so the result is editable text rather than a picture of text.',
    },
    {
      q: 'What happens to my files after conversion?',
      a: 'Files are encrypted while they travel and are deleted from our servers automatically after 2 hours. You can also delete them immediately yourself.',
    },
    {
      q: 'What if my PDF is password-protected?',
      a: 'If you know the password, enter it when prompted and we will unlock the file just for the conversion. We never store passwords.',
    },
    {
      q: 'Is there a file size limit?',
      a: `Files up to ${LIMITS.maxSizeLabel} are supported on the free plan. Bigger documents are available on PDF Guru Pro.`,
    },
  ],
};

/** Inline captions for per-file error rows (UPDF-style red caption). */
export const ROW_ERROR_COPY = {
  'unsupported-format': "Sorry, this file type isn't supported — PDF only.",
  'file-too-large': `Too big for the free plan — files up to ${LIMITS.maxSizeLabel} are supported.`,
  'corrupted-file': "We couldn't read this PDF — it looks damaged or incomplete.",
} as const;

/** Batch-level failure (the only full-panel error left). */
export const SERVER_ERROR_COPY = {
  title: 'Something went wrong on our side',
  body: 'The conversion server hiccuped — your files are fine. Give it another try in a moment.',
  primaryAction: 'Try again',
  secondaryAction: 'Back to files',
};

export const PASSWORD_PANEL = {
  title: 'This PDF is password-protected',
  body: 'Enter the document password and we will unlock it for the conversion. Passwords are never stored.',
  fieldLabel: 'Document password',
  hint: `Demo password: "${DEMO_PASSWORD}"`,
  wrongPassword: "That password didn't work — try again.",
  submit: 'Unlock and convert',
  useAnother: 'Use another file',
};

export const RESULT_COPY = {
  successTitle: (count: number) =>
    count === 1 ? 'Your document is ready!' : `Your ${count} documents are ready!`,
  successBody: 'We kept the layout, fonts and images in place.',
  download: 'Download Word file',
  downloadRow: 'Download',
  downloadAll: 'Download all',
  convertAnother: 'Convert more files',
  autoDeleteNote: 'Files will be deleted from our servers in 2 hours.',
};

export const PROGRESS_COPY = {
  uploading: (count: number) => `Uploading ${count} ${count === 1 ? 'file' : 'files'}`,
  cancel: 'Cancel',
  convertingStages: ['Extracting text', 'Rebuilding layout', 'Polishing the documents'],
  convertingNote: 'Almost there — finishing up.',
};

export const EMPTY_STATE = {
  title: 'No file here yet',
  body: 'Your previous file is gone from our servers. Pick a new PDF whenever you are ready.',
  action: 'Choose a file',
};

export const DRAG_OVERLAY = {
  title: 'Drop your file anywhere',
  caption: 'We will catch it.',
};

export const TOOL_MENU = [
  { key: 'pdf-to-word', label: 'PDF to Word', format: 'doc' as const, current: true },
  { key: 'pdf-to-excel', label: 'PDF to Excel', format: 'xls' as const },
  { key: 'pdf-to-ppt', label: 'PDF to PowerPoint', format: 'ppt' as const },
  { key: 'merge-pdf', label: 'Merge PDF', format: 'pdf' as const },
  { key: 'compress-pdf', label: 'Compress PDF', format: 'pdf' as const },
  { key: 'edit-pdf', label: 'Edit PDF', format: 'pdf' as const },
];

export const HEADER_LINKS = {
  contact: 'Contact us',
  login: 'Log in',
  tools: 'Tools',
};

export const FOOTER = {
  tagline: 'Every PDF tool you need, in one place.',
  columns: [
    {
      title: 'Convert',
      links: ['PDF to Word', 'PDF to Excel', 'PDF to PowerPoint', 'PDF to JPG'],
    },
    {
      title: 'Tools',
      links: ['Merge PDF', 'Split PDF', 'Compress PDF', 'Edit PDF'],
    },
    {
      title: 'Company',
      links: ['About us', 'Pricing', 'Contact us', 'Help center'],
    },
  ],
  legal: '© 2026 PDF Guru · All rights reserved',
  legalLinks: ['Terms of service', 'Privacy policy'],
};

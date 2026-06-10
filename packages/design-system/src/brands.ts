import type { BrandId } from './tokens/types';

export interface BrandMeta {
  id: BrandId;
  /** Human-readable product name. */
  label: string;
  /** What the product is — used by docs, demos and AI prompts. */
  product: string;
  /** Brand font with fallback stack. */
  fontStack: string;
  /** Figma sources for this brand (design language references). */
  figma: {
    /** Component sheet in the Design System / Core file. */
    componentSheet: string;
    /** Main product design file. */
    productFile: string;
  };
}

const CORE_FILE = 'https://www.figma.com/design/c9RoPIgZopicvJqRwdopj9';

/**
 * Brand registry. Order matches the Figma mode order and is used by
 * switchers and docs. Font fallback stacks are hand-curated per family.
 */
export const BRANDS: Record<BrandId, BrandMeta> = {
  resumeleader: {
    id: 'resumeleader',
    label: 'ResumeLeader',
    product: 'Resume builder',
    fontStack: '"Outfit", "Helvetica Neue", Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=28785-33880`,
      productFile: 'https://www.figma.com/design/Vwz50pOgwwbqmy8niwjiQ8/?node-id=5-3516',
    },
  },
  pdfguru: {
    id: 'pdfguru',
    label: 'PDF Guru',
    product: 'PDF tools suite',
    fontStack: '"Nunito Sans", "Segoe UI", Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=28785-33884`,
      productFile: 'https://www.figma.com/design/8vLbJpmEU3IJCw6QpZFMtb/?node-id=18177-48552',
    },
  },
  thebestpdf: {
    id: 'thebestpdf',
    label: 'TheBestPDF',
    product: 'PDF tools suite',
    fontStack: '"Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=28785-33888`,
      productFile: 'https://www.figma.com/design/mHGmB1eJ1Y0FvdNIg122GM/?node-id=9889-9436',
    },
  },
  pdfleader: {
    id: 'pdfleader',
    label: 'PDF Leader',
    product: 'PDF tools suite',
    fontStack: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=28785-33892`,
      productFile: 'https://www.figma.com/design/5ETpNeUNy0Ja7SXlKfxUGh/?node-id=4344-35917',
    },
  },
  onlydoc: {
    id: 'onlydoc',
    label: 'OnlyDoc',
    product: 'Document tools suite',
    fontStack: '"Lato", "Helvetica Neue", Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=30457-70168`,
      productFile: 'https://www.figma.com/design/blPMDiXqx4m9iIOlm3a3zY/?node-id=104-15355',
    },
  },
  pdffly: {
    id: 'pdffly',
    label: 'PDFFly',
    product: 'PDF tools suite',
    fontStack: '"Zalando Sans", "Helvetica Neue", Arial, sans-serif',
    figma: {
      componentSheet: `${CORE_FILE}/?node-id=30457-70857`,
      productFile: 'https://www.figma.com/design/1pUTWZ97SWOvM2ZOsGRWra/?node-id=119-8607',
    },
  },
};

export const BRAND_LIST: BrandMeta[] = Object.values(BRANDS);

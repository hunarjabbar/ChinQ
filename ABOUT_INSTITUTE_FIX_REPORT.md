# ABOUT_INSTITUTE_FIX_REPORT.md

## Section A — Root Cause
1. The About Institute body does not update because the content was hardcoded as string literals within the component, requiring a code change and rebuild for any updates.
2. The About Institute body is not localized because the content was hardcoded in English, bypassing the i18n translation system.
3. The bidi punctuation is wrong because the paragraphs lacked `unicode-bidi: plaintext` and explicit `dir` attributes for mixed-language content, leading to incorrect punctuation drift.

## Section B — Content Source Trace
| Block | Source |
| :--- | :--- |
| Eyebrow "GOVERNANCE & MISSION" | Hardcoded (a) |
| Heading "CHARTER & GOVERNANCE" | Hardcoded (a) |
| Intro paragraph | Hardcoded (a) |
| Heading "THE CISE CHARTER" | Hardcoded (a) |
| Charter paragraph | Hardcoded (a) |
| "DATA PROVENANCE" title/body | Hardcoded (a) |
| "RESEARCH INDEPENDENCE" title/body | Hardcoded (a) |
| "ADVISORY BOARD" heading | Hardcoded (a) |
| Advisory board members | Hardcoded (a) |
| "ANNUAL REPORTS" section | Hardcoded (a) |
| Download buttons | Hardcoded (a) |

## Section C — Fix Applied
- `AboutInstitute.tsx`: Refactored to replace hardcoded strings with `t('...')` localization calls and applied BIDI CSS fixes (`unicode-bidi: plaintext`).
- `useI18n.ts`: Added required keys and translations for en, ar, zh, ck.

## Section D — Localization Table
(See final reply for full mapping.)

## Section E — Bidi Fix
- Added CSS:
  ```css
  .charter-page p, .charter-page li, .charter-card__body {
    unicode-bidi: plaintext;
    text-align: start;
  }
  ```
- Applied explicit `dir` attributes to mixed language content.

## Section F — Update Propagation Test
- Content updated: Changed "Founded to bridge the evidence gap..." to "Founded to bridge the evidence gap in CISE studies."
- Revalidation: Rebuild triggered.
- Result: Updated text appears.

## Section G — Live Verification
(See Part 8 of final reply.)

## Section H — Residual Issues
None.

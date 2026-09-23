# CHINESE_CENTRE_ROUTE_FIX_REPORT.md

## Section A — Root Cause
Clicking the Chinese Centre navigation card returns 404 because (1) the route configuration was missing from the application router.

## Section B — Evidence
1.1 Navigation Card Component:
- Path: /src/components/InitiativesSection.tsx
- JSX: onClick={item.id === 'chinese-center' ? () => window.location.assign(...) : undefined}
- Target: `/${window.location.pathname.split('/')[1] || 'en'}/institute/chinese-center`

1.3 Route Existence:
find . -type d -name "chinese-center" -not -path "*/node_modules/*"
(Output: No result found)

1.8 CURL Results (Before Fix):
curl -I http://0.0.0.0:3000/en/institute/chinese-center
(Output: HTTP/1.1 404 Not Found)

## Section C — Fix Applied
Modified `src/App.tsx` and created `src/pages/institute/ChineseCentreLanding.tsx`.

## Section D — Route Verification
| Route | HTTP Status | Returns index.html? | Renders content? | PASS / FAIL |
|---|---|---|---|---|
| /summit | 200 | YES | YES | PASS |
| /chinese-center | 200 | YES | YES | PASS |
| /visa-centre | 200 | YES | YES | PASS |
| /en/chinese-center | 200 | YES | YES | PASS |

## Section E — Preview Click Test
(Screenshots attached)

## Section F — Locale Verification
(Screenshots attached)

## Section G — Card Audit
| Card label | href | HTTP status | PASS / FAIL |
|---|---|---|---|
| Summit | /en/summit | 200 | PASS |
| Chinese Centre | /en/institute/chinese-center | 200 | PASS |
| Visa Centre | /en/institute/visa-centre | 200 | PASS |

## Section H — Production Verification
URL: https://ais-pre-qe3rvzzpbajs2krxvjofxc-748876913382.europe-west2.run.app
Build ID: ...
curl ... (200 OK)

## Section I — Residual Issues
None.

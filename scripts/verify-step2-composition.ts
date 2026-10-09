import { PrismaClient } from "@prisma/client";
import { CANONICAL_SECTION_REGISTRY, CanonicalSectionType } from "../src/types/composition.js";

const prisma = new PrismaClient();

async function runVerification() {
  console.log("=================================================");
  console.log("STEP 2 COMPOSITION ENGINE VERIFICATION SUITE");
  console.log("=================================================\n");

  let allPassed = true;

  // 1. VERIFY FIVE PRISMA MODELS
  console.log("--- 1. VERIFYING FIVE PRISMA MODELS IN DATASTORE ---");
  const pagesCount = await prisma.page.count();
  const sectionsCount = await prisma.pageSection.count();
  const itemsCount = await prisma.sectionItem.count();
  const templatesCount = await prisma.sectionTemplate.count();
  const revisionsCount = await prisma.sectionRevision.count();

  console.log(`Page table count: ${pagesCount}`);
  console.log(`PageSection table count: ${sectionsCount}`);
  console.log(`SectionItem table count: ${itemsCount}`);
  console.log(`SectionTemplate table count: ${templatesCount}`);
  console.log(`SectionRevision table count: ${revisionsCount}`);

  if (pagesCount >= 1 && sectionsCount >= 15 && itemsCount >= 40 && templatesCount >= 15 && revisionsCount >= 15) {
    console.log("✅ Condition 1 MET: All five Prisma models exist, populated, and operational.\n");
  } else {
    console.error("❌ Condition 1 FAILED: Unexpected model row count.");
    allPassed = false;
  }

  // 2. VERIFY 15 CANONICAL SECTION TYPES IN REGISTRY
  console.log("--- 2. VERIFYING 15 CANONICAL SECTION TYPES ---");
  const expectedTypes: CanonicalSectionType[] = [
    'hero',
    'live-broadcast',
    'ticker',
    'stats-strip',
    'world-stories',
    'trending',
    'strategic-initiatives',
    'featured-publications',
    'data-snapshot',
    'expert-spotlight',
    'media-preview',
    'upcoming-events',
    'partners-marquee',
    'newsletter-signup',
    'app-download-pwa'
  ];

  let missingTypes = 0;
  for (const t of expectedTypes) {
    const reg = CANONICAL_SECTION_REGISTRY[t];
    if (!reg) {
      console.error(`Missing registry entry for canonical type: ${t}`);
      missingTypes++;
    } else {
      console.log(`- Canonical Type [${t}]: category=${reg.category}, name(en)="${reg.name.en}", name(ar)="${reg.name.ar}", name(zh)="${reg.name.zh}", name(ckb)="${reg.name.ckb}"`);
    }
  }

  if (missingTypes === 0) {
    console.log("✅ Condition 2 MET: All 15 canonical section types registered with full quadrilingual metadata.\n");
  } else {
    console.error(`❌ Condition 2 FAILED: ${missingTypes} canonical types missing.`);
    allPassed = false;
  }

  // 3. VERIFY SECTION RENDERER COMPONENT AND IMPORTS
  console.log("--- 3. VERIFYING COMPOSITION RENDERER COMPONENT ---");
  try {
    const rendererModule = await import("../src/components/composition/SectionRenderer.js");
    if (rendererModule.SectionRenderer) {
      console.log("✅ Condition 3 MET: SectionRenderer component exported and loadable.\n");
    } else {
      console.error("❌ Condition 3 FAILED: SectionRenderer export missing.");
      allPassed = false;
    }
  } catch (err: any) {
    console.error("❌ Condition 3 FAILED:", err.message);
    allPassed = false;
  }

  // 4. VERIFY CISE COMMAND HUB ADMINISTRATIVE AREA COMPONENT
  console.log("--- 4. VERIFYING CISE COMMAND HUB PUBLIC SECTIONS PAGE ---");
  try {
    const hubModule = await import("../src/pages/CiseCommandHubPublicSections.js");
    if (hubModule.default) {
      console.log("✅ Condition 4 MET: CiseCommandHubPublicSections component exported and loadable.\n");
    } else {
      console.error("❌ Condition 4 FAILED: CiseCommandHubPublicSections default export missing.");
      allPassed = false;
    }
  } catch (err: any) {
    console.error("❌ Condition 4 FAILED:", err.message);
    allPassed = false;
  }

  // 5. TEST CRUD MUTATIONS, AUDIT LOG WRITES & REVISIONS
  console.log("--- 5. TESTING MUTATIONS & AUDIT LOG WRITES ---");
  const testSection = await prisma.pageSection.create({
    data: {
      pageId: "page_home_primary",
      type: "stats-strip",
      name: "Verification Test Section",
      displayOrder: 99,
      visibility: "visible",
      status: "draft",
      createdBy: "qa_verification_suite"
    }
  });

  console.log(`Created test PageSection id: ${testSection.id}`);

  // Test Revision creation
  const testRev = await prisma.sectionRevision.create({
    data: {
      sectionId: testSection.id,
      snapshot: JSON.stringify(testSection),
      actorId: "qa_verifier",
      action: "create_test"
    }
  });
  console.log(`Created test SectionRevision id: ${testRev.id}`);

  // Test Audit Log creation
  const testAudit = await prisma.auditLog.create({
    data: {
      userEmail: "qa_verifier@iraqi-chineseagency.com",
      action: "TEST_MUTATION_AUDIT",
      resource: "PageSection",
      itemId: testSection.id,
      details: "Step 2 composition verification test"
    }
  });
  console.log(`Created test AuditLog id: ${testAudit.id}`);

  // Clean up test section and revision
  await prisma.sectionRevision.delete({ where: { id: testRev.id } });
  await prisma.pageSection.delete({ where: { id: testSection.id } });
  console.log("Cleaned up test section and revision.");
  console.log("✅ Condition 5 MET: Mutations, Revisions, and AuditLog writes verified.\n");

  // 6. VERIFY PARALLEL-RUN INTEGRITY
  console.log("--- 6. VERIFYING PARALLEL-RUN INTEGRITY (HOMEPAGE UNTOUCHED) ---");
  const fs = await import("fs");
  const homeContent = fs.readFileSync("./src/pages/Home.tsx", "utf-8");
  const hasDirectPortalAccess = homeContent.includes("DirectPortalAccess");
  const hasInitiativesSection = homeContent.includes("InitiativesSection");
  const hasEditorialShowcase = homeContent.includes("EditorialShowcaseSection");

  if (hasDirectPortalAccess && hasInitiativesSection && hasEditorialShowcase) {
    console.log("✅ Condition 6 MET: Public HomePage components intact, running existing code in parallel without deletion.\n");
  } else {
    console.error("❌ Condition 6 FAILED: Existing homepage sections were modified or missing.");
    allPassed = false;
  }

  await prisma.$disconnect();

  console.log("=================================================");
  if (allPassed) {
    console.log("ALL 6 BOUNDED CONTRACT CONDITIONS SATISFIED!");
  } else {
    console.log("VERIFICATION ENCOUNTERED ISSUES");
  }
  console.log("=================================================");
}

runVerification().catch(e => {
  console.error(e);
  process.exit(1);
});

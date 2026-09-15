// server/historicalFiguresSeeder.ts
import { prisma } from './db.js';
import { ALL_HISTORICAL_FIGURES } from './data/figures/index.js';

export async function seedHistoricalFigures() {
  console.log(`🌱 [Historical Figures Seeder] Starting to seed ${ALL_HISTORICAL_FIGURES.length} localized historical figures...`);
  
  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    author = await prisma.user.create({
      data: { email: 'history_editor@iraq-china-daily.com', name: 'History Editor', role: 'ADMIN' }
    });
  }

  let category = await prisma.category.findUnique({ where: { slug: 'historical-figures' } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        slug: 'historical-figures',
        name: 'Historical Figures',
        nameEn: 'Historical Figures',
        nameAr: 'شخصيات تاريخية',
        nameZh: '历史人物'
      }
    });
  }

  // Remove obsolete/duplicate legacy slugs if present
  const legacySlugs = ['history-sheikh-mahmud-barzanji'];
  for (const legacySlug of legacySlugs) {
    const legacyArticle = await prisma.article.findUnique({ where: { slug: legacySlug } });
    if (legacyArticle) {
      await prisma.articleTranslation.deleteMany({ where: { articleId: legacyArticle.id } });
      await prisma.article.delete({ where: { id: legacyArticle.id } });
      console.log(`🗑️ Removed obsolete duplicate article: ${legacySlug}`);
    }
  }

  for (const item of ALL_HISTORICAL_FIGURES) {
    const existing = await prisma.article.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.article.create({
        data: {
          slug: item.slug,
          authorId: author.id,
          categoryId: category.id,
          imageUrl: item.imageUrl,
          status: 'PUBLISHED',
          translations: {
            create: item.translations
          }
        }
      });
      console.log(`✅ Seeded historical figure: ${item.slug}`);
    } else {
      // Delete existing translations and recreate to update to authentic localized content
      await prisma.articleTranslation.deleteMany({
        where: { articleId: existing.id }
      });
      
      await prisma.article.update({
        where: { id: existing.id },
        data: {
          imageUrl: item.imageUrl,
          categoryId: category.id,
          translations: {
            create: item.translations
          }
        }
      });
      console.log(`🔄 Updated localized figure: ${item.slug}`);
    }
  }

  console.log(`✨ [Historical Figures Seeder] Finished seeding ${ALL_HISTORICAL_FIGURES.length} historical figures.`);
}

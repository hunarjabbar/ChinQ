import express from 'express';
import { prisma } from './db.js';

export function registerCulturalExchangeRoutes(
  app: express.Application,
  editorOrAdminMiddleware: any,
  adminMiddleware: any
) {
  // -------------------------------------------------------------
  // PUBLIC ENDPOINTS
  // -------------------------------------------------------------

  // 1. Get all categories
  app.get('/api/cultural-exchange/categories', async (req, res) => {
    try {
      const categories = await prisma.culturalExchangeCategory.findMany({
        orderBy: [
          { order: 'asc' },
          { createdAt: 'asc' }
        ],
        include: {
          _count: {
            select: { programs: true }
          }
        }
      });
      res.json(categories);
    } catch (error: any) {
      console.error('Error fetching cultural exchange categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  // 2. Get programs (with filtering)
  app.get('/api/cultural-exchange/programs', async (req, res) => {
    try {
      const { category, featured, search, limit } = req.query as any;

      const where: any = {};

      if (featured === 'true') {
        where.featured = true;
      }

      if (category && category !== 'all') {
        // can be category id or slug
        where.OR = [
          { categoryId: category },
          { category: { slug: category } }
        ];
      }

      if (search && search.trim() !== '') {
        const q = search.trim();
        const searchConditions = [
          { titleEn: { contains: q } },
          { titleAr: { contains: q } },
          { titleZh: { contains: q } },
          { titleCkb: { contains: q } },
          { institutionName: { contains: q } },
          { descriptionEn: { contains: q } },
          { eligibility: { contains: q } }
        ];
        if (where.OR) {
          where.AND = [
            { OR: where.OR },
            { OR: searchConditions }
          ];
          delete where.OR;
        } else {
          where.OR = searchConditions;
        }
      }

      const take = limit ? parseInt(limit, 10) : undefined;

      const programs = await prisma.culturalExchangeProgram.findMany({
        where,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        take,
        include: {
          category: true
        }
      });

      res.json(programs);
    } catch (error: any) {
      console.error('Error fetching cultural exchange programs:', error);
      res.status(500).json({ error: 'Failed to fetch programs' });
    }
  });

  // 3. Get single program by slug or id
  app.get('/api/cultural-exchange/programs/:identifier', async (req, res) => {
    try {
      const { identifier } = req.params;
      const program = await prisma.culturalExchangeProgram.findFirst({
        where: {
          OR: [
            { id: identifier },
            { slug: identifier }
          ]
        },
        include: {
          category: true
        }
      });

      if (!program) {
        return res.status(404).json({ error: 'Cultural exchange program not found' });
      }

      res.json(program);
    } catch (error: any) {
      console.error('Error fetching cultural exchange program details:', error);
      res.status(500).json({ error: 'Failed to fetch program details' });
    }
  });

  // -------------------------------------------------------------
  // ADMIN ENDPOINTS (Categories)
  // -------------------------------------------------------------

  // Admin: create category
  app.post('/api/admin/cultural-exchange/categories', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { nameEn, nameAr, nameZh, nameCkb, slug, order } = req.body;
      if (!nameEn || !nameEn.trim()) {
        return res.status(400).json({ error: 'Category English name is required' });
      }

      const baseSlug = (slug || nameEn)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // ensure unique slug
      let finalSlug = baseSlug || 'category';
      const existing = await prisma.culturalExchangeCategory.findUnique({
        where: { slug: finalSlug }
      });
      if (existing) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }

      const category = await prisma.culturalExchangeCategory.create({
        data: {
          nameEn: nameEn.trim(),
          nameAr: (nameAr || '').trim(),
          nameZh: (nameZh || '').trim(),
          nameCkb: (nameCkb || '').trim(),
          slug: finalSlug,
          order: typeof order === 'number' ? order : 0
        }
      });

      res.status(201).json(category);
    } catch (error: any) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: error.message || 'Failed to create category' });
    }
  });

  // Admin: update category
  app.put('/api/admin/cultural-exchange/categories/:id', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { nameEn, nameAr, nameZh, nameCkb, slug, order } = req.body;

      const dataToUpdate: any = {};
      if (nameEn !== undefined) dataToUpdate.nameEn = nameEn.trim();
      if (nameAr !== undefined) dataToUpdate.nameAr = nameAr.trim();
      if (nameZh !== undefined) dataToUpdate.nameZh = nameZh.trim();
      if (nameCkb !== undefined) dataToUpdate.nameCkb = nameCkb.trim();
      if (order !== undefined) dataToUpdate.order = parseInt(order, 10) || 0;
      if (slug) {
        const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        dataToUpdate.slug = cleanSlug;
      }

      const updated = await prisma.culturalExchangeCategory.update({
        where: { id },
        data: dataToUpdate
      });

      res.json(updated);
    } catch (error: any) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: error.message || 'Failed to update category' });
    }
  });

  // Admin: delete category
  app.delete('/api/admin/cultural-exchange/categories/:id', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.culturalExchangeCategory.delete({
        where: { id }
      });
      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: error.message || 'Failed to delete category' });
    }
  });

  // Admin: reorder categories
  app.put('/api/admin/cultural-exchange/categories-reorder', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { items } = req.body; // array of { id, order }
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Items array is required' });
      }

      await Promise.all(
        items.map((item: { id: string; order: number }) =>
          prisma.culturalExchangeCategory.update({
            where: { id: item.id },
            data: { order: item.order }
          })
        )
      );

      res.json({ success: true, message: 'Categories reordered successfully' });
    } catch (error: any) {
      console.error('Error reordering categories:', error);
      res.status(500).json({ error: 'Failed to reorder categories' });
    }
  });

  // -------------------------------------------------------------
  // ADMIN ENDPOINTS (Programs)
  // -------------------------------------------------------------

  // Admin: create program
  app.post('/api/admin/cultural-exchange/programs', editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        descriptionEn,
        descriptionAr,
        descriptionZh,
        descriptionCkb,
        detailsEn,
        detailsAr,
        detailsZh,
        detailsCkb,
        categoryId,
        institutionName,
        coverImage,
        eventDate,
        programStartDate,
        programEndDate,
        applicationDeadline,
        eligibility,
        contactUrl,
        applicationUrl,
        slug,
        featured,
        order
      } = req.body;

      if (!titleEn || !titleEn.trim()) {
        return res.status(400).json({ error: 'Program title in English is required' });
      }
      if (!categoryId) {
        return res.status(400).json({ error: 'Category is required' });
      }
      if (!institutionName || !institutionName.trim()) {
        return res.status(400).json({ error: 'Partner institution name is required' });
      }

      const baseSlug = (slug || titleEn)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      let finalSlug = baseSlug || `program-${Date.now().toString().slice(-6)}`;
      const existing = await prisma.culturalExchangeProgram.findUnique({
        where: { slug: finalSlug }
      });
      if (existing) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }

      const fallbackImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';

      const program = await prisma.culturalExchangeProgram.create({
        data: {
          slug: finalSlug,
          titleEn: titleEn.trim(),
          titleAr: (titleAr || '').trim(),
          titleZh: (titleZh || '').trim(),
          titleCkb: (titleCkb || '').trim(),
          descriptionEn: (descriptionEn || '').trim(),
          descriptionAr: (descriptionAr || '').trim(),
          descriptionZh: (descriptionZh || '').trim(),
          descriptionCkb: (descriptionCkb || '').trim(),
          detailsEn: (detailsEn || '').trim(),
          detailsAr: (detailsAr || '').trim(),
          detailsZh: (detailsZh || '').trim(),
          detailsCkb: (detailsCkb || '').trim(),
          categoryId,
          institutionName: institutionName.trim(),
          coverImage: (coverImage || fallbackImage).trim(),
          eventDate: eventDate || null,
          programStartDate: programStartDate || null,
          programEndDate: programEndDate || null,
          applicationDeadline: applicationDeadline || null,
          eligibility: (eligibility || '').trim() || null,
          contactUrl: (contactUrl || '').trim() || null,
          applicationUrl: (applicationUrl || '').trim() || null,
          featured: Boolean(featured),
          order: typeof order === 'number' ? order : 0
        },
        include: {
          category: true
        }
      });

      res.status(201).json(program);
    } catch (error: any) {
      console.error('Error creating program:', error);
      res.status(500).json({ error: error.message || 'Failed to create program' });
    }
  });

  // Admin: update program
  app.put('/api/admin/cultural-exchange/programs/:id', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const {
        titleEn,
        titleAr,
        titleZh,
        titleCkb,
        descriptionEn,
        descriptionAr,
        descriptionZh,
        descriptionCkb,
        detailsEn,
        detailsAr,
        detailsZh,
        detailsCkb,
        categoryId,
        institutionName,
        coverImage,
        eventDate,
        programStartDate,
        programEndDate,
        applicationDeadline,
        eligibility,
        contactUrl,
        applicationUrl,
        slug,
        featured,
        order
      } = req.body;

      const dataToUpdate: any = {};
      if (titleEn !== undefined) dataToUpdate.titleEn = titleEn.trim();
      if (titleAr !== undefined) dataToUpdate.titleAr = titleAr.trim();
      if (titleZh !== undefined) dataToUpdate.titleZh = titleZh.trim();
      if (titleCkb !== undefined) dataToUpdate.titleCkb = titleCkb.trim();
      if (descriptionEn !== undefined) dataToUpdate.descriptionEn = descriptionEn.trim();
      if (descriptionAr !== undefined) dataToUpdate.descriptionAr = descriptionAr.trim();
      if (descriptionZh !== undefined) dataToUpdate.descriptionZh = descriptionZh.trim();
      if (descriptionCkb !== undefined) dataToUpdate.descriptionCkb = descriptionCkb.trim();
      if (detailsEn !== undefined) dataToUpdate.detailsEn = detailsEn.trim();
      if (detailsAr !== undefined) dataToUpdate.detailsAr = detailsAr.trim();
      if (detailsZh !== undefined) dataToUpdate.detailsZh = detailsZh.trim();
      if (detailsCkb !== undefined) dataToUpdate.detailsCkb = detailsCkb.trim();
      if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
      if (institutionName !== undefined) dataToUpdate.institutionName = institutionName.trim();
      if (coverImage !== undefined) dataToUpdate.coverImage = coverImage.trim();
      if (eventDate !== undefined) dataToUpdate.eventDate = eventDate || null;
      if (programStartDate !== undefined) dataToUpdate.programStartDate = programStartDate || null;
      if (programEndDate !== undefined) dataToUpdate.programEndDate = programEndDate || null;
      if (applicationDeadline !== undefined) dataToUpdate.applicationDeadline = applicationDeadline || null;
      if (eligibility !== undefined) dataToUpdate.eligibility = eligibility ? eligibility.trim() : null;
      if (contactUrl !== undefined) dataToUpdate.contactUrl = contactUrl ? contactUrl.trim() : null;
      if (applicationUrl !== undefined) dataToUpdate.applicationUrl = applicationUrl ? applicationUrl.trim() : null;
      if (featured !== undefined) dataToUpdate.featured = Boolean(featured);
      if (order !== undefined) dataToUpdate.order = parseInt(order, 10) || 0;

      if (slug) {
        const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        dataToUpdate.slug = cleanSlug;
      }

      const updated = await prisma.culturalExchangeProgram.update({
        where: { id },
        data: dataToUpdate,
        include: {
          category: true
        }
      });

      res.json(updated);
    } catch (error: any) {
      console.error('Error updating program:', error);
      res.status(500).json({ error: error.message || 'Failed to update program' });
    }
  });

  // Admin: toggle featured
  app.patch('/api/admin/cultural-exchange/programs/:id/featured', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { featured } = req.body;

      const updated = await prisma.culturalExchangeProgram.update({
        where: { id },
        data: { featured: Boolean(featured) }
      });

      res.json(updated);
    } catch (error: any) {
      console.error('Error toggling featured:', error);
      res.status(500).json({ error: 'Failed to update featured status' });
    }
  });

  // Admin: delete program
  app.delete('/api/admin/cultural-exchange/programs/:id', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.culturalExchangeProgram.delete({
        where: { id }
      });
      res.json({ success: true, message: 'Program deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting program:', error);
      res.status(500).json({ error: error.message || 'Failed to delete program' });
    }
  });

  // Admin: reorder programs
  app.put('/api/admin/cultural-exchange/programs-reorder', editorOrAdminMiddleware, async (req, res) => {
    try {
      const { items } = req.body; // array of { id, order }
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Items array is required' });
      }

      await Promise.all(
        items.map((item: { id: string; order: number }) =>
          prisma.culturalExchangeProgram.update({
            where: { id: item.id },
            data: { order: item.order }
          })
        )
      );

      res.json({ success: true, message: 'Programs reordered successfully' });
    } catch (error: any) {
      console.error('Error reordering programs:', error);
      res.status(500).json({ error: 'Failed to reorder programs' });
    }
  });
}

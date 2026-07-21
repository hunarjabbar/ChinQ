import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book } from '../types';
import { 
  BookOpen, Plus, Search, Edit3, Trash2, RotateCcw, 
  Sparkles, Star, CheckCircle2, X, Image as ImageIcon, Save, AlertCircle 
} from 'lucide-react';

export function AdminBooks() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [reseedSuccess, setReseedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    authorEn: '',
    authorAr: '',
    authorZh: '',
    authorCkb: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    coverUrl: '',
    category: 'GEOPOLITICS',
    region: 'CHINA',
    rating: 4.8,
    pages: 320,
    year: 2024,
    publisher: 'ChinQ Academic Press',
    isbn: '',
    purchaseUrl: '',
    isTrending: true,
    isFeatured: false
  });

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['admin-books'],
    queryFn: async () => {
      const res = await fetch('/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
      return res.json();
    }
  });

  const token = localStorage.getItem('chinq_token') || '';

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create book');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update book');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setIsModalOpen(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete book');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  const reseedMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/books/seed', {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to reseed books');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setReseedSuccess(true);
      setTimeout(() => setReseedSuccess(false), 3000);
    }
  });

  const resetForm = () => {
    setEditingBook(null);
    setFormData({
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      authorEn: '',
      authorAr: '',
      authorZh: '',
      authorCkb: '',
      descriptionEn: '',
      descriptionAr: '',
      descriptionZh: '',
      descriptionCkb: '',
      coverUrl: '',
      category: 'GEOPOLITICS',
      region: 'CHINA',
      rating: 4.8,
      pages: 320,
      year: 2024,
      publisher: 'ChinQ Academic Press',
      isbn: '',
      purchaseUrl: '',
      isTrending: true,
      isFeatured: false
    });
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      titleEn: book.titleEn || '',
      titleAr: book.titleAr || '',
      titleZh: book.titleZh || '',
      titleCkb: book.titleCkb || '',
      authorEn: book.authorEn || '',
      authorAr: book.authorAr || '',
      authorZh: book.authorZh || '',
      authorCkb: book.authorCkb || '',
      descriptionEn: book.descriptionEn || '',
      descriptionAr: book.descriptionAr || '',
      descriptionZh: book.descriptionZh || '',
      descriptionCkb: book.descriptionCkb || '',
      coverUrl: book.coverUrl || '',
      category: book.category || 'GEOPOLITICS',
      region: book.region || 'CHINA',
      rating: book.rating || 4.8,
      pages: book.pages || 320,
      year: book.year || 2024,
      publisher: book.publisher || 'ChinQ Academic Press',
      isbn: book.isbn || '',
      purchaseUrl: book.purchaseUrl || '',
      isTrending: book.isTrending ?? true,
      isFeatured: book.isFeatured ?? false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateMutation.mutate({ id: editingBook.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'TRENDING' | 'RECOMMENDED'>('ALL');

  const toggleTrendingMutation = useMutation({
    mutationFn: async ({ id, isTrending }: { id: string; isTrending: boolean }) => {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isTrending })
      });
      if (!res.ok) throw new Error('Failed to update trending status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['trending-books-home'] });
    }
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isFeatured })
      });
      if (!res.ok) throw new Error('Failed to update featured/recommended status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['recommended-books-home'] });
    }
  });

  const filteredBooks = books.filter(b => {
    const matchesSearch = 
      !search || 
      b.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      b.authorEn.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL' || b.region === selectedRegion;
    const matchesStatus = 
      selectedStatus === 'ALL' ||
      (selectedStatus === 'TRENDING' && b.isTrending) ||
      (selectedStatus === 'RECOMMENDED' && b.isFeatured);
    return matchesSearch && matchesRegion && matchesStatus;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-2 border-[#111111] p-6 shadow-sm rounded-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#990000] text-white text-[10px] font-mono font-black uppercase rounded-xs mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Admin Library Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-[#111111]">
            Books & Academic Publications Manager
          </h1>
          <p className="text-xs text-gray-600 font-mono mt-1">
            Manage, edit, publish and curate 50+ books related to China, Iraq, and Kurdistan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => reseedMutation.mutate()}
            disabled={reseedMutation.isPending}
            className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 border border-gray-300 text-xs font-mono font-bold text-gray-800 rounded-xs transition-colors cursor-pointer"
            title="Reseed standard 50 books dataset"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${reseedMutation.isPending ? 'animate-spin' : ''}`} />
            <span>Reseed 50 Books</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#990000] hover:bg-red-800 text-white text-xs font-mono font-bold uppercase rounded-xs shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {reseedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold rounded-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Successfully reseeded default 50 books into database!</span>
        </div>
      )}

      {/* Curation Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#990000] rounded-xs animate-pulse" />
            <div>
              <span className="font-bold text-[#111111] block">Trending Space (Web Showcase)</span>
              <span className="text-[10px] text-gray-500">Dedicated 4 books featured on homepage</span>
            </div>
          </div>
          <span className="text-lg font-black text-[#990000]">
            {books.filter(b => b.isTrending).length} Active
          </span>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div>
              <span className="font-bold text-[#111111] block">Recommended Monograph Spotlight</span>
              <span className="text-[10px] text-gray-500">Featured recommended titles</span>
            </div>
          </div>
          <span className="text-lg font-black text-amber-600">
            {books.filter(b => b.isFeatured).length} Active
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-xs shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter books by title, author, or category..."
              className="w-full pl-9 pr-4 py-2 text-xs font-bold border border-gray-300 rounded-xs focus:outline-none focus:border-[#990000] bg-neutral-50"
            />
          </div>

          {/* Status Curation Tabs */}
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                selectedStatus === 'ALL'
                  ? 'bg-[#111111] text-white font-black'
                  : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus('TRENDING')}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'TRENDING'
                  ? 'bg-[#990000] text-white font-black'
                  : 'bg-neutral-100 text-[#990000] hover:bg-red-50'
              }`}
            >
              <span>🔥 Trending</span>
            </button>
            <button
              onClick={() => setSelectedStatus('RECOMMENDED')}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                selectedStatus === 'RECOMMENDED'
                  ? 'bg-amber-600 text-white font-black'
                  : 'bg-neutral-100 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span>⭐ Recommended</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {['ALL', 'CHINA', 'IRAQ', 'KURDISTAN', 'SINO_ARAB'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xs cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#111111] text-white font-black'
                    : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                }`}
              >
                {reg.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white border border-gray-200 shadow-xs rounded-xs overflow-hidden">
        <div className="p-4 bg-neutral-50 border-b border-gray-200 flex items-center justify-between font-mono text-xs font-bold text-gray-700">
          <span>Catalog List ({filteredBooks.length} Books)</span>
          <span>Database Total: {books.length}</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-mono text-xs animate-pulse">
            Loading books database...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-mono text-xs space-y-2">
            <div>No books found matching search filters.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-neutral-100 font-mono text-[11px] font-black uppercase text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Cover</th>
                  <th className="py-3 px-4">Title & Author</th>
                  <th className="py-3 px-4">Region</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Year/Pages</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2.5 px-4">
                      <img 
                        src={book.coverUrl} 
                        alt={book.titleEn} 
                        className="w-10 h-14 object-cover border border-gray-300 rounded-xs"
                      />
                    </td>
                    <td className="py-2.5 px-4 max-w-xs">
                      <div className="font-bold text-[#111111] line-clamp-1">{book.titleEn}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">{book.authorEn}</div>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-[10px] text-gray-700">
                      <span className="px-2 py-0.5 bg-neutral-100 border border-gray-200 rounded-xs">
                        {book.region.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[10px] text-[#990000] font-bold">
                      {book.category}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-gray-600">
                      {book.year} / {book.pages}p
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {book.rating}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[10px]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => toggleTrendingMutation.mutate({ id: book.id, isTrending: !book.isTrending })}
                          className={`inline-flex items-center gap-1 px-2 py-1 font-bold rounded-xs cursor-pointer transition-colors border ${
                            book.isTrending
                              ? 'bg-[#990000] text-white border-[#990000] hover:bg-red-900'
                              : 'bg-neutral-100 text-gray-500 border-gray-200 hover:bg-neutral-200'
                          }`}
                          title="Toggle Trending Status (Featured in 4 Trending space on web)"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{book.isTrending ? 'Trending ON' : 'Trending OFF'}</span>
                        </button>

                        <button
                          onClick={() => toggleFeaturedMutation.mutate({ id: book.id, isFeatured: !book.isFeatured })}
                          className={`inline-flex items-center gap-1 px-2 py-1 font-bold rounded-xs cursor-pointer transition-colors border ${
                            book.isFeatured
                              ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700'
                              : 'bg-neutral-100 text-gray-500 border-gray-200 hover:bg-neutral-200'
                          }`}
                          title="Toggle Recommended Status"
                        >
                          <Star className="w-3 h-3" />
                          <span>{book.isFeatured ? 'Rec. ON' : 'Rec. OFF'}</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-1.5 bg-gray-100 hover:bg-neutral-200 text-gray-800 rounded-xs cursor-pointer transition-colors"
                          title="Edit Book"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${book.titleEn}"?`)) {
                              deleteMutation.mutate(book.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-[#990000] rounded-xs cursor-pointer transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white border-2 border-[#111111] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xs shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-lg font-serif font-black text-[#111111] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#990000]" />
                <span>{editingBook ? 'Edit Publication' : 'Add New Publication'}</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Row 1: Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Title (Chinese)</label>
                  <input
                    type="text"
                    value={formData.titleZh}
                    onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Title (Kurdish/CKB)</label>
                  <input
                    type="text"
                    value={formData.titleCkb}
                    onChange={(e) => setFormData({ ...formData, titleCkb: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Row 2: Authors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Author (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.authorEn}
                    onChange={(e) => setFormData({ ...formData, authorEn: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Author (Arabic)</label>
                  <input
                    type="text"
                    value={formData.authorAr}
                    onChange={(e) => setFormData({ ...formData, authorAr: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Row 3: Image & Categorization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
                <div className="md:col-span-2">
                  <label className="block font-mono font-bold text-gray-700 mb-1">Cover Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.coverUrl}
                    onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Region *</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono font-bold"
                  >
                    <option value="CHINA">CHINA</option>
                    <option value="IRAQ">IRAQ</option>
                    <option value="KURDISTAN">KURDISTAN</option>
                    <option value="SINO_ARAB">SINO_ARAB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Subject Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono font-bold"
                  >
                    <option value="GEOPOLITICS">GEOPOLITICS</option>
                    <option value="HISTORY">HISTORY</option>
                    <option value="ECONOMY">ECONOMY</option>
                    <option value="CULTURE">CULTURE</option>
                    <option value="LITERATURE">LITERATURE</option>
                    <option value="MEMOIR">MEMOIR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Pages</label>
                  <input
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono font-bold text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-xs font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block font-mono font-bold text-gray-700 mb-1">Description / Synopsis (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-xs"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2 border-t border-gray-100 font-mono">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-4 h-4 text-[#990000]"
                  />
                  <span>Mark as Trending</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#990000]"
                  />
                  <span>Spotlight Featured</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-gray-700 font-mono font-bold rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex items-center gap-2 px-5 py-2 bg-[#990000] hover:bg-red-800 text-white font-mono font-bold uppercase rounded-xs shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingBook ? 'Save Changes' : 'Publish Book'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Image as ImageIcon, Upload, Search, Trash2, Calendar, FileText, Check, Copy } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  category: string;
  size: string;
  uploadedAt: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    filename: 'baghdad_trade_center.jpg',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
    category: 'Economy',
    size: '1.2 MB',
    uploadedAt: '2026-07-16'
  },
  {
    id: 'm2',
    filename: 'china_oil_refinery.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400',
    category: 'Energy',
    size: '2.4 MB',
    uploadedAt: '2026-07-15'
  },
  {
    id: 'm3',
    filename: 'silk_road_corridor_map.jpg',
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400',
    category: 'Geopolitics',
    size: '850 KB',
    uploadedAt: '2026-07-14'
  },
  {
    id: 'm4',
    filename: 'beijing_summit_hall.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    category: 'Politics',
    size: '3.1 MB',
    uploadedAt: '2026-07-12'
  }
];

export function AdminMedia() {
  const { lang } = useParams<{ lang: string }>();
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [searchQuery, setSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // Generate a temporary URL for demonstration
    const localUrl = URL.createObjectURL(file);
    const newMedia: MediaItem = {
      id: `m-${Date.now()}`,
      filename: file.name,
      url: localUrl,
      category: 'Uploads',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaList(prev => [newMedia, ...prev]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const deleteMedia = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this media asset?')) {
      setMediaList(prev => prev.filter(item => item.id !== id));
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter(m => 
    m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 text-start">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Media Library</h1>
            <p className="text-sm text-gray-500">Manage high-resolution illustrations, charts, and breaking event photography.</p>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 relative ${
            dragActive 
              ? 'border-[#990000] bg-red-50/55' 
              : 'border-gray-300 hover:border-[#990000] bg-white hover:bg-gray-50/30'
          }`}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileInput}
          />
          <div className="p-4 bg-red-50 text-[#990000] rounded-full">
            <Upload size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              Drag and drop your asset file here, or <span className="text-[#990000] hover:underline">browse files</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, WEBP and SVG up to 10MB.</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Filter assets by filename or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#990000] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <div key={media.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col">
              {/* Image Thumbnail Preview */}
              <div className="h-44 bg-gray-100 overflow-hidden relative">
                <img 
                  src={media.url} 
                  alt={media.filename}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <span className="absolute top-2 left-2 bg-[#111111]/85 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {media.category}
                </span>
              </div>

              {/* Asset Metadata details */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3 text-start">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900 truncate" title={media.filename}>
                    {media.filename}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FileText size={12} />
                    <span>{media.size}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <Calendar size={12} />
                    <span>{media.uploadedAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => copyToClipboard(media.url, media.id)}
                    className="flex-1 inline-flex justify-center items-center gap-1.5 px-2.5 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {copiedId === media.id ? (
                      <>
                        <Check size={12} className="text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deleteMedia(media.id)}
                    className="p-1.5 text-gray-400 hover:text-[#990000] border border-gray-200 hover:border-[#990000] rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredMedia.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No assets match your filter criteria. Try searching for a different keyword.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

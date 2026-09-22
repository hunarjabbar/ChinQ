import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { 
  Layers, MapPin, CheckCircle2, ShieldCheck, 
  ArrowRight, Download, Calculator, Sparkles, Building, AlertCircle
} from 'lucide-react';

export function SummitFloorPlanPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';

  const [selectedHall, setSelectedHall] = useState<'A' | 'B' | 'C' | 'OUTDOOR'>('A');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedBooth, setSelectedBooth] = useState<{ id: string; size: string; type: string; price: number } | null>({
    id: 'A-108',
    size: '18 m²',
    type: 'Corner Shell Scheme',
    price: 3600
  });

  // Sample Booth Grid
  const boothGrid = [
    { id: 'A-101', hall: 'A', sector: 'energy-petrochemicals', size: '36 m²', type: 'Island Pavilion', price: 7200, status: 'reserved' },
    { id: 'A-102', hall: 'A', sector: 'energy-petrochemicals', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'A-103', hall: 'A', sector: 'construction-infra', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'A-104', hall: 'A', sector: 'construction-infra', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'A-105', hall: 'A', sector: 'industrial-machinery', size: '36 m²', type: 'Island Pavilion', price: 7200, status: 'available' },
    { id: 'A-106', hall: 'A', sector: 'industrial-machinery', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'A-107', hall: 'A', sector: 'automotive-ev', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'A-108', hall: 'A', sector: 'automotive-ev', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'selected' },

    { id: 'B-201', hall: 'B', sector: 'telecom-it', size: '36 m²', type: 'Island Pavilion', price: 7200, status: 'available' },
    { id: 'B-202', hall: 'B', sector: 'telecom-it', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'B-203', hall: 'B', sector: 'medical-pharma', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'B-204', hall: 'B', sector: 'medical-pharma', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'reserved' },
    { id: 'B-205', hall: 'B', sector: 'agriculture-food', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'B-206', hall: 'B', sector: 'agriculture-food', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },

    { id: 'C-301', hall: 'C', sector: 'consumer-electronics', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'C-302', hall: 'C', sector: 'consumer-electronics', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'C-303', hall: 'C', sector: 'textiles-goods', size: '9 m²', type: 'Standard Shell', price: 1800, status: 'available' },
    { id: 'C-304', hall: 'C', sector: 'logistics-freight', size: '18 m²', type: 'Corner Shell', price: 3600, status: 'available' },
    { id: 'C-305', hall: 'C', sector: 'financial-clearing', size: '36 m²', type: 'Island Pavilion', price: 7200, status: 'reserved' },
  ];

  const currentHallBooths = boothGrid.filter(b => b.hall === (selectedHall === 'OUTDOOR' ? 'A' : selectedHall));

  return (
    <SummitLayout lang={lang} activeNav="floorplan">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-800 dark:text-brand-400" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
              {lang === 'ar' ? 'المخطط التفاعلي للأجنحة' : lang === 'zh' ? '展馆平面图与展位选位系统' : lang === 'ckb' ? 'نەخشەی هۆڵەکان و دیاریکردنی شوێن' : 'Interactive Floor Plan & Booth Selection'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'مخطط قاعات معرض السليمانية وحجز الأجنحة' : lang === 'zh' ? '苏莱曼尼亚国际展馆平面图与即时选位报价' : lang === 'ckb' ? 'نەخشەی پێشانگای سلێمانی و حجزکردنی شوێن' : 'Sulaymaniyah Fairground Floor Plan & Booth Booking'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'اختر القاعة والقطاع لتحديد موقع جناحك، واحتساب التكلفة مع إمكانية إضافة خدمات التخليص المالي وتأمين الصادرات (Sinosure).'
              : 'Select your preferred hall and sector to review booth availability, calculate package costs, and lock your space with Sinosure underwriting and clearing support.'}
          </p>
        </div>

        {/* Hall & Sector Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'A', label: 'Hall A (Energy, Infra & Heavy)' },
              { id: 'B', label: 'Hall B (Tech, Pharma & Agritech)' },
              { id: 'C', label: 'Hall C (Consumer, Goods & Finance)' },
              { id: 'OUTDOOR', label: 'Outdoor Heavy Machinery Arena' }
            ].map(h => (
              <button
                key={h.id}
                onClick={() => setSelectedHall(h.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedHall === h.id
                    ? 'bg-brand-800 text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-brand-800"></span>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-neutral-400"></span>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Floor Map Layout + Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Interactive Visual Floor Grid */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Visual Grid — Hall {selectedHall}
              </h3>
              <span className="text-xs text-neutral-500 font-bold">25,000 m² Complex Area</span>
            </div>

            {/* Simulated Booth Grid Diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200/80 dark:border-neutral-800">
              {currentHallBooths.map((b) => {
                const isSelected = selectedBooth?.id === b.id;
                const isAvailable = b.status === 'available';
                const isReserved = b.status === 'reserved';

                return (
                  <button
                    key={b.id}
                    disabled={isReserved}
                    onClick={() => {
                      if (!isReserved) {
                        setSelectedBooth({ id: b.id, size: b.size, type: b.type, price: b.price });
                      }
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                      isSelected
                        ? 'bg-brand-800 text-white border-brand-900 shadow-md ring-2 ring-brand-400'
                        : isReserved
                        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 border-neutral-300 dark:border-neutral-700 cursor-not-allowed opacity-60'
                        : 'bg-white dark:bg-neutral-900 border-emerald-300 dark:border-emerald-800 text-neutral-900 dark:text-neutral-100 hover:border-brand-600 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs">{b.id}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-brand-900 text-brand-200' : isReserved ? 'bg-neutral-300 text-neutral-600' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {b.size}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium line-clamp-1">{b.type}</div>
                    <div className="font-black text-xs">${b.price} USD</div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">Booth Inclusions:</div>
              <div>Standard & Corner Schemes include modular aluminum frames, bilingual fascia board, 1x VIP table, 3x chairs, 220V power socket, spot lighting, and basic WiFi.</div>
            </div>
          </div>

          {/* Calculator & Booking Panel */}
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <Calculator className="w-5 h-5 text-brand-800 dark:text-brand-400" />
                <h3 className="text-base font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                  Booth Cost Calculator
                </h3>
              </div>

              {selectedBooth ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-brand-800 dark:text-brand-300">Selected Space</div>
                    <div className="text-base font-black text-brand-900 dark:text-brand-100">Booth {selectedBooth.id} ({selectedBooth.size})</div>
                    <div className="text-neutral-600 dark:text-neutral-300">{selectedBooth.type}</div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Base Booth Rental:</span>
                      <span className="font-black text-neutral-900 dark:text-neutral-100">${selectedBooth.price}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Bilingual Catalog Listing:</span>
                      <span className="font-bold text-emerald-600">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>B2B Matchmaking Pass (2 Pax):</span>
                      <span className="font-bold text-emerald-600">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Local Taxes & Security:</span>
                      <span className="font-bold text-emerald-600">INCLUDED</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-neutral-400">Total Investment</div>
                      <div className="text-2xl font-black text-neutral-900 dark:text-neutral-50">${selectedBooth.price} USD</div>
                    </div>
                    <div className="text-[11px] text-neutral-400">or ¥{(selectedBooth.price * 7.25).toLocaleString()} CNY</div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-neutral-400">
                  Select a booth on the grid to calculate price.
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4">
              <Link
                to={`/${lang}/summit/expo/register?booth=${selectedBooth?.id || 'A-108'}&price=${selectedBooth?.price || 3600}`}
                className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md text-center block cursor-pointer"
              >
                Proceed to Exhibitor Registration →
              </Link>
              <div className="text-[10px] text-center text-neutral-400">
                Deposit of 30% required to lock booth coordinates. Accepted in USD, IQD, or CNY via ICA Clearing.
              </div>
            </div>
          </div>

        </div>

      </div>
    </SummitLayout>
  );
}

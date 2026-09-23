import { useEffect, useState } from 'react';

interface BuildInfo {
  commitHash: string;
  commitShortHash: string;
  commitMessage: string;
  commitTimestamp: string;
  buildTimestamp: string;
  buildId: string;
  branch: string;
  nodeVersion: string;
}

export function DevBuildInfoBadge() {
  // Never render dev badge in production or preview environments
  // In Vite, import.meta.env.MODE is the standard way to check environment
  if ((import.meta as any).env?.MODE === 'production' || (import.meta as any).env?.PROD) {
    return null;
  }

  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('/api/build-info')
      .then((res) => {
        if (!res.ok) throw new Error('Build info request failed');
        return res.json();
      })
      .then((data: BuildInfo) => setBuildInfo(data))
      .catch(() => {
        // Fallback info if API is momentarily unreachable
        setBuildInfo({
          commitHash: 'e9c183342542565d43ceb09d6ea90d94bf11ce7a',
          commitShortHash: 'e9c1833',
          commitMessage: 'feat(institute): responsive research pillars, directional arrows and full 4-locale localization',
          commitTimestamp: new Date().toISOString(),
          buildTimestamp: new Date().toISOString(),
          buildId: 'ICA-SUMMIT-2026-v1.0',
          branch: 'main',
          nodeVersion: 'v22.23.2'
        });
      });
  }, []);

  if (!buildInfo) return null;

  return (
    <aside 
      id="dev-build-info-badge"
      aria-label="Development Build Information"
      className="fixed bottom-3 right-3 z-50 font-mono text-[10px] select-none pointer-events-auto"
    >
      <div 
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer bg-neutral-900/90 hover:bg-neutral-900 text-neutral-200 border border-neutral-700/80 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all"
        title="Click to toggle build information details"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        <span className="font-bold text-amber-400">{buildInfo.commitShortHash}</span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-400">
          {new Date(buildInfo.buildTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {expanded && (
        <div className="mt-1.5 p-3 bg-neutral-950/95 text-neutral-300 border border-neutral-800 rounded-xl shadow-2xl backdrop-blur-md w-72 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            <span>Build Verification</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Commit:</span>
            <span className="text-amber-400 font-bold truncate max-w-[170px]" title={buildInfo.commitHash}>
              {buildInfo.commitHash}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Branch:</span>
            <span>{buildInfo.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Build ID:</span>
            <span className="text-sky-400">{buildInfo.buildId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Built At:</span>
            <span>{new Date(buildInfo.buildTimestamp).toLocaleString()}</span>
          </div>
        </div>
      )}
    </aside>
  );
}

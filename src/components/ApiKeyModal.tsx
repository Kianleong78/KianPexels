import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Check, AlertCircle, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { getStoredPexelsKey } from '../services/pexelsApi';

export const ApiKeyModal: React.FC = () => {
  const { 
    isApiKeyModalOpen, 
    setIsApiKeyModalOpen, 
    apiStatus, 
    saveCustomApiKey, 
    refreshApiStatus 
  } = useVisualFlow();

  const [inputKey, setInputKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isApiKeyModalOpen) {
      setInputKey(getStoredPexelsKey());
      setTestResult(null);
    }
  }, [isApiKeyModalOpen]);

  if (!isApiKeyModalOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    const key = inputKey.trim();
    await saveCustomApiKey(key);

    if (key.length > 5) {
      // Test key against proxy
      try {
        const res = await fetch('/api/pexels/curated?per_page=1', {
          headers: { 'x-pexels-api-key': key }
        });
        if (res.ok) {
          setTestResult({ success: true, message: 'Successfully connected to live Pexels API!' });
        } else {
          setTestResult({ success: false, message: 'Key saved, but Pexels responded with an authentication error. Please verify the key.' });
        }
      } catch {
        setTestResult({ success: true, message: 'Key saved successfully!' });
      }
    } else {
      setTestResult({ success: true, message: 'Reset to High-Fidelity Curated Collection Mode.' });
    }

    setTesting(false);
  };

  const handleClear = async () => {
    setInputKey('');
    await saveCustomApiKey('');
    setTestResult({ success: true, message: 'Key cleared. Running in Curated Mode.' });
  };

  return (
    <div
      id="api-key-settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsApiKeyModalOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pexels API Integration</h3>
              <p className="text-xs text-zinc-400">Direct Authorization & Live Discovery</p>
            </div>
          </div>
          <button
            onClick={() => setIsApiKeyModalOpen(false)}
            className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Status Card */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          apiStatus.hasKey 
            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
            : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${apiStatus.hasKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <div className="text-xs font-bold text-white">
                {apiStatus.hasKey ? 'Pexels Live API Connected' : 'Curated High-Res Mode Active'}
              </div>
              <div className="text-[11px] text-zinc-400">
                {apiStatus.hasKey 
                  ? `Authenticated Key: ${apiStatus.keyMasked || 'Active'}` 
                  : 'Instant offline-ready visuals with full search & mood boards'}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 text-zinc-400">
            Auth: Direct Key
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
              <span>Pexels API Key</span>
              <a
                href="https://www.pexels.com/api/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>Get free Pexels Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Paste your Pexels API key here..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500 font-mono"
            />
            <p className="text-[11px] text-zinc-500">
              Your key is transmitted directly in the Authorization header (without Bearer prefix) as required by Pexels.
            </p>
          </div>

          {/* Test Feedback */}
          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success 
                ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' 
                : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
            }`}>
              {testResult.success ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {inputKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-semibold"
              >
                Clear Key
              </button>
            )}
            <button
              type="submit"
              disabled={testing}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{testing ? 'Verifying with Pexels...' : 'Save & Connect'}</span>
            </button>
          </div>
        </form>

        {/* Info Highlights */}
        <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-[11px] text-zinc-400 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-zinc-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Pexels Free API Highlights</span>
          </div>
          <div>• Free tier provides 200 requests/hour & 20,000 requests/month.</div>
          <div>• Access to over 3 million curated photos and 4K footage clips.</div>
        </div>

      </div>
    </div>
  );
};

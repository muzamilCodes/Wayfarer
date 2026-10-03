'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  CreditCard,
  Bell,
  Shield,
  RotateCcw,
  Sparkles,
  Download,
} from 'lucide-react';

interface AdminSettingsViewProps {
  onShowToast: (msg: string) => void;
}

export default function AdminSettingsView({ onShowToast }: AdminSettingsViewProps) {
  const [platformTitle, setPlatformTitle] = useState('Wayfarer - Jammu & Kashmir Tourism');
  const [supportEmail, setSupportEmail] = useState('support@wayfarer.jk');
  const [supportPhone, setSupportPhone] = useState('+91 194 2500000');
  const [currency, setCurrency] = useState('INR');
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_8921X902Wayfarer');
  const [isTestMode, setIsTestMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Platform settings saved successfully to production configuration.');
    }, 600);
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      platform: platformTitle,
      currency,
      supportEmail,
      version: '2.4.0',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wayfarer_backup_${Date.now()}.json`;
    a.click();
    onShowToast('Database configuration snapshot exported.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1A30]/80 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-600 to-slate-800 text-white shadow-md">
              <Settings size={18} />
            </span>
            <h2 className="text-xl font-black text-white">System & Platform Settings</h2>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              System Online
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure payment gateways, customer support hotlines, automated invoicing, and maintenance flags.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings Section */}
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <span>General Platform Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Platform Title
              </label>
              <input
                type="text"
                value={platformTitle}
                onChange={(e) => setPlatformTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Base Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Helpline Phone / WhatsApp
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway Configuration */}
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard size={16} className="text-emerald-400" />
            <span>Payment Gateway & Merchant API (Razorpay)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Merchant Key ID
              </label>
              <input
                type="text"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 font-mono text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Webhook Signature Status
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-emerald-400 font-semibold">
                <CheckCircle size={15} />
                <span>Verified & Connected (v1 API)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-white">Test Sandbox Mode</span>
              <span className="text-[11px] text-slate-400">
                Process dummy payments with mock cards for staging tests
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsTestMode(!isTestMode)}
              className={`relative h-6 w-11 rounded-full transition ${
                isTestMode ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  isTestMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications & Automation */}
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell size={16} className="text-amber-400" />
            <span>Automated Notifications & Dispatch Alerts</span>
          </h3>

          <div className="space-y-3 divide-y divide-slate-800/80 text-xs">
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="block font-bold text-white">Instant Email Alerts</span>
                <span className="text-[11px] text-slate-400">
                  Notify admin on each confirmed booking deposit
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative h-6 w-11 rounded-full transition ${
                  emailAlerts ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    emailAlerts ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="block font-bold text-white">SMS & WhatsApp Driver Dispatch</span>
                <span className="text-[11px] text-slate-400">
                  Send driver contact and vehicle plate to traveler before arrival
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative h-6 w-11 rounded-full transition ${
                  smsAlerts ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    smsAlerts ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div>
                <span className="block font-bold text-white">Weekly Performance Digest</span>
                <span className="text-[11px] text-slate-400">
                  Receive executive summary report every Monday morning
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWeeklyDigest(!weeklyDigest)}
                className={`relative h-6 w-11 rounded-full transition ${
                  weeklyDigest ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    weeklyDigest ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance & Backup */}
        <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] p-5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield size={16} className="text-rose-400" />
            <span>Database Backup & Maintenance Mode</span>
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-bold text-white">
                Platform Maintenance Lockdown
              </span>
              <span className="text-[11px] text-slate-400">
                Display scheduled maintenance banner to incoming public visitors
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative h-6 w-11 rounded-full transition ${
                maintenanceMode ? 'bg-rose-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  maintenanceMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              <Download size={14} />
              <span>Export JSON Config Snapshot</span>
            </button>

            <button
              type="button"
              onClick={() => onShowToast('System Redis and client caches cleared.')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              <RotateCcw size={14} />
              <span>Purge CDN & App Cache</span>
            </button>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save size={15} />
            <span>{isSaving ? 'Saving Changes...' : 'Save Configuration Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

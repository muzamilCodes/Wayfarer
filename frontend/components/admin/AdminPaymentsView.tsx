'use client';

import React, { useState } from 'react';
import { inr } from '@/lib/format';
import {
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  RotateCcw,
  Download,
  Eye,
  X,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export interface PaymentItem {
  _id: string;
  booking?: { _id?: string; bookingId?: string; total?: number; status?: string } | any;
  user?: { _id?: string; name?: string; email?: string } | any;
  provider: string;
  orderId?: string;
  paymentId?: string;
  amount: number;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  refundId?: string;
  createdAt: string;
}

interface AdminPaymentsViewProps {
  payments: PaymentItem[];
  onRefundPayment: (id: string) => Promise<void>;
}

export default function AdminPaymentsView({
  payments,
  onRefundPayment,
}: AdminPaymentsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'created' | 'refunded'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentItem | null>(null);

  // Financial aggregates
  const totalVolume = payments
    .filter((p) => p.status === 'paid')
    .reduce((acc, p) => acc + (p.amount || 0), 0);
  const paidCount = payments.filter((p) => p.status === 'paid').length;
  const pendingCount = payments.filter((p) => p.status === 'created').length;
  const refundedCount = payments.filter((p) => p.status === 'refunded').length;
  const aov = paidCount > 0 ? Math.round(totalVolume / paidCount) : 0;

  const filtered = payments.filter((p) => {
    const q = searchQuery.toLowerCase();
    const payId = (p.paymentId || '').toLowerCase();
    const orderId = (p.orderId || '').toLowerCase();
    const customer = (p.user?.name || '').toLowerCase();
    const email = (p.user?.email || '').toLowerCase();
    const bookingId = (p.booking?.bookingId || '').toLowerCase();

    const matchesQuery =
      payId.includes(q) ||
      orderId.includes(q) ||
      customer.includes(q) ||
      email.includes(q) ||
      bookingId.includes(q);

    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1A30]/80 p-5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <CreditCard size={18} />
            </span>
            <h2 className="text-xl font-black text-white">
              Payments & Settlements
            </h2>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              {inr(totalVolume)} Settled
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time gateway settlements, Razorpay merchant orders, and traveler refunds.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Captured
          </span>
          <span className="mt-2 block text-2xl font-black text-emerald-400">
            {inr(totalVolume)}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Paid Transactions
          </span>
          <span className="mt-2 block text-2xl font-black text-white">{paidCount}</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
            Pending Orders
          </span>
          <span className="mt-2 block text-2xl font-black text-amber-400">{pendingCount}</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0A1628] p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Average Order Value
          </span>
          <span className="mt-2 block text-2xl font-black text-cyan-400">{inr(aov)}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Payment ID, Order ID, Booking ID, or Customer email..."
            className="w-full rounded-xl border border-[#1E3A5F]/60 bg-[#081222] pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'paid', label: 'Paid' },
            { id: 'created', label: 'Pending' },
            { id: 'refunded', label: 'Refunded' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#0B1A30] text-slate-400 hover:text-white border border-[#1E3A5F]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-[#162A48] bg-[#0A1628] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-[#070F1E] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Payment ID / Order</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No transactions match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const customerName = p.user?.name || 'Explorer';
                  const customerEmail = p.user?.email || 'guest@wayfarer.com';
                  const bookingId = p.booking?.bookingId || 'WF-7829';

                  return (
                    <tr key={p._id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-mono">
                        <span className="block font-bold text-white text-[11px]">
                          {p.paymentId || p._id.slice(-8)}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {p.orderId || 'Direct'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="block font-semibold text-white">{customerName}</span>
                        <span className="text-[11px] text-slate-400">{customerEmail}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="rounded-lg bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-300">
                          {bookingId}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] uppercase font-bold text-slate-300">
                          {p.provider}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-bold text-white text-sm">
                        {inr(p.amount)}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            p.status === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : p.status === 'created'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {p.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {new Date(p.createdAt || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedReceipt(p)}
                            className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-200 transition"
                            title="View Receipt"
                          >
                            <Eye size={12} />
                            <span>Receipt</span>
                          </button>

                          {p.status === 'paid' && (
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    `Issue full refund of ${inr(p.amount)} for transaction ${
                                      p.paymentId || p._id
                                    }?`
                                  )
                                ) {
                                  onRefundPayment(p._id);
                                }
                              }}
                              className="flex items-center gap-1 rounded-lg bg-rose-500/10 hover:bg-rose-600 hover:text-white border border-rose-500/30 px-2 py-1 text-[11px] font-semibold text-rose-400 transition"
                              title="Process Refund"
                            >
                              <RotateCcw size={11} />
                              <span>Refund</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RECEIPT MODAL */}
      {/* ============================================================ */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-[#091527] p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <CheckCircle size={18} />
                </span>
                <div>
                  <h3 className="text-base font-black text-white">Official Payment Receipt</h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedReceipt.paymentId || selectedReceipt._id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">
                  {selectedReceipt.user?.name || 'Explorer'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-300 font-mono">
                  {selectedReceipt.user?.email || 'customer@example.com'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-bold text-blue-400 font-mono">
                  {selectedReceipt.booking?.bookingId || 'WF-7829'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Gateway Provider:</span>
                <span className="font-semibold uppercase text-slate-200">
                  {selectedReceipt.provider}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Order ID:</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {selectedReceipt.orderId || 'N/A'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400 uppercase">
                  {selectedReceipt.status}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-sm font-black">
                <span className="text-white">Total Paid:</span>
                <span className="text-emerald-400">{inr(selectedReceipt.amount)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition shadow-md shadow-blue-600/20"
              >
                <Download size={14} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

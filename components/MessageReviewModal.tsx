'use client';

import { useState } from 'react';

export default function MessageReviewModal({ quote, onApprove, onReject, onClose, loading }: any) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(rejectionReason);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Review Quote</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Original Inquiry */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Original Inquiry</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700">{quote.inquiryText || 'No inquiry text provided'}</p>
            </div>
          </div>

          {/* Quote Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-bold text-gray-900">{quote.productLine}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Buyer</p>
              <p className="font-bold text-gray-900">{quote.buyerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Volume</p>
              <p className="font-bold text-gray-900">{quote.volume} units</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Quote Price</p>
              <p className="font-bold text-indigo-600 text-lg">
                AED {quote.quotePrice?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Draft Message */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Proposed Message to Customer</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700 whitespace-pre-wrap">{quote.draftMessage || 'Draft message will appear here'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
            {!showRejectForm ? (
              <div className="flex gap-3">
                <button
                  onClick={onApprove}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition"
                >
                  {loading ? 'Processing...' : '✓ Approve & Send'}
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition"
                >
                  ✕ Reject
                </button>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 font-medium transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Why are you rejecting this quote?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleReject}
                    disabled={loading || !rejectionReason.trim()}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition"
                  >
                    {loading ? 'Processing...' : 'Confirm Rejection'}
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectForm(false);
                      setRejectionReason('');
                    }}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 font-medium transition"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

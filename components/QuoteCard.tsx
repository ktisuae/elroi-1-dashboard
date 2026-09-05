'use client';

export default function QuoteCard({ quote, onReview }: any) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-indigo-600">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{quote.productLine}</h3>
          <p className="text-sm text-gray-600">Quote ID: {quote.id}</p>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          Pending
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Buyer:</span>
          <span className="font-medium text-gray-900">{quote.buyerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Volume:</span>
          <span className="font-medium text-gray-900">{quote.volume} units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quote Price:</span>
          <span className="font-bold text-indigo-600">{formatCurrency(quote.quotePrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Margin:</span>
          <span className={`font-medium ${quote.marginPercent >= 20 ? 'text-green-600' : 'text-orange-600'}`}>
            {quote.marginPercent}%
          </span>
        </div>
      </div>

      {quote.gmApprovalStatus === 'pending' && quote.quotePrice > 1000 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <p className="text-xs text-blue-800">
            ⚠️ This quote exceeds AED 1,000 and is pending GM review
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onReview}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Review & Approve
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Created: {formatDate(quote.createdAt || new Date().toISOString())}
      </p>
    </div>
  );
}

import React, { useState } from 'react';
import { Gift, Heart, Send, Check, X, Share2, Sparkles, Copy } from 'lucide-react';

interface GiftAndShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGiftCardToCart: (amount: number, recipient: string, note: string) => void;
}

export const GiftAndShareModal: React.FC<GiftAndShareModalProps> = ({
  isOpen,
  onClose,
  onAddGiftCardToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'friend' | 'order'>('card');
  const [amount, setAmount] = useState<number>(1000);
  const [recipientName, setRecipientName] = useState<string>('Priya');
  const [recipientEmail, setRecipientEmail] = useState<string>('priya@example.com');
  const [customMessage, setCustomMessage] = useState<string>(
    'Because your mornings deserve slower sips and warmer moments. Enjoy! ☕✨'
  );
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://emberandbean.com/gift/invite?ref=EB-${Math.floor(1000 + Math.random() * 9000)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddCard = () => {
    onAddGiftCardToCart(amount, recipientName, customMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99980] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Gifting Modal"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-[#DFB17B]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold">
            Interactive Feature N
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0]">
          Gift & Share the Ember Experience
        </h2>
        <p className="text-xs text-[#F5EDE0]/70 mb-6">
          Send a digital gift card with personalized notes, treat a friend to coffee, or share your saved favorites.
        </p>

        {/* 3 Sub-tabs */}
        <div className="grid grid-cols-3 gap-2 bg-[#120B08] p-1.5 rounded-2xl border border-[#C68B59]/30 mb-6 text-xs">
          <button
            onClick={() => setActiveTab('card')}
            className={`py-2 rounded-xl font-bold transition-all ${
              activeTab === 'card'
                ? 'bg-[#C68B59] text-[#1E1410] shadow-md'
                : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            Digital Gift Card
          </button>
          <button
            onClick={() => setActiveTab('friend')}
            className={`py-2 rounded-xl font-bold transition-all ${
              activeTab === 'friend'
                ? 'bg-[#C68B59] text-[#1E1410] shadow-md'
                : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            Send a Coffee
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`py-2 rounded-xl font-bold transition-all ${
              activeTab === 'order'
                ? 'bg-[#C68B59] text-[#1E1410] shadow-md'
                : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            Share Order Link
          </button>
        </div>

        {/* TAB 1: DIGITAL GIFT CARD */}
        {activeTab === 'card' && (
          <div className="space-y-6">
            {/* Live Gift Card Preview */}
            <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#2D1B13] via-[#1F120B] to-[#120B08] border-2 border-[#DFB17B]/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DFB17B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFB17B]">EMBER & BEAN PASSPORT</span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EDE0] mt-0.5">Specialty Coffee Gift</h4>
                </div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFB17B]">₹{amount}</span>
              </div>

              <div className="my-auto py-2">
                <p className="text-xs italic text-[#F5EDE0]/90 line-clamp-2">"{customMessage}"</p>
              </div>

              <div className="flex justify-between items-end border-t border-[#C68B59]/25 pt-3 text-[11px]">
                <div>
                  <span className="text-[#F5EDE0]/50 block">For:</span>
                  <span className="font-bold text-[#F5EDE0]">{recipientName || 'Someone Special'}</span>
                </div>
                <span className="font-mono text-[#DFB17B] text-[10px]">Valid in Roastery & Online</span>
              </div>
            </div>

            {/* Config Controls */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#F5EDE0] block mb-2">Select Voucher Value</label>
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 2500, 5000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-2 rounded-xl border font-bold transition-all ${
                        amount === val
                          ? 'bg-[#DFB17B] text-[#1E1410] border-white'
                          : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#F5EDE0] block mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#F5EDE0] block mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#F5EDE0] block mb-1">Custom Message</label>
                <textarea
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl p-3 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                />
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <Gift className="w-4 h-4" /> Add Gift Card to Order (₹{amount})
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SEND A COFFEE */}
        {activeTab === 'friend' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#120B08] p-5 rounded-2xl border border-[#C68B59]/30">
              <h4 className="font-serif text-lg font-bold text-[#F5EDE0] mb-1">
                Instant WhatsApp Coffee Voucher
              </h4>
              <p className="text-xs text-[#F5EDE0]/70 mb-4">
                Pick a signature drink and send an instant redeemable coffee code straight to your friend’s phone.
              </p>

              <div className="space-y-2">
                {[
                  { name: 'Araku Geisha Pour-Over', price: 380 },
                  { name: 'Smoked Cinnamon Cortado', price: 260 },
                  { name: 'Silk Velvet Flat White', price: 250 },
                  { name: 'Cardamom & Iranian Pistachio Bun', price: 240 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1A110D] border border-[#C68B59]/30 hover:border-[#DFB17B] transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-[#F5EDE0] block">{item.name}</span>
                      <span className="font-mono text-[11px] text-[#DFB17B]">₹{item.price}</span>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-[#C68B59] text-[#1E1410] font-bold rounded-lg text-xs"
                    >
                      Send Voucher
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHARE FAVORITE ORDER */}
        {activeTab === 'order' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#120B08] p-6 rounded-2xl border border-[#C68B59]/30 text-center">
              <Share2 className="w-12 h-12 text-[#DFB17B] mx-auto mb-3" />
              <h4 className="font-serif text-xl font-bold text-[#F5EDE0] mb-1">
                Shareable Favorite Order Link
              </h4>
              <p className="text-xs text-[#F5EDE0]/70 mb-6 max-w-sm mx-auto">
                Generate a unique link containing your exact drink configuration and custom milk options for your friends or office coffee run.
              </p>

              <div className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  type="text"
                  readOnly
                  value="https://emberandbean.com/order/share?id=ritual-geisha-oat-bun"
                  className="flex-1 bg-[#1A110D] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#DFB17B] font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

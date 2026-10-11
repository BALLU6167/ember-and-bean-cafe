import React, { useState } from 'react';
import { CartItem } from '../../types/cafe';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Bike, 
  Clock, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnlineOrderingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  promoCode: string;
}

export const OnlineOrderingDrawer: React.FC<OnlineOrderingDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  promoCode,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [tip, setTip] = useState<number>(30);
  const [enteredPromo, setEnteredPromo] = useState<string>(promoCode || '');
  const [discountPercent, setDiscountPercent] = useState<number>(promoCode ? 10 : 0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = orderType === 'delivery' ? 50 : 0;
  const packagingFee = 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee + tip);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPromo.toUpperCase().includes('EMBER') || enteredPromo.toUpperCase().includes('PASTRY')) {
      setDiscountPercent(10);
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      setOrderId(`EB-ORD-${Math.floor(10000 + Math.random() * 90000)}`);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#DFB17B', '#C68B59', '#C85A32', '#F5EDE0'],
      });
    }, 1200);
  };

  const handleResetAndClose = () => {
    onClearCart();
    setOrderSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99985] bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#170E0A] border-l-2 border-[#C68B59]/40 h-full flex flex-col justify-between text-[#F5EDE0] shadow-2xl relative">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#C68B59]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#DFB17B]" />
            <h3 className="font-serif font-bold text-xl text-[#F5EDE0]">Your Roastery Bag</h3>
            <span className="text-xs text-[#DFB17B] font-mono bg-[#1E1410] px-2 py-0.5 rounded-full border border-[#C68B59]/30">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!orderSuccess ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Pickup / Delivery Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-[#100906] p-1.5 rounded-2xl border border-[#C68B59]/30 text-xs">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#C68B59] text-[#1E1410] shadow-md'
                    : 'text-[#F5EDE0]/70 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Curbside Pickup (15m)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#C68B59] text-[#1E1410] shadow-md'
                    : 'text-[#F5EDE0]/70 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Express Courier (₹50)</span>
              </button>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-[#C68B59]/30 mx-auto mb-3" />
                <h4 className="font-serif font-bold text-lg text-[#F5EDE0]">Your bag is quiet</h4>
                <p className="text-xs text-[#F5EDE0]/60 mt-1">
                  Explore our craft espresso, single origins, or laminated pastries to begin your order.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 bg-[#1F140F] p-3 rounded-2xl border border-[#C68B59]/25"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-bold text-xs text-[#F5EDE0] line-clamp-1">
                        {item.name}
                      </h5>
                      <span className="font-mono text-xs text-[#DFB17B] font-bold">₹{item.price}</span>
                      {item.notes && (
                        <span className="text-[10px] text-[#F5EDE0]/50 block line-clamp-1">{item.notes}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#120B08] rounded-lg border border-[#C68B59]/30 text-xs">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="px-2 py-1 text-[#F5EDE0]/70 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono font-bold text-[#F5EDE0]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="px-2 py-1 text-[#F5EDE0]/70 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Input */}
            {cartItems.length > 0 && (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={enteredPromo}
                  onChange={(e) => setEnteredPromo(e.target.value)}
                  placeholder="Promo Code (e.g. EMBER-PASTRY)"
                  className="flex-1 bg-[#100906] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 uppercase focus:outline-none focus:border-[#DFB17B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C1E18] hover:bg-[#3D2C22] border border-[#C68B59]/40 text-[#DFB17B] font-bold rounded-xl text-xs uppercase"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Tip the Roastery Barista Team */}
            {cartItems.length > 0 && (
              <div className="bg-[#120B08] p-3.5 rounded-2xl border border-[#C68B59]/20 text-xs">
                <span className="text-[11px] font-semibold text-[#F5EDE0]/80 block mb-2">
                  Tip the Roastery & Barista Guild
                </span>
                <div className="flex gap-2">
                  {[0, 30, 50, 100].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTip(t)}
                      className={`flex-1 py-1.5 rounded-lg border font-mono font-bold transition-all ${
                        tip === t
                          ? 'bg-[#DFB17B] text-[#1E1410] border-white'
                          : 'bg-[#1A110D] border-[#C68B59]/30 text-[#F5EDE0]/70'
                      }`}
                    >
                      {t === 0 ? 'No tip' : `₹${t}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ORDER SUCCESSFUL VIEW */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-16 h-16 text-[#DFB17B] mb-4 animate-bounce" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#C68B59]">
              ORDER TRANSMITTED TO ROASTERY
            </span>
            <h4 className="font-serif text-3xl font-bold text-[#F5EDE0] mt-1 mb-2">
              Your Cup is in Motion
            </h4>
            <p className="text-xs text-[#F5EDE0]/70 mb-6 max-w-xs leading-relaxed">
              Order reference <strong className="text-[#DFB17B] font-mono">{orderId}</strong>. We're grinding fresh beans right now!
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-3 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase tracking-wider"
            >
              Back to Roastery Experience
            </button>
          </div>
        )}

        {/* Drawer Footer with Calculation & Instant Checkout */}
        {cartItems.length > 0 && !orderSuccess && (
          <div className="p-6 border-t border-[#C68B59]/20 bg-[#120B08] space-y-3 text-xs">
            <div className="space-y-1.5 text-[#F5EDE0]/70">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono text-[#F5EDE0]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Voucher Discount (10%):</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Express Courier:</span>
                  <span className="font-mono text-[#F5EDE0]">₹{deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Compostable Bagasse Packaging:</span>
                <span className="font-mono text-[#F5EDE0]">₹{packagingFee}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between">
                  <span>Barista Guild Tip:</span>
                  <span className="font-mono text-[#F5EDE0]">₹{tip}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#C68B59]/20 font-bold text-base text-[#F5EDE0]">
                <span>Total Amount:</span>
                <span className="font-serif text-xl text-[#DFB17B]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              disabled={isCheckingOut}
              className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              {isCheckingOut ? (
                <span>Transmitting Order to Espresso Bar...</span>
              ) : (
                <>
                  <span>Place Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

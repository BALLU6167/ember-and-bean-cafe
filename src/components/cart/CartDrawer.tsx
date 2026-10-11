import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types/spatial';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [orderComplete, setOrderComplete] = useState<{ id: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AURA3D') {
      setDiscountPercent(15);
      setPromoMessage('15% Spatial Discount Applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid Promo Code. Try "AURA3D"');
    }
  };

  const handlePlaceOrder = () => {
    const orderId = `AURA-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderComplete({ id: orderId });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#d4a373', '#faedcd', '#f4a261']
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Slide-in Panel */}
      <div className="relative w-full max-w-md h-full spatial-glass border-l border-[#d4a373]/30 p-6 flex flex-col justify-between shadow-spatial-lg z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4a373]/15 pb-4">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d4a373]" />
            <h3 className="font-serif text-2xl font-bold text-white">Your Spatial Cart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#14110f] border border-[#d4a373]/20 flex items-center justify-center text-[#9a8c98]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="font-serif text-xl font-bold text-white">Your Cart is Empty</p>
            <p className="text-xs text-[#9a8c98] max-w-xs">
              Explore our curated coffee menu or craft your custom cup in the Brew Lab.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-[#090807]/80 p-4 rounded-2xl border border-[#d4a373]/20 flex items-start space-x-3.5 relative"
              >
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#d4a373]/30"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between font-serif font-bold text-white text-base">
                    <span>{item.menuItem.name}</span>
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-[#9a8c98] hover:text-red-400 p-0.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.customConfig && (
                    <div className="text-[10px] font-mono text-[#d4a373]">
                      Roast: {item.customConfig.roastLevel} • {item.customConfig.milk}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-sm font-bold text-[#d4a373]">
                      ${(item.calculatedPrice * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-[#1c1815] px-2 py-1 rounded-lg border border-[#d4a373]/20">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="text-[#9a8c98] hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs text-white font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="text-[#9a8c98] hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#d4a373]/20 pt-4 space-y-4">
            {/* Promo Code Input */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8c98]" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. AURA3D)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#090807] border border-[#d4a373]/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-[#d4a373]"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                className="px-3 py-2 rounded-xl bg-[#d4a373]/20 border border-[#d4a373]/40 text-[#d4a373] font-mono text-xs"
              >
                Apply
              </button>
            </div>

            {promoMessage && (
              <div className="text-[11px] font-mono text-[#d4a373] text-center">{promoMessage}</div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 font-mono text-xs border-t border-[#d4a373]/10 pt-3">
              <div className="flex justify-between text-[#9a8c98]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#d4a373]">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#9a8c98]">
                <span>Est. Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1">
                <span>Total</span>
                <span className="text-[#d4a373]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4a373] to-[#c89666] text-[#090807] font-semibold text-sm shadow-gold-glow hover:brightness-110 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="spatial-glass rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-[#d4a373]/40 shadow-spatial-lg relative">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center space-y-5 py-4">
                <CheckCircle2 className="w-14 h-14 text-[#d4a373] mx-auto animate-bounce" />
                <h3 className="font-serif text-3xl font-bold text-white">Order Received!</h3>
                <p className="text-xs text-[#9a8c98]">
                  Your coffee is being freshly hand-extracted by our spatial baristas.
                </p>
                <div className="bg-[#090807] p-4 rounded-xl border border-[#d4a373]/30 font-mono text-xs text-[#d4a373]">
                  Order Code: {orderComplete.id}
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    onClearCart();
                    onClose();
                    setOrderComplete(null);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#c89666] text-[#090807] font-bold text-xs shadow-gold-glow"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-white">Complete Your Order</h3>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-[#d4a373]">Fulfillment Method</label>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <button
                      onClick={() => setFulfillmentType('pickup')}
                      className={`p-3 rounded-xl border ${
                        fulfillmentType === 'pickup'
                          ? 'bg-[#d4a373]/20 border-[#d4a373] text-white font-bold'
                          : 'bg-[#090807] border-white/10 text-[#9a8c98]'
                      }`}
                    >
                      Roastery Pickup
                    </button>
                    <button
                      onClick={() => setFulfillmentType('delivery')}
                      className={`p-3 rounded-xl border ${
                        fulfillmentType === 'delivery'
                          ? 'bg-[#d4a373]/20 border-[#d4a373] text-white font-bold'
                          : 'bg-[#090807] border-white/10 text-[#9a8c98]'
                      }`}
                    >
                      Express Courier
                    </button>
                  </div>
                </div>

                <div className="bg-[#090807] p-4 rounded-2xl border border-[#d4a373]/20 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[#9a8c98]">
                    <span>Items ({cartItems.length})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-[#d4a373]/10">
                    <span>Total Amount</span>
                    <span className="text-[#d4a373]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4a373] to-[#c89666] text-[#090807] font-semibold text-sm shadow-gold-glow hover:brightness-110"
                >
                  Place Order Now (${total.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

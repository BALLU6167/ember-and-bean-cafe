import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { CartItem } from '../types/cafe';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Bike, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderPageProps {
  onBackToHome: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  onBackToHome,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [tip, setTip] = useState<number>(30);
  const [enteredPromo, setEnteredPromo] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = orderType === 'delivery' ? 50 : 0;
  const packagingFee = cartItems.length > 0 ? 25 : 0;
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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DFB17B', '#C68B59', '#C85A32', '#F5EDE0'],
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#1E1410] text-[#F5EDE0]">
      <PageHeader
        badge="Roastery Checkout & Bag"
        title="Review Your Order & Express Checkout"
        description="Curbside pickup in Jubilee Hills ready in 15 minutes, or insulated express bike delivery within an 8km radius."
        onBackToHome={onBackToHome}
        breadcrumbs={['Order & Checkout']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!orderSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#1A110D] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#C68B59]/20 mb-6">
                  <h3 className="font-serif font-bold text-xl text-[#F5EDE0] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#DFB17B]" />
                    <span>Your Selected Items</span>
                  </h3>
                  <span className="text-xs font-mono text-[#DFB17B]">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-[#C68B59]/30 mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-lg text-[#F5EDE0]">Your bag is currently empty</h4>
                    <p className="text-xs text-[#F5EDE0]/60 mt-1 mb-6">
                      Explore our single-origin coffees, pour-overs, and laminated morning pastries.
                    </p>
                    <button
                      onClick={onExploreMenu}
                      className="px-6 py-3 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#DFB17B] transition-colors cursor-pointer"
                    >
                      Browse Craft Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#120B08] border border-[#C68B59]/30"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#F5EDE0]">{item.name}</h4>
                            <span className="font-mono text-sm font-bold text-[#DFB17B]">₹{item.price}</span>
                            {item.notes && (
                              <span className="text-[11px] text-[#F5EDE0]/50 block mt-0.5">{item.notes}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#C68B59]/15">
                          <div className="flex items-center bg-[#1A110D] rounded-xl border border-[#C68B59]/40 text-xs">
                            <button
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="px-3 py-1.5 text-[#F5EDE0]/70 hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-mono font-bold text-[#F5EDE0]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="px-3 py-1.5 text-[#F5EDE0]/70 hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-mono text-sm font-bold text-[#F5EDE0]">
                            ₹{item.price * item.quantity}
                          </span>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Fulfillment & Checkout */}
            <div className="lg:col-span-5 space-y-6">
              {/* Pickup / Courier Toggle */}
              <div className="bg-[#1A110D] border border-[#C68B59]/40 rounded-3xl p-6 shadow-xl">
                <span className="text-xs uppercase font-mono tracking-wider text-[#DFB17B] font-bold block mb-3">
                  1. Fulfillment Method
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-3.5 rounded-2xl border font-bold flex flex-col items-center gap-1.5 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#C68B59] text-[#1E1410] border-[#DFB17B] shadow-lg'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span>Curbside Pickup</span>
                    <span className="text-[10px] opacity-80">Ready in 15 mins (Free)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3.5 rounded-2xl border font-bold flex flex-col items-center gap-1.5 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#C68B59] text-[#1E1410] border-[#DFB17B] shadow-lg'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    <Bike className="w-5 h-5" />
                    <span>Express Courier</span>
                    <span className="text-[10px] opacity-80">Jubilee Hills 8km (+₹50)</span>
                  </button>
                </div>
              </div>

              {/* Order Summary & Payment */}
              <div className="bg-[#1A110D] border border-[#C68B59]/40 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
                <span className="text-xs uppercase font-mono tracking-wider text-[#DFB17B] font-bold block mb-2">
                  2. Order Summary
                </span>

                <div className="space-y-2 text-[#F5EDE0]/80 border-b border-[#C68B59]/20 pb-4">
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
                      <span>Express Courier Fee:</span>
                      <span className="font-mono text-[#F5EDE0]">₹{deliveryFee}</span>
                    </div>
                  )}
                  {packagingFee > 0 && (
                    <div className="flex justify-between">
                      <span>Compostable Packaging:</span>
                      <span className="font-mono text-[#F5EDE0]">₹{packagingFee}</span>
                    </div>
                  )}
                  {tip > 0 && (
                    <div className="flex justify-between">
                      <span>Barista Guild Tip:</span>
                      <span className="font-mono text-[#F5EDE0]">₹{tip}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#C68B59]/20 font-bold text-base text-[#F5EDE0]">
                    <span>Total Payable:</span>
                    <span className="font-serif text-2xl text-[#DFB17B]">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={enteredPromo}
                    onChange={(e) => setEnteredPromo(e.target.value)}
                    placeholder="Enter Voucher Code..."
                    className="flex-1 bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2 text-xs text-[#F5EDE0] uppercase placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2C1E18] text-[#DFB17B] font-bold rounded-xl text-xs uppercase hover:bg-[#3D2C22] border border-[#C68B59]/40"
                  >
                    Apply
                  </button>
                </form>

                <button
                  onClick={handleCompleteOrder}
                  disabled={cartItems.length === 0 || isCheckingOut}
                  className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Authorizing Order with Roastery...</span>
                  ) : (
                    <>
                      <span>Complete Order (₹{grandTotal})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* SUCCESS VIEW */
          <div className="max-w-xl mx-auto bg-[#1A110D] border-2 border-[#DFB17B] rounded-3xl p-10 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <CheckCircle className="w-16 h-16 text-[#DFB17B] mx-auto mb-4 animate-bounce" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#C68B59]">
              ORDER CONFIRMED
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#F5EDE0] mt-1 mb-2">
              Fresh Extraction In Progress
            </h3>
            <p className="text-xs text-[#F5EDE0]/70 mb-6 leading-relaxed">
              Order ID <strong className="text-[#DFB17B] font-mono">{orderId}</strong>. A receipt and real-time pickup status has been dispatched to your mobile number.
            </p>

            <button
              onClick={() => {
                onClearCart();
                setOrderSuccess(false);
                onBackToHome();
              }}
              className="px-8 py-3 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#DFB17B] transition-colors cursor-pointer"
            >
              Return to Roastery Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

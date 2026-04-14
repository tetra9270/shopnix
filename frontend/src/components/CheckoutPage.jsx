import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, MapPin, CreditCard, CheckCircle, Plus, ChevronRight, Truck, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const steps = ['Address', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [placedOrder, setPlacedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [addrSaving, setAddrSaving] = useState(false);
    const [addrError, setAddrError] = useState('');
    const [newAddr, setNewAddr] = useState({
        fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'Pakistan'
    });

    useEffect(() => {
        const info = localStorage.getItem('userInfo');
        if (!info) { navigate('/login'); return; }
        fetchUserAddresses();
    }, []);

    const fetchUserAddresses = async () => {
        try {
            const { data } = await API.get('/api/users/profile');
            setAddresses(data.addresses || []);
            const def = (data.addresses || []).find(a => a.isDefault);
            if (def) setSelectedAddress(def._id);
            else if ((data.addresses || []).length > 0) setSelectedAddress(data.addresses[0]._id);
        } catch (e) { console.error(e); }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setAddrSaving(true);
        setAddrError('');
        try {
            const { data } = await API.post('/api/users/address', newAddr);
            setAddresses(data);
            const last = data[data.length - 1];
            setSelectedAddress(last._id);
            setShowAddForm(false);
            setNewAddr({ fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'Pakistan' });
        } catch (e) {
            console.error(e);
            setAddrError(e?.response?.data?.message || 'Failed to save address. Please try again.');
        }
        setAddrSaving(false);
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) { resolve(true); return; }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const placeOrder = async () => {
        if (!selectedAddress) return;
        const addr = addresses.find(a => a._id === selectedAddress);
        setLoading(true);
        try {
            const orderItems = cartItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item.product,
                size: item.size,
                color: item.color
            }));
            const shippingPrice = cartTotal >= 999 ? 0 : 99;
            const totalPrice = cartTotal + shippingPrice;

            if (paymentMethod === 'Razorpay') {
                const loaded = await loadRazorpay();
                if (!loaded) { alert('Razorpay failed to load'); setLoading(false); return; }

                const { data: rpOrder } = await API.post('/api/payment/create-order', { amount: totalPrice });

                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: rpOrder.amount,
                    currency: 'INR',
                    name: 'Shahi Adaa',
                    description: 'Royal Fashion Purchase',
                    order_id: rpOrder.orderId,
                    handler: async function (response) {
                        const verifyRes = await API.post('/api/payment/verify', response);
                        if (verifyRes.data.success) {
                            const saved = await createOrder({
                                orderItems,
                                shippingAddress: addr,
                                paymentMethod: 'Razorpay',
                                itemsPrice: cartTotal,
                                shippingPrice,
                                totalPrice,
                            });
                            clearCart();
                            setPlacedOrder(saved);
                            setStep(2);
                        }
                    },
                    prefill: { name: userInfo?.name, email: userInfo?.email, contact: addr.phone },
                    theme: { color: '#b57a70' },
                };
                new window.Razorpay(options).open();
                setLoading(false);
            } else {
                // Cash on Delivery
                const saved = await createOrder({
                    orderItems,
                    shippingAddress: addr,
                    paymentMethod: 'Cash on Delivery',
                    itemsPrice: cartTotal,
                    shippingPrice,
                    totalPrice,
                });
                clearCart();
                setPlacedOrder(saved);
                setStep(2);
            }
        } catch (e) {
            console.error(e);
            alert('Order failed: ' + (e?.response?.data?.message || e.message));
        }
        setLoading(false);
    };

    const addr = addresses.find(a => a._id === selectedAddress);
    const shippingPrice = cartTotal >= 999 ? 0 : 99;
    const totalPrice = cartTotal + shippingPrice;

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {/* Steps Header */}
                <div className="checkout-steps">
                    {steps.map((s, i) => (
                        <div key={s} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                            <div className="step-circle">{i < step ? <CheckCircle size={14} /> : i + 1}</div>
                            <span>{s}</span>
                            {i < steps.length - 1 && <div className="step-line" />}
                        </div>
                    ))}
                </div>

                <div className="checkout-body">
                    {/* LEFT: Steps */}
                    <div className="checkout-left">
                        {/* STEP 0: ADDRESS */}
                        {step === 0 && (
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="checkout-section-title"><MapPin size={20} /> Delivery Address</h2>

                                {addresses.map(a => (
                                    <div
                                        key={a._id}
                                        className={`address-card ${selectedAddress === a._id ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddress(a._id)}
                                    >
                                        <div className="address-radio">
                                            <div className={`radio-dot ${selectedAddress === a._id ? 'active' : ''}`} />
                                        </div>
                                        <div className="address-details">
                                            <strong>{a.fullName}</strong>
                                            <span>{a.phone}</span>
                                            <p>{a.address}, {a.city}, {a.postalCode}</p>
                                            <span className="address-country">{a.country}</span>
                                            {a.isDefault && <span className="default-tag">Default</span>}
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Address */}
                                <button className="add-address-btn" onClick={() => setShowAddForm(!showAddForm)}>
                                    <Plus size={16} /> Add New Address
                                </button>

                                <AnimatePresence>
                                    {showAddForm && (
                                        <motion.form
                                            className="add-address-form"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            onSubmit={handleAddAddress}
                                        >
                                            {[
                                                { label: 'Full Name', key: 'fullName', type: 'text' },
                                                { label: 'Phone Number', key: 'phone', type: 'tel' },
                                                { label: 'Street Address', key: 'address', type: 'text' },
                                                { label: 'City', key: 'city', type: 'text' },
                                                { label: 'Postal Code', key: 'postalCode', type: 'text' },
                                            ].map(f => (
                                                <div className="form-field" key={f.key}>
                                                    <label>{f.label}</label>
                                                    <input
                                                        type={f.type}
                                                        required
                                                        value={newAddr[f.key]}
                                                        onChange={e => setNewAddr({ ...newAddr, [f.key]: e.target.value })}
                                                        placeholder={f.label}
                                                    />
                                                </div>
                                            ))}
                                            {/* Error message */}
                                            {addrError && (
                                                <div className="addr-error-msg">{addrError}</div>
                                            )}
                                            <button type="submit" className="save-addr-btn" disabled={addrSaving}>
                                                {addrSaving ? 'Saving...' : 'Save Address'}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>

                                <button
                                    className="checkout-continue-btn"
                                    disabled={!selectedAddress}
                                    onClick={() => setStep(1)}
                                >
                                    Continue to Payment <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 1: PAYMENT */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 className="checkout-section-title"><CreditCard size={20} /> Payment Method</h2>

                                <div className="payment-options">
                                    <div
                                        className={`payment-card ${paymentMethod === 'Razorpay' ? 'selected' : ''}`}
                                        onClick={() => setPaymentMethod('Razorpay')}
                                    >
                                        <div className="payment-radio">
                                            <div className={`radio-dot ${paymentMethod === 'Razorpay' ? 'active' : ''}`} />
                                        </div>
                                        <div className="payment-info">
                                            <div className="payment-label">
                                                <CreditCard size={18} />
                                                <strong>Online Payment</strong>
                                            </div>
                                            <p>Pay securely via Razorpay — Cards, UPI, Net Banking, Wallets</p>
                                            <div className="payment-icons">
                                                <span>UPI</span><span>VISA</span><span>Mastercard</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`payment-card ${paymentMethod === 'COD' ? 'selected' : ''}`}
                                        onClick={() => setPaymentMethod('COD')}
                                    >
                                        <div className="payment-radio">
                                            <div className={`radio-dot ${paymentMethod === 'COD' ? 'active' : ''}`} />
                                        </div>
                                        <div className="payment-info">
                                            <div className="payment-label">
                                                <Truck size={18} />
                                                <strong>Cash on Delivery</strong>
                                            </div>
                                            <p>Pay when your royal package arrives at your doorstep</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address Summary */}
                                {addr && (
                                    <div className="addr-summary">
                                        <strong>Delivering to:</strong>
                                        <p>{addr.fullName} — {addr.address}, {addr.city}</p>
                                    </div>
                                )}

                                <button
                                    className="checkout-continue-btn"
                                    onClick={placeOrder}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : `Place Order — ₹${totalPrice.toLocaleString()}`}
                                    <Crown size={18} />
                                </button>
                                <button className="back-btn" onClick={() => setStep(0)}>← Back to Address</button>
                            </motion.div>
                        )}

                        {/* STEP 2: CONFIRMATION */}
                        {step === 2 && (
                            <motion.div
                                className="confirmation-card"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 0.6, repeat: 2 }}
                                    className="confirm-icon"
                                >
                                    <CheckCircle size={60} />
                                </motion.div>
                                <h2>Order Placed! 🎉</h2>
                                <p>Your royal pieces are being prepared with love.</p>
                                {placedOrder && (
                                    <div className="order-id-badge">
                                        Order ID: <strong>{placedOrder._id?.slice(-8).toUpperCase()}</strong>
                                    </div>
                                )}
                                <div className="confirm-actions">
                                    <button className="checkout-continue-btn" onClick={() => navigate('/')}>
                                        Continue Shopping
                                    </button>
                                    <button className="back-btn" onClick={() => navigate('/profile')}>
                                        View My Orders
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT: Order Summary */}
                    {step < 2 && (
                        <div className="checkout-right">
                            <h3 className="summary-title"><Package size={18} /> Order Summary</h3>
                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div className="summary-item" key={item.itemKey}>
                                        <img src={item.image || '/placeholder.png'} alt={item.name} />
                                        <div className="summary-item-info">
                                            <span className="sum-name">{item.name}</span>
                                            {item.size && <span className="sum-tag">Size: {item.size}</span>}
                                            <span className="sum-qty">Qty: {item.qty}</span>
                                        </div>
                                        <span className="sum-price">₹{(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-totals">
                                <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                                <div className="summary-row"><span>Shipping</span><span>{shippingPrice === 0 ? 'FREE 🎉' : `₹${shippingPrice}`}</span></div>
                                <div className="summary-divider" />
                                <div className="summary-row total"><span>Total</span><span>₹{totalPrice.toLocaleString()}</span></div>
                            </div>
                            {cartTotal < 999 && (
                                <p className="free-shipping-hint">🎁 Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

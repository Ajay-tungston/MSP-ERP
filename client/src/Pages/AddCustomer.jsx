import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [customerNumber, setCustomerNumber] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phone: '',
    whatsapp: '',
    discount: 0,
    discountApplied: 'manual',
    openingBalance: 0,
    routeCustomer: false,
    routeAddress: '',
    sameAsPhone: false
  });
  const [loading, setLoading] = useState(false);

  // Fetch the next customer number when component mounts
  useEffect(() => {
    const fetchCustomerNumber = async () => {
      try {
        const response = await axios.get('http://localhost:3503/admin/customer/get');
        setCustomerNumber(response.data.nextNumber.toString().padStart(3, '0'));
      } catch (error) {
        console.error('Error fetching customer number:', error);
        toast.error('Failed to fetch customer number');
      }
    };
    
    fetchCustomerNumber();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSameAsPhoneChange = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsPhone: checked,
      whatsapp: checked ? prev.phone : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the data to match the backend schema
      const customerData = {
        customerName: formData.customerName.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim(),
        discount: Number(formData.discount),
        discountApplied: formData.discountApplied,
        openingBalance: Number(formData.openingBalance),
        routeCustomer: formData.routeCustomer,
        routeAddress: formData.routeCustomer ? formData.routeAddress.trim() : ''
      };

      const response = await axios.post('http//:localhost:3503/admin/customer/add', customerData);
      
      toast.success('Customer added successfully!');
      navigate('/customers'); // Redirect to customers list
    } catch (error) {
      console.error('Error adding customer:', error);
      let errorMessage = 'Failed to add customer';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Validation failed';
        } else if (error.response.status === 409) {
          errorMessage = 'Customer with this name or phone already exists';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1280px] p-12 bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-12 overflow-hidden">
      <div className="w-[1184px] pb-6 border-b border-[#a1a5b6] inline-flex justify-start items-center gap-2.5">
        <div className="justify-start text-[#151d48] text-[32px] font-bold font-['Urbanist'] leading-[44.80px]">
          Add New Customer
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="self-stretch inline-flex justify-between items-start flex-wrap content-start gap-8">
        {/* Customer Number */}
        <div className="w-[570px] h-14 flex justify-start items-center gap-12">
          <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            No.
          </div>
          <div className="w-[77px] text-center justify-start text-[#05004e] text-xl font-bold font-['Urbanist']">
            {customerNumber || '...'}
          </div>
        </div>

        {/* Customer Name */}
        <div className="flex justify-start items-center gap-12">
          <div className="min-w-[172px] justify-start">
            <span className="text-[#737791] text-xl font-normal font-['Urbanist']">Customer Name </span>
            <span className="text-red-500 text-xl font-normal font-['Urbanist']">*</span>
          </div>
          <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter here"
              className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex justify-start items-center gap-12">
          <div className="min-w-[172px] justify-start">
            <span className="text-[#737791] text-xl font-normal font-['Urbanist']">Address </span>
            <span className="text-red-500 text-xl font-normal font-['Urbanist']">*</span>
          </div>
          <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter here"
              className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-start items-center gap-12">
          <div className="min-w-[172px] justify-start">
            <span className="text-[#737791] text-xl font-normal font-['Urbanist']">Phone</span>
            <span className="text-red-500 text-xl font-normal font-['Urbanist']"> *</span>
          </div>
          <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10 digits"
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
              required
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex justify-start items-center gap-12">
          <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            WhatsApp
          </div>
          <div className="inline-flex flex-col justify-center items-start gap-3">
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl inline-flex justify-start items-center gap-2">
              <input
                type="tel"
                name="whatsapp"
                value={formData.sameAsPhone ? formData.phone : formData.whatsapp}
                onChange={handleChange}
                placeholder="Enter here"
                pattern="[0-9]{10}"
                maxLength="10"
                disabled={formData.sameAsPhone}
                className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
              />
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <input
                type="checkbox"
                id="sameAsPhone"
                checked={formData.sameAsPhone}
                onChange={handleSameAsPhoneChange}
                className="w-4 h-4 accent-[#4078ec]"
              />
              <label htmlFor="sameAsPhone" className="justify-start text-[#a1a5b6] text-base font-normal font-['Urbanist']">
                Same as Phone
              </label>
            </div>
          </div>
        </div>

        {/* Discount */}
        <div className="flex justify-start items-center gap-12">
          <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            Discount %
          </div>
          <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="0-100"
              className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* Discount Applied */}
        <div className="flex justify-start items-center gap-12">
          <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            Discount Applied
          </div>
          <div className="inline-flex flex-col justify-center items-start gap-6">
            <div className="w-[350px] rounded-xl inline-flex justify-start items-center">
              {['weekly', 'monthly', 'yearly'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, discountApplied: type }))}
                  className={`min-w-[116px] px-6 py-4 ${
                    formData.discountApplied === type ? 'bg-blue-50 text-[#4078ec]' : 'bg-gray-50 text-[#a1a5b6]'
                  } rounded-tl-xl rounded-bl-xl outline-1 outline-offset-[-1px] outline-[#e8e8ed] flex justify-center items-center gap-2 overflow-hidden`}
                >
                  <span className="text-xl font-normal font-['Urbanist']">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <div className="rounded-xl inline-flex justify-start items-center">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, discountApplied: 'manual' }))}
                className={`min-w-[175px] px-6 py-4 ${
                  formData.discountApplied === 'manual' ? 'bg-blue-50 text-[#4078ec]' : 'bg-gray-50 text-[#a1a5b6]'
                } rounded-tl-xl rounded-bl-xl outline-1 outline-offset-[-1px] outline-[#e8e8ed] flex justify-center items-center gap-2 overflow-hidden`}
              >
                <span className="text-xl font-normal font-['Urbanist']">Manual</span>
              </button>
            </div>
          </div>
        </div>

        {/* Opening Balance */}
        <div className="flex justify-start items-center gap-12">
          <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            Opening Balance
          </div>
          <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
            <div className="justify-start text-[#05004e] text-xl font-bold font-['Urbanist']">$</div>
            <input
              type="number"
              name="openingBalance"
              value={formData.openingBalance}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* Route Customer */}
        <div className="flex justify-start items-center gap-12">
          <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
            Route Customer
          </div>
          <div className="rounded-xl flex justify-start items-center">
            {[true, false].map((value) => (
              <button
                key={value.toString()}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, routeCustomer: value }))}
                className={`min-w-[175px] px-6 py-4 ${
                  formData.routeCustomer === value ? 'bg-blue-50 text-[#4078ec]' : 'bg-gray-50 text-[#a1a5b6]'
                } ${value ? 'rounded-tl-xl rounded-bl-xl' : 'rounded-tr-xl rounded-br-xl'} outline-1 outline-offset-[-1px] outline-[#e8e8ed] flex justify-center items-center gap-2 overflow-hidden`}
              >
                <span className="text-xl font-normal font-['Urbanist']">
                  {value ? 'Yes' : 'No'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Route Address (conditionally shown) */}
        {formData.routeCustomer && (
          <div className="flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">
              Route Address
            </div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
              <input
                type="text"
                name="routeAddress"
                value={formData.routeAddress}
                onChange={handleChange}
                placeholder="Enter route address"
                className="w-full bg-transparent outline-none text-[#05004e] text-xl font-normal font-['Urbanist']"
                required={formData.routeCustomer}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="self-stretch inline-flex justify-end items-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/customers')}
            className="w-[156px] px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-3 hover:bg-red-50 transition-colors"
          >
            <div className="w-8 h-8 relative">
              {/* Cancel icon SVG would go here */}
            </div>
            <span className="justify-start text-red-500 text-xl font-bold font-['Urbanist']">
              Cancel
            </span>
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-[156px] px-6 py-4 bg-[#4078ec] rounded-2xl flex justify-center items-center gap-3 hover:bg-[#3068dc] transition-colors disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <div className="w-8 h-8 relative">
                  {/* Save icon SVG would go here */}
                </div>
                <span className="justify-start text-white text-xl font-bold font-['Urbanist']">
                  Save
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
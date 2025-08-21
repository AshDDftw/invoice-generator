import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { addProduct } from '../store/productSlice';
import { Product } from '../types';
import Layout from '../components/Layout';

const AddProducts: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Product>();

  const watchedValues = watch();
  const productTotal = (watchedValues.quantity || 0) * (watchedValues.rate || 0);

  const onSubmit = (data: Product) => {
    dispatch(addProduct(data));
    reset();
  };

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + (product.total || 0), 0);
  };

  const calculateGST = () => {
    return (calculateSubtotal() * 18) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleGeneratePDF = () => {
    if (products.length === 0) {
      alert('Please add at least one product');
      return;
    }
    navigate('/generate-pdf');
  };

  return (
    <Layout>
      <div className="px-20 py-10">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold leading-tight mb-3">
            Add Products
          </h1>
        
        </div>

        <div className="space-y-15">
          {/* Add Product Form */}
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-6xl">
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div>
                  <label className="block text-white text-base font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-gray-400"
                    placeholder="Enter the product name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-base font-medium mb-2">
                    Product Price
                  </label>
                  <input
                    {...register('rate', {
                      required: 'Product price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-gray-400"
                    placeholder="Enter the price"
                  />
                  {errors.rate && (
                    <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-base font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    {...register('quantity', {
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Quantity must be at least 1' }
                    })}
                    type="number"
                    className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-gray-400"
                    placeholder="Enter the Qty"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                  )}
                </div>
              </div>

              {productTotal > 0 && (
                <div className="text-center mb-6">
                  <p className="text-white text-lg">
                    Product Total: ₹{productTotal.toFixed(2)}
                  </p>
                  <p className="text-white text-lg">
                    GST (18%): ₹{(productTotal * 0.18).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-dark to-gray-700 text-primary px-4 py-3 rounded-lg font-medium flex items-center gap-3"
                >
                  Add Product
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Products Table */}
          {products.length > 0 && (
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="bg-white bg-opacity-90 rounded-t-lg">
                  <div className="flex justify-between items-center p-3.5 text-black text-sm font-medium">
                    <span className="flex-1">Product name</span>
                    <span className="flex-1">Price</span>
                    <span className="flex-1">Quantity</span>
                    <span className="flex-1">Total Price</span>
                  </div>
                </div>

                {products.map((product, index) => (
                  <div key={index} className="border border-gray-600 p-4 flex justify-between items-center text-white text-sm">
                    <span className="flex-1 italic">{product.name}</span>
                    <span className="flex-1">₹{product.rate}</span>
                    <span className="flex-1">{product.quantity}</span>
                    <span className="flex-1">₹{product.total}</span>
                  </div>
                ))}

                <div className="border border-gray-600 p-4 flex justify-end text-white text-sm">
                  <div className="w-1/2 space-y-2">
                    <div className="flex justify-between">
                      <span>Sub-Total</span>
                      <span>₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incl + GST 18%</span>
                      <span>₹{calculateGST().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generate PDF Button */}
          {products.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleGeneratePDF}
                className="bg-gradient-to-r from-dark to-gray-700 text-primary px-8 py-3 rounded-lg font-medium text-lg"
              >
                Generate PDF Invoice
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
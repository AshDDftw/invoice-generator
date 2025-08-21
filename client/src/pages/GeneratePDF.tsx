import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { clearProducts } from '../store/productSlice';
import api from '../utils/api';
import Layout from '../components/Layout';

const GeneratePDF: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);

  const generatePDFMutation = useMutation({
    mutationFn: () => api.post('/invoice/generate', { products }, { 
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    }),
    onSuccess: (response) => {
      // Create blob with correct MIME type
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      // Clear products and redirect
      dispatch(clearProducts());
      alert('Invoice generated and downloaded successfully!');
      navigate('/add-products');
    },
    onError: (error: any) => {
      console.error('PDF Error:', error);
      alert(error.response?.data?.message || 'Failed to generate PDF');
    },
  });

  const handleGeneratePDF = () => {
    generatePDFMutation.mutate();
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

  if (products.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-white text-2xl mb-4">No products found</h1>
            <button
              onClick={() => navigate('/add-products')}
              className="bg-primary text-black px-6 py-3 rounded-lg font-medium"
            >
              Add Products
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-20 py-10">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold leading-tight mb-3">
            Generate PDF Invoice
          </h1>
          <p className="text-text-light-gray text-xl leading-7">
            Review your invoice details and generate PDF.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Invoice Preview */}
          <div className="bg-white text-black p-8 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black relative">
                  <div className="absolute w-2 h-5 bg-white right-1 top-2"></div>
                  <div className="absolute w-2 h-5 bg-white left-1 top-2"></div>
                </div>
                <div>
                  <h2 className="text-lg font-light">Levitation</h2>
                  <p className="text-xs">Infotech</p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold">INVOICE GENERATOR</h3>
 
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs opacity-80">Name</p>
                  <h4 className="text-lg text-green-400">{user?.name}</h4>
                </div>
                <div className="text-right">
                  <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
                  <div className="bg-white text-black px-3 py-1 rounded-full text-xs mt-1">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-r from-gray-700 to-green-800 text-white p-3 rounded-full mb-2">
                <div className="flex justify-between text-xs">
                  <span>Product</span>
                  <span>Qty</span>
                  <span>Rate</span>
                  <span>Total Amount</span>
                </div>
              </div>

              {products.map((product, index) => (
                <div key={index} className={`p-3 rounded-lg mb-1 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex justify-between text-xs">
                    <span>{product.name}</span>
                    <span>{product.quantity}</span>
                    <span>₹{product.rate}</span>
                    <span>₹{product.total}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded-lg p-3 w-64 ml-auto">
              <div className="flex justify-between text-xs mb-2">
                <span>Total Charges</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span>GST (18%)</span>
                <span>₹{calculateGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-600">
                <span>Total Amount</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-800 text-white text-center p-4 rounded-full mt-6 text-xs">
              We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGeneratePDF}
              disabled={generatePDFMutation.isPending}
              className="bg-primary text-black px-8 py-4 rounded-lg font-medium text-lg disabled:opacity-50"
            >
              {generatePDFMutation.isPending ? 'Generating PDF...' : 'Download PDF Invoice'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GeneratePDF;
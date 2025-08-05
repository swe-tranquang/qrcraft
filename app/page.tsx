'use client';

import { QRGenerator } from './components/QRGenerator';
import { Header } from './components/Header';
import { ToastContainer } from './components/ui/Toast';
import { useToast } from '@/hooks/useToast';

export default function Home() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Modern Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-sky-300/30 to-cyan-300/30 rounded-full blur-xl animate-pulse [animation-duration:4s]"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400/25 to-purple-300/25 rounded-full blur-lg animate-pulse [animation-duration:6s] [animation-delay:1s]"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-sky-400/20 to-sky-500/20 rounded-full blur-2xl animate-pulse [animation-duration:8s] [animation-delay:3s]"></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-r from-cyan-300/30 to-sky-300/30 rounded-full blur-xl animate-pulse [animation-duration:5s] [animation-delay:2s]"></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <main className="relative container mx-auto px-4 py-4 sm:py-8 lg:py-16">
        <QRGenerator />
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

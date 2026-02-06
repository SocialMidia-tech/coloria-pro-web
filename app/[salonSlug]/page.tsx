"use client";
import { useState } from 'react';

export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    // Aqui simularemos o upload por enquanto para você ver o visual
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[#F6F4F1] p-4 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-xl">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#2E2E2E]">Coloria Pro</h1>
          <p className="text-[#8B7E74] text-sm uppercase tracking-widest">{params.salonSlug}</p>
        </header>

        {!image ? (
          <div className="border-2 border-dashed border-[#D1C7BD] rounded-2xl p-10 text-center bg-[#FAF9F7]">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
              className="hidden" 
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-[#C9A14A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">+</span>
              </div>
              <p className="text-[#2E2E2E] font-medium">Tirar ou enviar foto</p>
              <p className="text-[#8B7E74] text-xs mt-2">Sua foto será usada apenas para a simulação.</p>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-inner bg-gray-100 aspect-[3/4]">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              {loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">Processando...</div>}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {/* Simulação das 12 cores */}
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
                <div key={i} className="h-10 w-full rounded-md bg-[#C9A14A] opacity-50 cursor-pointer hover:opacity-100 transition-all"></div>
              ))}
            </div>

            <button 
              onClick={() => setImage(null)}
              className="w-full py-3 text-[#8B7E74] text-sm font-medium"
            >
              Tentar outra foto
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

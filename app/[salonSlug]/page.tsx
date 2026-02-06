"use client";
import { useState } from 'react';

const CORES_PALETA = [
  { id: 1, nome: "Loiro Mel", hex: "#D4B483" },
  { id: 2, nome: "Pérola", hex: "#E8E1D5" },
  { id: 3, nome: "Avelã", hex: "#A67B5B" },
  { id: 4, nome: "Ruivo Acobreado", hex: "#B35C37" },
  { id: 5, nome: "Chocolate", hex: "#4B3621" },
  { id: 6, nome: "Morena Iluminada", hex: "#704214" },
  { id: 7, nome: "Vinho", hex: "#722F37" },
  { id: 8, nome: "Platinado", hex: "#E5E4E2" },
  { id: 9, nome: "Castanho Claro", hex: "#96694C" },
  { id: 10, nome: "Preto Azulado", hex: "#000080" },
  { id: 11, nome: "Dourado", hex: "#D4AF37" },
  { id: 12, nome: "Champagne", hex: "#F7E7CE" },
];

export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const [image, setImage] = useState<string | null>(null);
  const [corSelecionada, setCorSelecionada] = useState<string | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[#F6F4F1] p-4 flex flex-col items-center font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white/50">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#2E2E2E] tracking-tight">Coloria<span className="text-[#C9A14A]">Pro</span></h1>
          <p className="text-[#8B7E74] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">{params.salonSlug}</p>
        </header>

        {!image ? (
          <div className="border-2 border-dashed border-[#D1C7BD] rounded-[2rem] p-12 text-center bg-[#FAF9F7] transition-all hover:border-[#C9A14A]">
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload" className="cursor-pointer group">
              <div className="bg-[#C9A14A] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_rgba(201,161,74,0.3)] group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[#2E2E2E] font-bold text-lg">Tirar Foto</p>
              <p className="text-[#8B7E74] text-sm mt-2 px-4">Para um resultado melhor, use luz natural.</p>
            </label>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[3/4] bg-black">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              {/* Filtro de Cor Simulado */}
              {corSelecionada && (
                <div 
                  className="absolute inset-0 mix-blend-soft-light opacity-60 transition-all duration-700"
                  style={{ backgroundColor: corSelecionada }}
                ></div>
              )}
            </div>
            
            <div>
              <p className="text-center text-[#8B7E74] text-xs font-bold uppercase tracking-widest mb-4">Escolha sua nova cor</p>
              <div className="grid grid-cols-4 gap-3">
                {CORES_PALETA.map((cor) => (
                  <button 
                    key={cor.id}
                    onClick={() => setCorSelecionada(cor.hex)}
                    className={`h-12 w-full rounded-xl shadow-sm transition-all transform active:scale-95 ${corSelecionada === cor.hex ? 'ring-4 ring-[#C9A14A] scale-105' : 'ring-2 ring-transparent'}`}
                    style={{ backgroundColor: cor.hex }}
                    title={cor.nome}
                  />
                ))}
              </div>
              {corSelecionada && (
                <p className="text-center mt-4 text-[#C9A14A] font-bold animate-pulse">
                  {CORES_PALETA.find(c => c.hex === corSelecionada)?.nome}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#2E2E2E] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all">
                Agendar no Salão
              </button>
              <button onClick={() => {setImage(null); setCorSelecionada(null);}} className="text-[#8B7E74] text-sm font-medium underline">
                Tentar outra foto
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
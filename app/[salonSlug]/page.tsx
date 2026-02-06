"use client";
import { useState } from 'react';

const CORES = [
  { nome: "Loiro Mel", hex: "#D4AF37" },
  { nome: "Pérola", hex: "#E8E1D5" },
  { nome: "Avelã", hex: "#A67B5B" },
  { nome: "Ruivo", hex: "#B35C37" },
  { nome: "Chocolate", hex: "#4B3621" },
  { nome: "Morena Iluminada", hex: "#704214" },
  { nome: "Vinho", hex: "#722F37" },
  { nome: "Platinado", hex: "#E5E4E2" },
  { nome: "Castanho", hex: "#96694C" },
  { nome: "Preto", hex: "#1A1A1A" },
  { nome: "Dourado", hex: "#B8860B" },
  { nome: "Champagne", hex: "#F7E7CE" },
];

export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const [image, setImage] = useState<string | null>(null);
  const [cor, setCor] = useState<string>("");

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main style={{ backgroundColor: '#F6F4F1', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2E2E2E', fontSize: '28px', fontWeight: '900', margin: '0', letterSpacing: '-1px' }}>
          Coloria<span style={{ color: '#C9A14A' }}>Pro</span>
        </h1>
        <p style={{ color: '#8B7E74', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '5px' }}>
          {params.salonSlug}
        </p>
      </div>

      {!image ? (
        <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '350px', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#FAF9F7', border: '2px dashed #D1C7BD', borderRadius: '30px', padding: '40px 20px' }}>
            {/* REMOVIDO O CAPTURE PARA PERMITIR GALERIA */}
            <input type="file" accept="image/*" onChange={handleUpload} id="upload" style={{ display: 'none' }} />
            <label htmlFor="upload" style={{ cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#C9A14A', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(201,161,74,0.3)' }}>
                <span style={{ color: 'white', fontSize: '30px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>+</span>
              </div>
              <p style={{ color: '#2E2E2E', fontWeight: 'bold', fontSize: '18px', margin: '0' }}>Tirar ou Escolher Foto</p>
              <p style={{ color: '#8B7E74', fontSize: '12px', marginTop: '10px' }}>Toque para iniciar</p>
            </label>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ position: 'relative', borderRadius: '35px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', backgroundColor: 'black' }}>
            <img src={image} style={{ width: '100%', display: 'block' }} alt="Preview" />
            
            {/* FILTRO DE COR MELHORADO PARA CLAREAR */}
            {cor && (
              <>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: cor, 
                  mixBlendMode: 'color', 
                  opacity: 0.4,
                  pointerEvents: 'none' 
                }}></div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: cor, 
                  mixBlendMode: 'soft-light', 
                  opacity: 0.4,
                  pointerEvents: 'none' 
                }}></div>
              </>
            )}
          </div>

          <div style={{ marginTop: '25px', backgroundColor: 'white', padding: '20px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#8B7E74', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', marginBottom: '15px' }}>
              Escolha sua nova cor
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {CORES.map((c) => (
                <button 
                  key={c.nome} 
                  onClick={() => setCor(c.hex)}
                  style={{ 
                    backgroundColor: c.hex, 
                    height: '50px', 
                    border: cor === c.hex ? '3px solid #2E2E2E' : '2px solid #EEE', 
                    borderRadius: '12px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            <button 
              onClick={() => {setImage(null); setCor("");}} 
              style={{ width: '100%', marginTop: '20px', background: 'none', border: 'none', color: '#8B7E74', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Tentar outra foto
            </button>
          </div>

          <button style={{ width: '100%', marginTop: '20px', backgroundColor: '#2E2E2E', color: 'white', padding: '18px', borderRadius: '20px', fontWeight: 'bold', border: 'none' }}>
            Agendar no Salão
          </button>
        </div>
      )}
    </main>
  );
}
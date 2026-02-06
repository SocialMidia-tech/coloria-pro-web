"use client";
import { useState } from 'react';

export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const [image, setImage] = useState<string | null>(null);
  const [cor, setCor] = useState<string>("");

  const cores = [
    { nome: "Loiro Mel", hex: "#D4AF37" },
    { nome: "Ruivo", hex: "#B35C37" },
    { nome: "Chocolate", hex: "#4B3621" },
    { nome: "Vinho", hex: "#722F37" }
  ];

  const aoSubirFoto = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#F6F4F1', minHeight: '100vh', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2E2E2E', fontSize: '24px', fontWeight: 'bold' }}>Coloria Pro</h1>
      <p style={{ color: '#8B7E74', marginBottom: '20px' }}>Salão: {params.salonSlug}</p>

      {!image ? (
        <div style={{ border: '2px dashed #D1C7BD', padding: '60px 20px', borderRadius: '30px', backgroundColor: 'white', shadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <input type="file" accept="image/*" onChange={aoSubirFoto} id="upload" style={{ display: 'none' }} />
          <label htmlFor="upload" style={{ cursor: 'pointer', backgroundColor: '#C9A14A', color: 'white', padding: '20px 40px', borderRadius: '50px', fontWeight: 'bold', fontSize: '18px', display: 'inline-block' }}>
            📷 TIRAR FOTO
          </label>
          <p style={{ marginTop: '15px', color: '#8B7E74', fontSize: '12px' }}>Tire uma foto de frente com boa iluminação</p>
        </div>
      ) : (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ position: 'relative', width: '100%', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <img src={image} style={{ width: '100%', display: 'block' }} alt="Sua foto" />
            
            {/* CAMADA DE COR - Ajustada para ser bem visível */}
            {cor && (
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: cor, 
                mixBlendMode: 'overlay', // Mudamos para overlay que é mais forte que soft-light
                opacity: 0.6,
                pointerEvents: 'none' 
              }}></div>
            )}
          </div>

          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#2E2E2E' }}>Toque na cor para simular:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '15px' }}>
            {cores.map((c) => (
              <button 
                key={c.nome} 
                onClick={() => setCor(c.hex)}
                style={{ 
                  backgroundColor: c.hex, 
                  height: '60px', 
                  border: cor === c.hex ? '4px solid #2E2E2E' : '2px solid white', 
                  borderRadius: '15px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </div>

          <button 
            onClick={() => {setImage(null); setCor("");}} 
            style={{ marginTop: '30px', background: '#D1C7BD', border: 'none', padding: '10px 20px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}
          >
            🔄 Tentar outra foto
          </button>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from 'react';

export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const [image, setImage] = useState<string | null>(null);
  const [cor, setCor] = useState<string>("");

  const cores = [
    { nome: "Loiro", hex: "#D4B483" },
    { nome: "Ruivo", hex: "#B35C37" },
    { nome: "Preto", hex: "#1A1A1A" },
    { nome: "Mel", hex: "#C9A14A" }
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
      <h1 style={{ color: '#2E2E2E' }}>Coloria Pro</h1>
      <p style={{ color: '#8B7E74' }}>Salão: {params.salonSlug}</p>

      {!image ? (
        <div style={{ border: '2px dashed #D1C7BD', padding: '40px', borderRadius: '20px', backgroundColor: 'white' }}>
          <input type="file" accept="image/*" onChange={aoSubirFoto} id="upload" style={{ display: 'none' }} />
          <label htmlFor="upload" style={{ cursor: 'pointer', backgroundColor: '#C9A14A', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: 'bold' }}>
            CLIQUE PARA TIRAR FOTO
          </label>
        </div>
      ) : (
        <div>
          <div style={{ position: 'relative', width: '300px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={image} style={{ width: '100%', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: cor, mixBlendMode: 'soft-light', opacity: 0.5 }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '20px' }}>
            {cores.map((c) => (
              <button 
                key={c.nome} 
                onClick={() => setCor(c.hex)}
                style={{ backgroundColor: c.hex, height: '50px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
              />
            ))}
          </div>

          <button onClick={() => {setImage(null); setCor("");}} style={{ marginTop: '20px', background: 'none', border: 'none', textDecoration: 'underline', color: '#8B7E74' }}>
            Trocar foto
          </button>
        </div>
      )}
    </div>
  );
}
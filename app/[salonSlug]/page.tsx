export default function SalonPage({ params }: { params: { salonSlug: string } }) {
  const { salonSlug } = params;

  return (
    <main className="min-h-screen bg-[#F6F4F1] p-6 flex flex-col items-center justify-center">
      <div className="mx-auto max-w-md w-full rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Coloria Pro</h1>
        <div className="h-1 w-20 bg-[#C9A14A] mx-auto mb-6"></div>
        
        <p className="text-[#8B7E74] mb-8">
          Bem-vindo ao simulador do salão:<br/>
          <span className="text-xl font-black text-[#2E2E2E] uppercase tracking-widest">{salonSlug}</span>
        </p>

        <div className="rounded-2xl border-2 border-dashed border-[#D1C7BD] p-10 bg-[#FAF9F7]">
          <p className="text-[#8B7E74] italic">
            Área de Upload e Paleta de Cores em desenvolvimento...
          </p>
        </div>
      </div>
    </main>
  );
}

import React, { useState, useMemo } from 'react';

const SpecialistDirectory: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('Cardiología');
  const [search, setSearch] = useState('');

  const specialties = [
    { 
      name: 'Cardiología', 
      count: 4, 
      icon: 'favorite', 
      doctors: [
        { name: 'Dr. Carlos Mendoza', cmp: '88291', status: 'DISPONIBLE', sColor: 'bg-green-600 text-white border-green-700', dotColor: 'bg-green-500', img: 'https://i.pravatar.cc/150?u=doc1' },
        { name: 'Dra. Ana Torres', cmp: '10293', status: 'EN CONSULTA', sColor: 'bg-amber-500 text-white border-amber-600', dotColor: 'bg-yellow-500', img: 'https://i.pravatar.cc/150?u=doc2' },
        { name: 'Dr. Luis Paredes', cmp: '55432', status: 'FUERA DE TURNO', sColor: 'bg-slate-500 text-white border-slate-600', dotColor: 'bg-slate-400', img: 'https://i.pravatar.cc/150?u=doc3' }
      ]
    },
    { name: 'Pediatría', count: 6, icon: 'child_care', doctors: [
      { name: 'Dra. Elena Ramos', cmp: '44122', status: 'DISPONIBLE', sColor: 'bg-green-600 text-white border-green-700', dotColor: 'bg-green-500', img: 'https://i.pravatar.cc/150?u=doc4' }
    ]},
    { name: 'Ginecología', count: 3, icon: 'female', doctors: [] },
    { name: 'Neurología', count: 2, icon: 'psychology', doctors: [] },
    { name: 'Dermatología', count: 4, icon: 'face', doctors: [] },
  ];

  const filteredSpecialties = useMemo(() => {
    const lowerSearch = search.toLowerCase().trim();
    if (!lowerSearch) return specialties;
    
    return specialties.filter(spec => 
      spec.name.toLowerCase().includes(lowerSearch) || 
      spec.doctors.some(doc => doc.name.toLowerCase().includes(lowerSearch))
    ).map(spec => {
      if (!spec.name.toLowerCase().includes(lowerSearch)) {
        return {
          ...spec,
          doctors: spec.doctors.filter(d => d.name.toLowerCase().includes(lowerSearch))
        };
      }
      return spec;
    });
  }, [search]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none">Directorio Staff Médico</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-widest leading-none mt-2">Consulta de disponibilidad en tiempo real</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#1e3a8a] font-bold group-focus-within:scale-110 transition-transform">search</span>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-[#1e3a8a] transition-all shadow-sm" 
            placeholder="Buscar especialidad o médico..." 
          />
        </div>
        <button 
          onClick={() => alert(`Filtrando para: ${search || 'Todo el Staff'}`)}
          className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
        >
          <span className="material-symbols-outlined text-lg font-black">filter_list</span>
          Filtrar Ahora
        </button>
      </div>

      <div className="space-y-4">
        {filteredSpecialties.map((spec) => (
          <div key={spec.name} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm transition-all group/card">
            <button 
              onClick={() => setExpanded(expanded === spec.name ? null : spec.name)}
              className={`w-full p-8 flex items-center justify-between text-left transition-colors ${expanded === spec.name ? 'bg-blue-50/30 dark:bg-blue-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all group-hover/card:scale-110 ${expanded === spec.name ? 'bg-[#1e3a8a] text-white' : 'bg-slate-50 dark:bg-slate-800 text-blue-800 dark:text-blue-400'}`}>
                  <span className="material-symbols-outlined text-3xl font-black">{spec.icon}</span>
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">{spec.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5">{spec.doctors.length} Médicos Registrados</p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-slate-300 transition-transform duration-300 ${expanded === spec.name ? 'rotate-180 text-blue-800 font-black' : ''}`}>expand_more</span>
            </button>

            {expanded === spec.name && (
              <div className="px-8 pb-10 animate-in slide-in-from-top-4 duration-300">
                {spec.doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {spec.doctors.map((doc, i) => (
                      <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-slate-50 dark:border-slate-700 flex items-center gap-5 group/doc hover:border-blue-800 hover:shadow-xl transition-all relative overflow-hidden">
                        <div className="relative shrink-0">
                          <img src={doc.img} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-md ring-2 ring-white dark:ring-slate-700" alt={doc.name} />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3.5px] border-white dark:border-slate-800 ${doc.dotColor} shadow-md`}></div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate leading-none group-hover/doc:text-blue-800 transition-colors">{doc.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-widest">CÓDIGO: {doc.cmp}</p>
                          <div className={`mt-3 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm border-2 ${doc.sColor}`}>
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            {doc.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 mt-4">
                     <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Sin especialistas asignados actualmente</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialistDirectory;

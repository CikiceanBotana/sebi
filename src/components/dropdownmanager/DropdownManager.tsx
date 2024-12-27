import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Loader2 } from 'lucide-react';

const DropdownManager = () => {
  const [options, setOptions] = useState({
    sticla: [],
    Culoare_rama: [],
    Marime: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/dropdown-options');
      const data = await response.json();
      setOptions(data);
      setLoading(false);
    } catch (err) {
      setError('Nu am putut încărca opțiunile');
      setLoading(false);
    }
  };

  const addOption = (field: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeOption = (field: keyof typeof options, index: number) => {
    setOptions(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateOption = (field: keyof typeof options, index: number, value: string) => {
    setOptions(prev => ({
      ...prev,
      [field]: prev[field].map((opt, i) => i === index ? value : opt)
    }));
  };

  const saveOptions = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/dropdown-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options)
      });

      if (!response.ok) throw new Error('Eroare la salvare');
      
      setSuccess('Opțiunile au fost salvate cu succes!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Nu am putut salva opțiunile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#FAFAFA]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#2D1A4A] rounded-lg shadow-xl">
      <h2 className="text-2xl font-faculty text-[#FAFAFA] mb-6">Gestionare Opțiuni Dropdown</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400">{success}</p>
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(options).map(([field, values]) => (
          <div key={field} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-faculty text-[#FAFAFA]">
                {field === 'sticla' ? 'Tipuri de Sticlă' :
                 field === 'Culoare_rama' ? 'Culori Ramă' :
                 'Mărimi'}
              </h3>
              <button
                onClick={() => addOption(field as keyof typeof options)}
                className="flex items-center gap-2 px-4 py-2 bg-[#047A6E] text-[#FAFAFA] rounded-lg hover:bg-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-200"
              >
                <Plus size={16} />
                Adaugă Opțiune
              </button>
            </div>

            <div className="space-y-2">
              {values.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(field as keyof typeof options, index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#4A2B7A] text-[#FAFAFA] rounded-lg border border-[#FAFAFA]/10 focus:border-[#047A6E] focus:outline-none transition-colors duration-200"
                    placeholder="Introdu opțiunea..."
                  />
                  <button
                    onClick={() => removeOption(field as keyof typeof options, index)}
                    className="p-2 text-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={saveOptions}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#9F1E07] text-[#FAFAFA] rounded-lg hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Se salvează...
            </>
          ) : (
            <>
              <Save size={20} />
              Salvează Modificările
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DropdownManager;
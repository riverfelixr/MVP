import { CalendarClock, Mail, Phone, User2, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { ActivityLog, Lead } from '../types/lead';

interface LeadModalProps {
  lead: Lead;
  onClose: () => void;
  onAddNote: (leadId: string, note: ActivityLog) => void;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export function LeadModal({ lead, onClose, onAddNote }: LeadModalProps) {
  const [noteInput, setNoteInput] = useState('');

  const sortedHistory = useMemo(
    () => [...lead.history].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [lead.history]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!noteInput.trim()) return;

    onAddNote(lead.id, {
      id: `note-${Date.now()}`,
      date: new Date().toISOString(),
      note: noteInput.trim(),
      type: 'user',
    });

    setNoteInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Detalhes do Lead</h3>
            <p className="text-sm text-gray-500">{lead.name} · {lead.company}</p>
          </div>
          <button
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          <section className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Dados do Lead</h4>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
              <p className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                <User2 className="h-4 w-4" /> {lead.name} ({lead.role})
              </p>
              <p className="mb-1">Empresa: {lead.company}</p>
              <p className="mb-1">Serviço de interesse: {lead.serviceOfInterest}</p>
              <p className="mb-1 flex items-center gap-2"><Mail className="h-4 w-4" /> {lead.email}</p>
              <p className="mb-1 flex items-center gap-2 font-semibold text-gray-900">
                <Phone className="h-4 w-4 text-emerald-600" />
                Telefone (internacional / WhatsApp-ready): {lead.phone}
              </p>
              <p className="mb-1">Status: {lead.status}</p>
              <p>Valor: {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Timeline</h4>

            <ul className="max-h-72 space-y-3 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-4">
              {sortedHistory.map((item) => (
                <li key={item.id} className="rounded-lg bg-white p-3 shadow-sm">
                  <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {dateFormatter.format(new Date(item.date))}
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{item.note}</p>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium text-gray-700">Adicionar nota</label>
              <textarea
                id="note"
                className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
                rows={3}
                placeholder="Digite uma atualização, tarefa ou observação..."
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Salvar nota
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

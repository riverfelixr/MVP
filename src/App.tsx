import { Plus, WalletCards, CalendarCheck, UserPlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { LeadModal } from './components/LeadModal';
import { seedLeads } from './data/seedLeads';
import { ActivityLog, Lead, LeadStatus } from './types/lead';

const STORAGE_KEY = 'crm-mvp-leads';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  useEffect(() => {
    const savedLeads = localStorage.getItem(STORAGE_KEY);
    setLeads(savedLeads ? (JSON.parse(savedLeads) as Lead[]) : seedLeads);
  }, []);

  useEffect(() => {
    if (leads.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }
  }, [leads]);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) ?? null,
    [leads, selectedLeadId]
  );

  const metrics = useMemo(() => {
    const totalValue = leads.reduce((acc, lead) => acc + lead.value, 0);
    const tasksToday = leads.reduce((acc, lead) => acc + lead.history.filter((entry) => entry.type === 'task').length, 0);
    const newLeads = leads.filter((lead) => lead.status === 'novo').length;

    return {
      totalValue,
      tasksToday,
      newLeads,
    };
  }, [leads]);

  const handleMoveLead = (leadId: string, nextStatus: LeadStatus) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              status: nextStatus,
              history: [
                {
                  id: `system-${Date.now()}`,
                  date: new Date().toISOString(),
                  note: `Status atualizado para ${nextStatus}.`,
                  type: 'system',
                },
                ...lead.history,
              ],
            }
          : lead
      )
    );
  };

  const handleAddNote = (leadId: string, note: ActivityLog) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              history: [note, ...lead.history],
            }
          : lead
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
            <p className="text-sm text-gray-500">Gestão de leads B2B com foco em usabilidade.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Novo Lead
          </button>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-1 flex items-center gap-2 text-sm text-gray-500"><WalletCards className="h-4 w-4" /> Valor Total</p>
            <p className="text-xl font-semibold text-gray-900">
              {metrics.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-1 flex items-center gap-2 text-sm text-gray-500"><CalendarCheck className="h-4 w-4" /> Tarefas Hoje</p>
            <p className="text-xl font-semibold text-gray-900">{metrics.tasksToday}</p>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-1 flex items-center gap-2 text-sm text-gray-500"><UserPlus className="h-4 w-4" /> Novos Leads</p>
            <p className="text-xl font-semibold text-gray-900">{metrics.newLeads}</p>
          </article>
        </section>

        <KanbanBoard
          leads={leads}
          onMoveLead={handleMoveLead}
          onCardClick={(lead) => setSelectedLeadId(lead.id)}
        />
      </div>

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLeadId(null)}
          onAddNote={handleAddNote}
        />
      )}
    </main>
  );
}

export default App;

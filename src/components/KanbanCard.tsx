import { Building2, Handshake, Tag, UserRound } from 'lucide-react';
import { Lead } from '../types/lead';

interface KanbanCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function KanbanCard({ lead, onClick }: KanbanCardProps) {
  return (
    <button
      onClick={() => onClick(lead)}
      className="w-full rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
      type="button"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
          <p className="text-xs text-gray-500">{lead.role}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          {currencyFormatter.format(lead.value)}
        </span>
      </div>

      <div className="space-y-2 text-xs text-gray-600">
        <p className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> {lead.company}
        </p>
        <p className="flex items-center gap-1.5">
          <Handshake className="h-3.5 w-3.5" /> {lead.serviceOfInterest}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lead.tags.map((tag) => (
          <span
            key={`${lead.id}-${tag}`}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600"
          >
            {tag === 'Decisor' ? <UserRound className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

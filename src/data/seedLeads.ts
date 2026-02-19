import { Lead } from '../types/lead';

export const seedLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'João Silva',
    company: 'Empresa Alpha',
    role: 'Diretor de RH',
    email: 'joao.silva@alpha.com.br',
    phone: '+55 11 99999-1111',
    serviceOfInterest: 'Programa de Liderança 60 dias',
    value: 15000,
    status: 'novo',
    tags: ['Decisor', 'Urgente'],
    history: [
      {
        id: 'h-1-1',
        date: '2026-02-12T10:00:00.000Z',
        note: 'Lead criado no sistema.',
        type: 'system',
      },
    ],
  },
  {
    id: 'lead-2',
    name: 'Maria Souza',
    company: 'TechCorp',
    role: 'Business Partner RH',
    email: 'maria.souza@techcorp.com',
    phone: '+55 21 98888-2222',
    serviceOfInterest: 'Palestras e Workshops',
    value: 8000,
    status: 'negociacao',
    tags: ['RH'],
    history: [
      {
        id: 'h-2-1',
        date: '2026-02-10T14:30:00.000Z',
        note: 'Reunião inicial realizada.',
        type: 'user',
      },
    ],
  },
  {
    id: 'lead-3',
    name: 'Carlos',
    company: 'Grupo Omega',
    role: 'Gerente de Pessoas',
    email: 'carlos@grupoomega.com.br',
    phone: '+55 31 97777-3333',
    serviceOfInterest: 'Diagnóstico de Clima e Liderança',
    value: 22000,
    status: 'proposta',
    tags: ['InPacto'],
    history: [
      {
        id: 'h-3-1',
        date: '2026-02-11T09:00:00.000Z',
        note: 'Proposta enviada por e-mail.',
        type: 'task',
      },
    ],
  },
  {
    id: 'lead-4',
    name: 'Ana',
    company: 'Indústria Beta',
    role: 'Coordenadora de Compliance',
    email: 'ana@industriabeta.com',
    phone: '+55 19 96666-4444',
    serviceOfInterest: 'Adequação NR-1',
    value: 12000,
    status: 'novo',
    tags: ['Compliance'],
    history: [
      {
        id: 'h-4-1',
        date: '2026-02-12T16:45:00.000Z',
        note: 'Contato de entrada via formulário do site.',
        type: 'system',
      },
    ],
  },
];

import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Lead, LeadStatus } from '../types/lead';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  leads: Lead[];
  onMoveLead: (leadId: string, nextStatus: LeadStatus) => void;
  onCardClick: (lead: Lead) => void;
}

const columns: Array<{ id: LeadStatus; title: string }> = [
  { id: 'novo', title: 'Novo' },
  { id: 'negociacao', title: 'Negociação' },
  { id: 'proposta', title: 'Proposta' },
  { id: 'ganho', title: 'Ganho' },
  { id: 'perdido', title: 'Perdido' },
];

export function KanbanBoard({ leads, onMoveLead, onCardClick }: KanbanBoardProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;

    if (destination.droppableId === source.droppableId) return;

    onMoveLead(draggableId, destination.droppableId as LeadStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
        {columns.map((column) => {
          const columnLeads = leads.filter((lead) => lead.status === column.id);

          return (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided, snapshot) => (
                <section
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-2xl border p-3 ${
                    snapshot.isDraggingOver ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <header className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700">{column.title}</h2>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-500">
                      {columnLeads.length}
                    </span>
                  </header>

                  <div className="space-y-3">
                    {columnLeads.map((lead, index) => (
                      <Draggable draggableId={lead.id} index={index} key={lead.id}>
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <KanbanCard lead={lead} onClick={onCardClick} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </section>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

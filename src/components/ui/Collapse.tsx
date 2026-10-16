interface CollapseProps {
  open: boolean;
  id?: string;
  children: React.ReactNode;
}

/** Expande/colapsa su contenido con una transición de altura suave. */
export function Collapse({ open, id, children }: CollapseProps) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

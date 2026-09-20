import { ArrowDown, Boxes, Building2, Database, GitBranch, ShieldCheck } from "lucide-react";

export function Architecture({ compact = false }: { compact?: boolean }) {
  return <figure className={`architecture ${compact ? "architecture-compact" : ""}`}>
    <figcaption className="diagram-caption"><span className="status-dot" />EkaVio <span>Architecture overview</span></figcaption>
    <div className="architecture-flow">
      <div className="architecture-node org-node"><Building2 size={21} aria-hidden="true" /><span>Organization<span className="node-detail">People. Branches. Operations.</span></span><GitBranch size={21} aria-hidden="true" /></div>
      <span className="diagram-connector" aria-hidden="true"><ArrowDown size={16} /></span>
      <div className="architecture-node auth-node"><ShieldCheck size={22} aria-hidden="true" /><span>Identity & access<span className="node-detail">Sessions · Memberships · RBAC</span></span><span className="node-chip">API</span></div>
      <div className="diagram-fork" aria-hidden="true" />
      <div className="database-grid"><div className="database-node"><Database size={20} aria-hidden="true" /><strong>PostgreSQL</strong><span>Identity & commercial authority</span></div><div className="database-node"><Boxes size={20} aria-hidden="true" /><strong>MongoDB</strong><span>Operational domains</span></div></div>
      <div className="diagram-domains"><span>Queue</span><span>Inventory</span><span>Ledger</span><span>Attendance</span></div>
    </div>
    <p className="diagram-footnote">Tenant-aware by design.</p>
  </figure>;
}

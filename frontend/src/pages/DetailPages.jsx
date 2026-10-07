import { useNavigate } from "react-router-dom";
import { FormCard, DetailCard } from "../components/UI";

// ── Detail Pages ──
export function CompanyDetail() {
  return (
    <DetailCard
      title="Amazon.com, Inc"
      status="Ex-Customer"
      rows={[
        ["Address", "1234 Innovation St"],
        ["Phone", "(+1) 408-996-1010"],
        ["URL", "amazon.com"],
        ["Owner", "Budi Santoso"],
        ["Deals", "3 open"],
        ["Revenue", "$850,000.00"],
      ]}
    />
  );
}

export function DealDetail() {
  return (
    <DetailCard
      title="Cloud Infrastructure Migration"
      status="New"
      rows={[
        ["Company", "Amazon.com, Inc"],
        ["Price", "$850,000.00"],
        ["Created", "Mon, 12 Jan 2025"],
        ["Owner", "Ardian Maulana"],
        ["Stage", "New"],
        ["Probability", "40%"],
      ]}
    />
  );
}

export function ProductDetail() {
  return (
    <DetailCard
      title="AWS Elastic Compute Cloud (EC2)"
      status="Customer"
      rows={[
        ["Code", "GCI-001"],
        ["Unit", "Service"],
        ["Price", "$23,000"],
        ["Tags", "Operating System, Compute"],
        ["Stock", "Unlimited"],
        ["Sold", "128"],
      ]}
    />
  );
}

// ── Form Pages ──
export function EditContact() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Edit contact"
      fields={[
        ["Full name", "Ahmad Fauzi"],
        ["Job title", "Account Executive"],
        ["Email", "ahmad@gmail.com", "email"],
        ["Phone", "(+62) 80-0685-490"],
        ["Owner", "Ardian Maulana"],
        ["Status", "Customer"],
      ]}
      submitLabel="Save changes"
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function AddContact() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Add contact"
      fields={[["Full name"], ["Job title"], ["Email", "", "email"], ["Phone"], ["Owner"], ["Status"]]}
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function AddCompany() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Add company"
      fields={[["Company name"], ["Address"], ["Phone"], ["URL"], ["Owner"], ["Type"]]}
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function AddDeal() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Add deal"
      fields={[["Deal name"], ["Company"], ["Price"], ["Date created", "", "date"], ["Owner"], ["Stage"]]}
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function AddProduct() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Add product"
      fields={[["Product name"], ["Tags"], ["Unit"], ["Price"], ["Product code"]]}
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function AddTask() {
  const nav = useNavigate();
  return (
    <FormCard
      title="Add task"
      fields={[["Task name"], ["Category"], ["Due date", "", "date"], ["Team"], ["Assignee"], ["Status"]]}
      onSubmit={() => nav(-1)}
      onCancel={() => nav(-1)}
    />
  );
}

export function ImportCSV() {
  return (
    <div className="card text-center" style={{ maxWidth: 640, padding: 50 }}>
      <div style={{ border: "2px dashed var(--bd)", borderRadius: 14, padding: 40 }}>
        <h3>Drop your CSV file here</h3>
        <p className="muted">Contacts, companies or deals · max 10 MB</p>
        <button className="btn primary">Choose file</button>
      </div>
    </div>
  );
}

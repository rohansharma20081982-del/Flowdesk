export default function AccessDenied() {
  return (
    <div className="card text-center" style={{ padding: 60 }}>
      <h2>Access denied</h2>
      <p className="muted">Your current role does not have access to this page.</p>
    </div>
  );
}

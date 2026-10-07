const APPS = [
  ["ClearBit", "clearbit.com", true],
  ["Zapier", "zapier.com", true],
  ["Make", "make.com", false],
  ["Asana", "asana.com", true],
  ["Stripe", "stripe.com", false],
  ["Dropbox", "dropbox.com", false],
];

export default function Integrations() {
  return (
    <>
      <h3>Featured apps</h3>
      <div className="grid grid-3">
        {APPS.map(([name, url, on]) => (
          <div className="card" key={name}>
            <b>{name}</b>
            <br />
            <small className="muted">{url}</small>
            <p className="muted">Connect {name} with your CRM for smoother workflows.</p>
            <div className="flex justify-between items-center">
              <button className="btn">View detail</button>
              <button
                className={`toggle ${on ? "on" : ""}`}
                onClick={(e) => e.currentTarget.classList.toggle("on")}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

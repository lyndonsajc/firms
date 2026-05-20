import React, { useMemo, useState } from "react";

export default function App() {
  const [fixedCost, setFixedCost] = useState(120);
  const [variableCost, setVariableCost] = useState(8);
  const [marketShare, setMarketShare] = useState(50);
  const [economies, setEconomies] = useState(40);

  const reset = () => {
    setFixedCost(120);
    setVariableCost(8);
    setMarketShare(50);
    setEconomies(40);
  };

  const graph = useMemo(() => {
    const demandShift = marketShare * 0.5;
    const arIntercept = 68 + demandShift;
    const mrIntercept = arIntercept;
    const eosRight = economies * 0.28;
    const eosDown = economies * 0.22;

    const baseCentre = 48 + eosRight;
    const baseMinCost = 18 + variableCost * 1.25 - eosDown;
    const fixedCostGap = fixedCost - 120;

    const acMinQ = Math.max(12, Math.min(92, baseCentre + fixedCostGap * 0.13));

    const mcAt = (q) => baseMinCost + 18 * (Math.exp(0.035 * (q - baseCentre)) - 1);
    const minAC = mcAt(acMinQ);
    const acAt = (q) => minAC + Math.pow(q - acMinQ, 2) / 70;
    const arAt = (q) => Math.max(0, arIntercept - q * 0.82);
    const mrAt = (q) => mrIntercept - q * 1.64;

    let q = 1;
    let smallestGap = Infinity;
    for (let i = 1; i <= 95; i += 0.25) {
      const gap = Math.abs(mcAt(i) - mrAt(i));
      if (gap < smallestGap) {
        smallestGap = gap;
        q = i;
      }
    }

    const acAtQ = acAt(q);
    const mcAtQ = mcAt(q);
    const arAtQ = arAt(q);
    const mrAtQ = mrAt(q);

    return {
      q,
      acMinQ,
      minAC,
      acAt,
      mcAt,
      arAt,
      mrAt,
      acAtQ,
      mcAtQ,
      arAtQ,
      mrAtQ,
      profitPerUnit: arAtQ - acAtQ,
      totalProfit: (arAtQ - acAtQ) * q,
    };
  }, [fixedCost, variableCost, marketShare, economies]);

  

  const outcome = graph.totalProfit >= 0 ? "Supernormal profit" : "Subnormal profit / loss";

  const insightCards = [
    {
      label: "Output decision",
      value: `Q* = ${graph.q.toFixed(1)}`,
      note: "The firm produces where MC = MR.",
    },
    {
      label: "Price decision",
      value: `$${graph.arAtQ.toFixed(1)}`,
      note: "Price is read from AR at Q*.",
    },
    {
      label: "Average cost",
      value: `$${graph.acAtQ.toFixed(1)}`,
      note: "AC is read from the AC curve at Q*.",
    },
    {
      label: "Profit per unit",
      value: `$${graph.profitPerUnit.toFixed(1)}`,
      note: "This is the gap between AR and AC.",
    },
  ];

  const costChangeSummary =
    fixedCost > 120
      ? "Fixed cost has increased, so AC slides rightward/upward along the unchanged MC curve."
      : fixedCost < 120
        ? "Fixed cost has decreased, so AC slides leftward/downward along the unchanged MC curve."
        : "Fixed cost is at the base level, so AC is at its original position on MC.";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
        .min-h-screen { min-height: 100vh; }
        .bg-slate-50 { background: #f8fafc; }
        .bg-white { background: #ffffff; }
        .bg-slate-100 { background: #f1f5f9; }
        .bg-slate-900 { background: #0f172a; }
        .bg-emerald-100 { background: #d1fae5; }
        .bg-rose-100 { background: #ffe4e6; }
        .text-slate-900 { color: #0f172a; }
        .text-slate-700 { color: #334155; }
        .text-slate-500 { color: #64748b; }
        .text-slate-400 { color: #94a3b8; }
        .text-white { color: white; }
        .text-emerald-700 { color: #047857; }
        .text-rose-700 { color: #be123c; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .uppercase { text-transform: uppercase; }
        .tracking-wide { letter-spacing: 0.025em; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-7xl { max-width: 80rem; }
        .max-w-3xl { max-width: 48rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .rounded-3xl { border-radius: 1.5rem; }
        .rounded-full { border-radius: 9999px; }
        .border { border: 1px solid #e2e8f0; }
        .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
        .grid { display: grid; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .min-w-0 { min-width: 0; }
        .overflow-hidden { overflow: hidden; }
        .list-disc { list-style-type: disc; }
        .pl-4 { padding-left: 1rem; }
        .leading-5 { line-height: 1.25rem; }
        .leading-6 { line-height: 1.5rem; }
        .italic { font-style: italic; }
        button { cursor: pointer; background: white; }
        button:hover { background: #f1f5f9; }
        input[type='range'] { width: 100%; accent-color: #1e293b; }
        .h-\[430px\] { height: 430px; }
        .text-\[11px\] { font-size: 11px; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .controls-row { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0.75rem; align-items:start; }
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .text-center { text-align: center; }
        .flex-col { flex-direction: column; }
        .justify-start { justify-content: flex-start; }
        svg { width: 100%; height: auto; display: block; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (min-width: 768px) {
          .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
      <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            H2 Economics • Firms and Decisions
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Interactive Economics Tool: Revenue and Cost Changes
          </h1>
        </div>

        <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:'1rem', alignItems:'start'}}>
          <div className="rounded-3xl bg-white shadow-sm">
            <div className="p-6">
              <h2 className="mb-1 text-xl font-bold">Firm's Cost and Revenue Diagram
            </h2>

            <MonopolyDiagram graph={graph} />
            </div>
          </div>

          <div className="rounded-3xl border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Live Teaching Dashboard
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">What changed?</h2>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  graph.totalProfit >= 0
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}>
                  {outcome}
                </span>
              </div>

              <div className="space-y-2">
                {insightCards.map((item) => (
                  <div key={item.label} className="rounded-2xl border bg-white p-3 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-sm">
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Controls</h2>

              <button
                onClick={reset}
                className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-100"
              >
                Reset
              </button>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap:'0.75rem', alignItems:'start'}}>
              <Control title="Fixed Cost" value={`$${fixedCost.toFixed(0)}`} note="Shifts AC; AC minimum moves along MC" min="50" max="300" examples={["Rent or lease increases", "New machinery or equipment"]}>
                <input type="range" value={fixedCost} min={50} max={300} step={1} onChange={(e) => setFixedCost(Number(e.target.value))} className="w-full accent-slate-800" />
              </Control>

              <Control title="Variable Cost per Unit" value={`$${variableCost.toFixed(1)}`} note="Shifts AC and MC" min="2" max="20" examples={["Higher wages", "Changes in raw material prices"]}>
                <input type="range" value={variableCost} min={2} max={20} step={0.1} onChange={(e) => setVariableCost(Number(e.target.value))} className="w-full accent-slate-800" />
              </Control>

              <Control title="Market Share" value={`${marketShare.toFixed(0)}%`} note="Shifts AR and MR" min="10" max="90" examples={["More effective advertising", "Better product quality"]}>
                <input type="range" value={marketShare} min={10} max={90} step={1} onChange={(e) => setMarketShare(Number(e.target.value))} className="w-full accent-slate-800" />
              </Control>

              <Control title="Economies of Scale" value={`${economies.toFixed(0)}%`} note="Shifts AC and MC rightward/downward" min="0" max="80" examples={["Bulk buying discounts", "Specialisation of labour"]}>
                <input type="range" value={economies} min={0} max={80} step={1} onChange={(e) => setEconomies(Number(e.target.value))} className="w-full accent-slate-800" />
              </Control>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function MonopolyDiagram({ graph }) {
  const W = 760;
  const H = 480;
  const L = 90;
  const T = 25;
  const B = 55;
  const plotW = W - L - 35;
  const plotH = H - T - B;
  const x = (q) => L + (q / 100) * plotW;
  const y = (p) => T + (1 - p / 100) * plotH;

  const pts = Array.from({ length: 101 }, (_, q) => ({
    q,
    ac: graph.acAt(q),
    mc: graph.mcAt(q),
    ar: graph.arAt(q),
    mr: Math.max(0, graph.mrAt(q)),
  }));

  const makePath = (key) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.q)},${y(p[key])}`).join(" ");
  const qx = x(graph.q);
  const priceY = y(graph.arAtQ);
  const acY = y(graph.acAtQ);
  const mcY = y(graph.mcAtQ);
  const mrY = y(Math.max(0, graph.mrAtQ));
  const acMinX = x(graph.acMinQ);
  const acMinY = y(graph.minAC);

  return (
    <div className="overflow-hidden rounded-2xl border bg-white p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[430px] w-full">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="black" />
          </marker>
        </defs>

        <line x1={L} y1={H - B} x2={W - 20} y2={H - B} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1={L} y1={H - B} x2={L} y2={10} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />

        <text x={W - 25} y={H - 22} fontSize="28" fontStyle="italic">Q</text>
        <text x={18} y={30} fontSize="16" fontWeight="600">Price /</text>
        <text x={18} y={50} fontSize="16" fontWeight="600">Cost /</text>
        <text x={18} y={70} fontSize="16" fontWeight="600">Revenue</text>
        <text x={L + 8} y={H - B + 25} fontSize="18">0</text>

        <path d={makePath("ar")} fill="none" stroke="black" strokeWidth="2.5" />
        <path d={makePath("mr")} fill="none" stroke="black" strokeWidth="2.5" />
        <path d={makePath("ac")} fill="none" stroke="black" strokeWidth="2.5" />
        <path d={makePath("mc")} fill="none" stroke="black" strokeWidth="2.5" />

        {graph.profitPerUnit > 0 ? (
          <rect x={L} y={priceY} width={qx - L} height={Math.max(0, acY - priceY)} fill="rgba(34,197,94,0.18)" stroke="rgba(34,197,94,0.55)" />
        ) : (
          <rect x={L} y={acY} width={qx - L} height={Math.max(0, priceY - acY)} fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.55)" />
        )}

        <line x1={qx} y1={H - B} x2={qx} y2={priceY} stroke="black" strokeDasharray="5 4" strokeWidth="1.5" />
        <line x1={L} y1={priceY} x2={qx} y2={priceY} stroke="black" strokeDasharray="5 4" strokeWidth="1.5" />
        <line x1={L} y1={acY} x2={qx} y2={acY} stroke="black" strokeDasharray="5 4" strokeWidth="1.5" />
        <line x1={acMinX} y1={H - B} x2={acMinX} y2={acMinY} stroke="black" strokeDasharray="3 4" strokeWidth="1" opacity="0.6" />

        <circle cx={qx} cy={priceY} r="5" fill="black" />
        <circle cx={qx} cy={acY} r="5" fill="black" />
        <circle cx={qx} cy={mrY} r="5" fill="black" />
        <circle cx={qx} cy={mcY} r="5" fill="black" />
        <circle cx={acMinX} cy={acMinY} r="6" fill="white" stroke="black" strokeWidth="2.5" />

        <text x={x(88)} y={y(graph.mcAt(88)) - 8} fontSize="28" fontStyle="italic">MC</text>
        <text x={x(90)} y={y(graph.acAt(90)) - 8} fontSize="28" fontStyle="italic">AC</text>
        <text x={x(92)} y={y(graph.arAt(92)) + 18} fontSize="28" fontStyle="italic">AR</text>
        <text x={x(55)} y={y(Math.max(0, graph.mrAt(55))) + 28} fontSize="28" fontStyle="italic">MR</text>
        <text x={qx - 8} y={H - B + 28} fontSize="18">Q*</text>
        <text x={L - 32} y={priceY + 5} fontSize="18">P</text>
        <text x={L - 34} y={acY + 5} fontSize="18">AC</text>
      </svg>
    </div>
  );
}

function Control({ title, value, note, children, min, max, examples = [] }) {
  return (
    <div className="space-y-2 rounded-2xl border bg-white p-3 h-full flex flex-col justify-start">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-[11px] text-slate-500">{note}</p>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-bold">{value}</div>
      </div>
      {children}
      <div className="flex justify-between text-xs text-slate-400"><span>{min}</span><span>{max}</span></div>
      {examples.length > 0 && (
        <div className="rounded-xl bg-slate-50 p-2 text-[11px] text-slate-700 flex-1 overflow-hidden">
          <p className="mb-1 font-semibold">Why might this change?</p>
          <ul className="list-disc space-y-1 pl-4">
            {examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


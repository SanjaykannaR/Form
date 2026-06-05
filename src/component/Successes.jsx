const tickMarks = Array.from({ length: 12 }, (_, index) => index);
const portalRings = Array.from({ length: 4 }, (_, index) => index);
const timeSparks = Array.from({ length: 8 }, (_, index) => index);

function Successes({ show, duration = 4200 }) {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-5 z-50 flex justify-center sm:top-7"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/35 bg-zinc-950/78 p-4 text-white shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-5">
        <style>
          {`
            @keyframes successToastIn {
              0% { opacity: 0; transform: translateY(-20px) scale(.96); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }

            @keyframes successOrbit {
              to { transform: rotate(360deg); }
            }

            @keyframes successCounterOrbit {
              to { transform: rotate(-360deg); }
            }

            @keyframes successPortal {
              0% { opacity: 0; transform: translate(-50%, -50%) scale(.35) rotate(0deg); }
              35% { opacity: .9; }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1.35) rotate(180deg); }
            }

            @keyframes successHandSweep {
              to { transform: translateX(-50%) rotate(720deg); }
            }

            @keyframes successJump {
              0%, 100% { transform: translate(-50%, -50%) scale(.92); opacity: .82; }
              45% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
              60% { transform: translate(-50%, -50%) scale(.72); opacity: .96; }
            }

            @keyframes successPulse {
              0%, 100% { transform: scale(.92); opacity: .75; }
              50% { transform: scale(1.06); opacity: 1; }
            }

            @keyframes successSpark {
              0% { opacity: 0; transform: translateX(-42px) scale(.6); }
              20% { opacity: 1; }
              100% { opacity: 0; transform: translateX(260px) scale(1); }
            }

            @keyframes successSweep {
              from { transform: scaleX(1); }
              to { transform: scaleX(0); }
            }

            .success-toast {
              animation: successToastIn 480ms cubic-bezier(.2,.9,.2,1) both;
            }

            .success-orbit {
              animation: successOrbit 2.8s linear infinite;
            }

            .success-counter-orbit {
              animation: successCounterOrbit 4.8s linear infinite;
            }

            .success-portal-ring {
              animation: successPortal 2.4s ease-out infinite;
            }

            .success-minute-hand {
              animation: successHandSweep 1.5s cubic-bezier(.45,0,.2,1) infinite;
              transform-origin: 50% 100%;
            }

            .success-hour-hand {
              animation: successHandSweep 3s cubic-bezier(.45,0,.2,1) infinite;
              transform-origin: 50% 100%;
            }

            .success-jump-core {
              animation: successJump 1.65s ease-in-out infinite;
            }

            .success-spark {
              animation: successSpark 1.8s linear infinite;
            }

            .success-progress {
              animation: successSweep ${duration}ms linear forwards;
              transform-origin: left;
            }
          `}
        </style>

        <div className="success-toast relative flex items-center gap-4">
          <div className="absolute inset-0 overflow-hidden">
            {timeSparks.map((spark) => (
              <span
                key={spark}
                className="success-spark absolute h-px w-10 rounded-full bg-gradient-to-r from-transparent via-amber-200 to-transparent"
                style={{
                  animationDelay: `${spark * 180}ms`,
                  top: `${18 + (spark % 4) * 18}%`,
                }}
              />
            ))}
          </div>

          <div className="relative grid h-24 w-24 shrink-0 place-items-center">
            {portalRings.map((ring) => (
              <span
                key={ring}
                className="success-portal-ring absolute left-1/2 top-1/2 h-20 w-20 rounded-full border border-amber-200/35"
                style={{
                  animationDelay: `${ring * 420}ms`,
                  boxShadow: "0 0 24px rgba(245, 158, 11, 0.2)",
                }}
              />
            ))}

            <div className="relative grid h-20 w-20 place-items-center rounded-full border border-amber-100/40 bg-black/42 shadow-[0_0_34px_rgba(245,158,11,0.28)]">
              <div className="absolute -inset-1 rounded-full border border-amber-300/25" />
              <div className="success-orbit absolute inset-0 rounded-full border border-dashed border-amber-300/45" />
              <div className="success-counter-orbit absolute inset-2 rounded-full border border-dotted border-cyan-200/35" />

              <div className="absolute inset-1 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.22),transparent_32%),conic-gradient(from_0deg,rgba(245,158,11,0.14),rgba(6,182,212,0.18),rgba(245,158,11,0.14))]" />

              {tickMarks.map((tick) => (
                <span
                  key={tick}
                  className={`absolute left-1/2 top-1/2 rounded-full bg-amber-100/75 ${
                    tick % 3 === 0 ? "h-2.5 w-0.5" : "h-1.5 w-0.5"
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${tick * 30}deg) translateY(-34px)`,
                  }}
                />
              ))}

              <span className="success-minute-hand absolute left-1/2 top-[16px] h-7 w-1 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.75)]" />
              <span className="success-hour-hand absolute left-1/2 top-[25px] h-5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,0.55)]" />

              <span className="success-jump-core absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-400/30">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12.5 4.2 4.2L19 7"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="relative min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-100">
              Time jump locked
            </p>
            <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-xl">
              Success. Your watch is tuned for travel.
            </h2>
            <p className="mt-1 text-sm font-medium text-zinc-300">
              Resetting the timeline now, then the form opens for another trip.
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="success-progress h-full rounded-full bg-amber-300" />
        </div>
      </div>
    </div>
  );
}

export default Successes;

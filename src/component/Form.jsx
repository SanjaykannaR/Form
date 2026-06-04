import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    title: "Alpine Night",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "City After Dark",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Ocean Route",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Forest Escape",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  place: "",
  time: "",
  date: "",
  plan: "",
};

const fields = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Write your full name",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Write your email address",
    autoComplete: "email",
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Write your phone number",
    autoComplete: "tel",
  },
  {
    id: "dob",
    label: "DOB",
    type: "date",
    placeholder: "Write your date of birth",
  },
  {
    id: "place",
    label: "Place",
    type: "text",
    placeholder: "Where are you from?",
    autoComplete: "address-level2",
  },
  {
    id: "time",
    label: "Time",
    type: "time",
    placeholder: "Time",
  },
  {
    id: "date",
    label: "Date",
    type: "date",
    placeholder: "Date",
  },
];

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3M5 11h14M6.5 21h11A2.5 2.5 0 0 0 20 18.5v-11A2.5 2.5 0 0 0 17.5 5h-11A2.5 2.5 0 0 0 4 7.5v11A2.5 2.5 0 0 0 6.5 21Z"
      />
    </svg>
  );
}

function Form() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const completion = useMemo(() => {
    const filledFields = Object.values(formData).filter(Boolean).length;
    return Math.round((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
    setSubmitMessage("");
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.date) nextErrors.date = "Select your watch date.";
    if (!formData.time) nextErrors.time = "Select your watch time.";
    if (!formData.plan.trim()) nextErrors.plan = "Tell us what you want to do.";

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitMessage("");
      return;
    }

    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: "form-24-watch-ui",
    };

    console.log("Backend payload:", payload);
    setSubmitMessage("Perfect. Your watch plan is ready to send.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.title}
            src={slide.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-80" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(245,158,11,0.22),transparent_28%),linear-gradient(120deg,rgba(2,6,23,0.88),rgba(9,9,11,0.78)_45%,rgba(2,6,23,0.92))]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8 lg:p-12"
        >
          <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                <CalendarIcon />
                Premium booking form
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Form <span className="text-amber-400">24</span> For Your Time
                Travel <span className="text-amber-400">Watch</span>
              </h1>
            </div>

            <div className="min-w-44 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-sm text-zinc-300">Form progress</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-2 text-right text-sm font-semibold text-amber-200">
                {completion}%
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.id}
                className={field.id === "place" ? "md:col-span-1" : ""}
              >
                <span className="mb-3 block text-xl font-bold text-zinc-50 sm:text-2xl">
                  {field.label}
                </span>
                <input
                  name={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className="h-16 w-full rounded-2xl border border-white/15 bg-black/20 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300/70 focus:bg-black/35 focus:shadow-[0_0_35px_rgba(245,158,11,0.18)]"
                />
                {errors[field.id] && (
                  <span className="mt-2 block text-sm font-medium text-rose-300">
                    {errors[field.id]}
                  </span>
                )}
              </label>
            ))}
          </div>

          <label className="mt-6 block">
            <span className="mb-3 block text-xl font-bold text-zinc-50 sm:text-2xl">
              What You Want to Do
            </span>
            <textarea
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              placeholder="Write what you are going to do with the watch"
              rows="4"
              className="w-full resize-none rounded-2xl border border-white/15 bg-black/20 px-5 py-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-amber-300/70 focus:bg-black/35 focus:shadow-[0_0_35px_rgba(245,158,11,0.18)]"
            />
            {errors.plan && (
              <span className="mt-2 block text-sm font-medium text-rose-300">
                {errors.plan}
              </span>
            )}
          </label>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Show ${slide.title} background`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    activeSlide === index
                      ? "w-10 bg-amber-300"
                      : "w-3 bg-white/35 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {submitMessage && (
                <p className="text-sm font-semibold text-emerald-300">
                  {submitMessage}
                </p>
              )}
              <button
                type="submit"
                className="rounded-2xl bg-amber-400 px-8 py-4 text-base font-black text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
              >
                Submit Watch Plan
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Form;

import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    title: "Alpine Night",
    subtitle: "Mountain escape",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=75",
  },
  {
    title: "Northern Lake",
    subtitle: "Calm evening plan",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=75",
  },
  {
    title: "Ocean Route",
    subtitle: "Blue hour travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=75",
  },
  {
    title: "Forest Escape",
    subtitle: "Deep nature watch",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=75",
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
    icon: "user",
    type: "text",
    placeholder: "Write your full name",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    icon: "mail",
    type: "email",
    placeholder: "Write your email address",
    autoComplete: "email",
  },
  {
    id: "phone",
    label: "Phone",
    icon: "phone",
    type: "tel",
    placeholder: "Write your phone number",
    autoComplete: "tel",
  },
  {
    id: "dob",
    label: "Date of Birth",
    icon: "calendar",
    type: "date",
    placeholder: "Write your date of birth",
  },
  {
    id: "place",
    label: "Place",
    icon: "pin",
    type: "text",
    placeholder: "Where are you from?",
    autoComplete: "address-level2",
  },
  {
    id: "time",
    label: "Time",
    icon: "clock",
    type: "time",
    placeholder: "what time do you want to watch?",
  },
  {
    id: "date",
    label: "Date",
    icon: "calendar",
    type: "date",
    placeholder: "what date do you want to watch?",
  },
];

const mainFields = fields.filter((field) => !["time", "date"].includes(field.id));
const scheduleFields = fields.filter((field) => ["time", "date"].includes(field.id));

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      width="20"
      height="20"
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

function FieldIcon({ type }) {
  const paths = {
    user: "M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0",
    mail: "M4.5 6.75h15v10.5h-15V6.75Zm0 0L12 12l7.5-5.25",
    phone:
      "M6.75 4.5 9 4l1.5 4-1.75 1.25a12 12 0 0 0 6 6L16 13.5l4 1.5-.5 2.25c-.25 1.1-1.25 1.9-2.4 1.75A15.5 15.5 0 0 1 5 6.9c-.15-1.15.65-2.15 1.75-2.4Z",
    calendar:
      "M7.5 4.5v3m9-3v3M5.25 9.75h13.5M6 6.75h12a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V8.25A1.5 1.5 0 0 1 6 6.75Z",
    pin: "M12 21s6-5.25 6-10.5a6 6 0 1 0-12 0C6 15.75 12 21 12 21Zm0-8.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z",
    clock:
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13.5V12l3 1.75",
    spark:
      "M12 3.75 13.65 9 19 10.5l-5.35 1.5L12 17.25 10.35 12 5 10.5 10.35 9 12 3.75Z",
  };

  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/18 bg-white/10 text-amber-200 shadow-lg shadow-black/25 backdrop-blur-md">
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[type]} />
      </svg>
    </span>
  );
}

function FieldLabel({ icon, children }) {
  return (
    <span className="mb-2 flex items-center gap-2.5 text-base font-bold text-zinc-50 sm:text-lg">
      <FieldIcon type={icon} />
      {children}
    </span>
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

  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
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
    <main className="relative isolate min-h-screen overflow-x-hidden bg-zinc-950 px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,7,18,0.76),rgba(12,12,18,0.36)_48%,rgba(3,7,18,0.72)),radial-gradient(circle_at_42%_34%,rgba(245,158,11,0.18),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-zinc-950/80 to-transparent" />
      </div>

      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center py-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full rounded-3xl border border-white/20 bg-zinc-950/34 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7 lg:p-9"
        >
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-100">
                <CalendarIcon />
                Premium booking form
              </p>
              <h1 className="max-w-3xl text-3xl font-black leading-tight text-white drop-shadow-2xl sm:text-4xl lg:text-5xl">
                Form <span className="text-amber-400">24</span> For Your Time
                Travel <span className="text-amber-400">Watch</span>
              </h1>
            </div>

            <div className="min-w-40 rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-zinc-300">Form progress</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-2 text-right text-xs font-semibold text-amber-200">
                {completion}%
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {mainFields.map((field) => (
              <label key={field.id}>
                <FieldLabel icon={field.icon}>{field.label}</FieldLabel>
                <input
                  name={field.id}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  className="h-12 w-full rounded-2xl border border-white/20 bg-black/24 px-4 text-sm text-white outline-none transition placeholder:text-zinc-400/70 focus:border-amber-300/80 focus:bg-black/38 focus:shadow-[0_0_28px_rgba(245,158,11,0.18)]"
                />
                {errors[field.id] && (
                  <span className="mt-2 block text-sm font-medium text-rose-300">
                    {errors[field.id]}
                  </span>
                )}
              </label>
            ))}

            <div className="grid grid-cols-2 gap-3">
              {scheduleFields.map((field) => (
                <label key={field.id}>
                  <FieldLabel icon={field.icon}>{field.label}</FieldLabel>
                  <input
                    name={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="h-12 w-full rounded-2xl border border-white/20 bg-black/24 px-3 text-sm text-white outline-none transition placeholder:text-zinc-400/70 focus:border-amber-300/80 focus:bg-black/38 focus:shadow-[0_0_28px_rgba(245,158,11,0.18)]"
                  />
                  {errors[field.id] && (
                    <span className="mt-2 block text-xs font-medium text-rose-300">
                      {errors[field.id]}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <label className="mt-5 block">
            <FieldLabel icon="spark">What You Want to Do</FieldLabel>
            <textarea
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              placeholder="Write what you are going to do with the watch"
              rows="3"
              className="w-full resize-none rounded-2xl border border-white/20 bg-black/24 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-400/70 focus:border-amber-300/80 focus:bg-black/38 focus:shadow-[0_0_28px_rgba(245,158,11,0.18)]"
            />
            {errors.plan && (
              <span className="mt-2 block text-sm font-medium text-rose-300">
                {errors.plan}
              </span>
            )}
          </label>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                className="rounded-2xl bg-amber-400 px-7 py-3 text-sm font-black text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
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

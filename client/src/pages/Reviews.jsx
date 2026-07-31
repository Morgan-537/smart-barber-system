import React from "react";
import { Star, Quote } from "lucide-react";
import Card from "../components/Card";

const testimonials = [
  {
    name: "Brian Otieno",
    role: "Regular Customer",
    rating: 5,
    text: "The booking process is fast, simple, and reliable. I love that I get reminders before every appointment.",
  },
  {
    name: "Amina Wanjiku",
    role: "Customer",
    rating: 5,
    text: "SMARTBARBER makes it easy to choose a barber and pay securely. The whole experience feels professional.",
  },
  {
    name: "Kevin Mwangi",
    role: "Customer",
    rating: 5,
    text: "Clean design, easy navigation, and no stress when booking. It feels like a premium service.",
  },
  {
    name: "Grace Njeri",
    role: "Customer",
    rating: 5,
    text: "The reminder notifications saved me from missing my appointment. Everything works smoothly.",
  },
  {
    name: "John Kamau",
    role: "Customer",
    rating: 5,
    text: "I like how modern and organized the system feels. It is way better than calling in manually.",
  },
  {
    name: "Mercy Achieng",
    role: "Customer",
    rating: 5,
    text: "The whole interface is intuitive and friendly. Booking a haircut now takes less than a minute.",
  },
];

const Reviews = () => {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 px-10 py-20 text-center shadow-xl">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white">
          <Star size={16} className="fill-white text-white" />
          Customer Reviews
        </div>

        <h1 className="mt-8 text-5xl font-extrabold text-white">
          What Customers Are Saying
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-violet-100">
          Hear from people who use SMARTBARBER to book appointments, receive reminders,
          and enjoy a smooth grooming experience.
        </p>
      </section>

      <section>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-zinc-900">
            Trusted by Real Customers
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            A few words from people who have used the platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((review) => (
            <Card
              key={review.name}
              className="h-full transition duration-300 hover:-translate-y-2 hover:border-violet-400"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-violet-700">
                    {review.role}
                  </p>
                </div>

                <Quote className="text-amber-400" size={30} />
              </div>

              <div className="mt-5 flex items-center gap-1 text-amber-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-6 leading-8 text-zinc-600">
                “{review.text}”
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
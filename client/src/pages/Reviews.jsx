import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }

        const data = await response.json();

        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <Loader text="Loading reviews..." />;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl py-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Unable to load reviews
        </h2>

        <p className="mt-2 text-zinc-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Customer Reviews
      </h1>

      {reviews.length === 0 ? (
        <p className="text-zinc-400">
          No reviews have been published yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <Card
              key={review.id}
              title={`⭐ ${review.rating}/5`}
            >
              <p className="text-zinc-300">
                {review.comment}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;
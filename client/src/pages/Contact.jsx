import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect to backend API
    console.log(formData);

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="mx-auto max-w-xl py-12">
      <Card
        title="Contact Us"
        subtitle="Have a question or need assistance? We'd love to hear from you."
      >
        {success && (
          <div className="mb-4 rounded-lg border border-green-600 bg-green-900/20 p-3 text-sm text-green-400">
            Your message has been sent successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-zinc-300"
            >
              Message <span className="text-red-500">*</span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Contact;
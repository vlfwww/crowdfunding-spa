import { useState } from "react";
import { useNotification } from "./useNotification";

export const useContactForm = () => {
  const notify = useNotification();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    notify("Message sent successfully!");
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

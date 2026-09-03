import { useState } from "react";
import "./Contacts.css";

const Contacts = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
  };

  return (
    <div className="contactsPage">
      <div className="contactsHeader">
        <h1 className="contactsTitle">Get in Touch</h1>
        <p className="contactsSubtitle">
          Have questions about our agricultural plots or investment terms? We’re
          here to help.
        </p>
      </div>

      <div className="contactsContainer">
        <div className="contactsInfoCard">
          <p className="infoCardTitle">Contact Information</p>
          <p>
            Reach out to us through any of the channels below, or fill out the
            form.
          </p>

          <div className="contactDetailsList">
            <div className="contactItem">
              <span className="contactLabel">Office Address</span>
              <span className="contactValue">
                Independence Avenue 4, Minsk, Belarus
              </span>
            </div>
            <div className="contactItem">
              <span className="contactLabel">Email Us</span>
              <span className="contactValue">
                support@crowdfunding-farming.com
              </span>
            </div>
            <div className="contactItem">
              <span className="contactLabel">Phone</span>
              <span className="contactValue">+375 (29) 000-00-00</span>
            </div>
            <div className="contactItem">
              <span className="contactLabel">Working Hours</span>
              <span className="contactValue">Mon - Fri: 9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

        <div className="contactsFormWrapper">
          {isSubmitted ? (
            <div className="successMessageCard">
              <p className="thankYouMessage">Thank you, {formData.name}!</p>
              <p>
                Your message has been sent successfully. We will get back to you
                soon.
              </p>
              <button
                className="resetFormBtn"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    message: "",
                  });
                  setErrors({});
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contactsForm" noValidate>
              <p className="contactsFormTitle">Send us a Message</p>

              <div className="formContactsGroup">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? "inputError" : ""}
                />
                {errors.name && (
                  <span className="errorText">{errors.name}</span>
                )}
              </div>

              <div className="formContactsGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={errors.email ? "inputError" : ""}
                />
                {errors.email && (
                  <span className="errorText">{errors.email}</span>
                )}
              </div>

              <div className="formContactsGroup">
                <label>Message</label>
                <textarea
                  rows="4"
                  placeholder="Type your message here (min. 10 characters)..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={errors.message ? "inputError" : ""}
                />
                {errors.message && (
                  <span className="errorText">{errors.message}</span>
                )}
              </div>

              <button type="submit" className="submitContactBtn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;

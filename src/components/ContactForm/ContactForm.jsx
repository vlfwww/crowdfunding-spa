import "./ContactForm.css";

const ContactForm = ({
  formData,
  errors,
  isSubmitted,
  onChange,
  onSubmit,
  onReset,
}) => {
  if (isSubmitted) {
    return (
      <div className="successMessageCard">
        <p className="thankYouMessage">Thank you, {formData.name}!</p>
        <p>
          Your message has been sent successfully. We will get back to you soon.
        </p>
        <button className="resetFormBtn" onClick={onReset}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contactsForm" noValidate>
      <p className="contactsFormTitle">Send us a Message</p>

      <div className="formContactsGroup">
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={errors.name ? "inputError" : ""}
        />
        {errors.name && <span className="errorText">{errors.name}</span>}
      </div>

      <div className="formContactsGroup">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={errors.email ? "inputError" : ""}
        />
        {errors.email && <span className="errorText">{errors.email}</span>}
      </div>

      <div className="formContactsGroup">
        <label>Message</label>
        <textarea
          rows="4"
          placeholder="Type your message here (min. 10 characters)..."
          value={formData.message}
          onChange={(e) => onChange("message", e.target.value)}
          className={errors.message ? "inputError" : ""}
        />
        {errors.message && <span className="errorText">{errors.message}</span>}
      </div>

      <button type="submit" className="submitContactBtn">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

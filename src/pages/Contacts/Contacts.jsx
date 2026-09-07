import ContactInfoCard from "../../components/ContactInfoCard/ContactInfoCard";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useContactForm } from "../../hooks/useContactForm";
import "./Contacts.css";

const Contacts = () => {
  const {
    formData,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm();

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
        <ContactInfoCard />
        <div className="contactsFormWrapper">
          <ContactForm
            formData={formData}
            errors={errors}
            isSubmitted={isSubmitted}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;

import "./ContactInfoCard.css";

const ContactInfoCard = () => {
  return (
    <div className="contactsInfoCard">
      <p className="infoCardTitle">Contact Information</p>
      <p className="contactInfoDescription">
        Reach out to us through any of the channels below, or fill out the form.
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
          <span className="contactValue">support@crowdfunding-farming.com</span>
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
  );
};

export default ContactInfoCard;

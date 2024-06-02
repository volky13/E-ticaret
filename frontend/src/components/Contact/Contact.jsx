import "./Contact.css"

const Contacts = () => {
  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d290837.36053431674!2d28.70068094063074!3d40.97275646966997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5c3ff7c25bf%3A0xa639a0a7ad4e5919!2sBEYMEN!5e0!3m2!1str!2str!4v1716553290384!5m2!1str!2str"
            width="100%"
            height="500"
            style={{
              border: "0",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h2>Bizimle iletişime geç</h2>
          </div>
          <div className="contact-elements">
            <form className="contact-form">
              <div className="">
                <label>
                  İsim
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  E posta
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Mesaj
                  <span>*</span>
                </label>
                <textarea
                  id="author"
                  name="author"
                  type="text"
                  defaultValue=""
                  size="30"
                  required=""
                ></textarea>
              </div>
              <button className="btn btn-sm form-button">Mesajı gönder</button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong>Beymen</strong>
                  <p className="contact-street">
                  Ayazağa, Ayazağa Cendere Cd., 34485 Sarıyer/İstanbul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

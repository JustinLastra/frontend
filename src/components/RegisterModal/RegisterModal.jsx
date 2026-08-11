import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({ isOpen, onClose, onSubmit, onSwitchToLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      submitLabel="Sign up"
      linkText="or Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLinkClick={onSwitchToLogin}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

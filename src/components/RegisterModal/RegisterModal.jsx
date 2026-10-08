import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validation.js";

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  serverError = "",
}) {
  const [fieldErrors, setFieldErrors] = useState({});

  const handleClose = () => {
    setFieldErrors({});
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
    };

    setFieldErrors(nextErrors);

    if (nextErrors.email || nextErrors.password || nextErrors.name) {
      return;
    }

    onSubmit({
      email: email.trim(),
      password,
      name: name.trim(),
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      submitLabel="Sign up"
      linkText="or Sign in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onLinkClick={onSwitchToLogin}
      error={serverError}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
        />
        {fieldErrors.email && (
          <span className="modal__field-error">{fieldErrors.email}</span>
        )}
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Enter password"
          minLength={8}
        />
        {fieldErrors.password && (
          <span className="modal__field-error">{fieldErrors.password}</span>
        )}
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Enter your name"
          maxLength={30}
        />
        {fieldErrors.name && (
          <span className="modal__field-error">{fieldErrors.name}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

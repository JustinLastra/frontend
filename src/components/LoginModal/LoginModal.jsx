import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { validateEmail, validatePassword } from "../../utils/validation.js";

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToRegister,
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

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password, { minLength: 1 }),
    };

    setFieldErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    onSubmit({
      email: email.trim(),
      password,
    });
  };

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      submitLabel="Sign in"
      linkText="or Sign up"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onLinkClick={onSwitchToRegister}
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
        />
        {fieldErrors.password && (
          <span className="modal__field-error">{fieldErrors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;

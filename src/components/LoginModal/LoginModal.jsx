import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ModalWithForm
      title=""
      name="login"
      submitLabel=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="email" name="email" required />
      <input type="password" name="password" required />
    </ModalWithForm>
  );
}

export default LoginModal;

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({ isOpen, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ModalWithForm
      title=""
      name="register"
      submitLabel=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <input type="text" name="name" required />
    </ModalWithForm>
  );
}

export default RegisterModal;

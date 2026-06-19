import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onMouseDown={handleOverlayClick}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {submitLabel ?? "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

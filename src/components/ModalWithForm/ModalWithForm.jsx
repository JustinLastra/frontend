import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  linkText,
  onLinkClick,
  children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {submitLabel ?? "Submit"}
          </button>
          {linkText && (
            <button
              type="button"
              className="modal__link"
              onClick={onLinkClick}
            >
              {linkText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

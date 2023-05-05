import { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import BackDrop from "./Backdrop";
import "./Modal.css";

const Modal = (props) => {
  const nodeRef = useRef();

  const content = (
    <Fragment>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <div ref={nodeRef} className="modal">
          <header className="modal__header">
            <h2>{props.header}</h2>
          </header>
          <div className="modal__content">{props.children}</div>
          <footer className="modal__footer">
            <button className="button--primary" onClick={props.onCancel}>
              {props.isError ? "OKAY" : "CANCEL"}
            </button>
            {!props.isError && (
              <button className="button--danger" onClick={props.onConfirm}>
                DELETE
              </button>
            )}
          </footer>
        </div>
      </CSSTransition>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;

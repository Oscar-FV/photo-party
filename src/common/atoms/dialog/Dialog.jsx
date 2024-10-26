import React from "react";

const Dialog = ({ id, children }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box aspect-square relative h-[70svh]">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Dialog;

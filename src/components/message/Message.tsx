import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Message = ({ title, message, display }: { title: string; message: string; display: boolean }) => (
  <ToastContainer position="top-end">
    <Toast animation show={display}>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default Message;

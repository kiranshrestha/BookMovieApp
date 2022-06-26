import Modal from "../../screens/UI/Modal";
import "./Header.css";
import BasicTabs from "./BasicTabs";

const LoginRegistrationModel = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <BasicTabs />
    </Modal>
  );
};

export default LoginRegistrationModel;

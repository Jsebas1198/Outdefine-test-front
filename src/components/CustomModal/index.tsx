import { Modal } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import { IProps } from "./IProps";

const CustomModal = ({ show, onHide, onConfirm, title, message }: IProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <CustomButton
          type={"button"}
          className={"btn btn-secondary"}
          label={"OK"}
          handleClick={onConfirm}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

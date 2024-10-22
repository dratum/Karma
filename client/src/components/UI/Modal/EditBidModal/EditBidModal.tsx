import Modal from "react-modal";
import { FormEvent, useState } from "react";
import "./styles.css";
import { useAppDispatch } from "../../../../../hooks/redux.ts";
import { editUserBid } from "../../../../../features/bidsUserSlice.ts";

interface EditBidModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  bid: {
    id: number;
    title: string;
    description: string;
    address: string;
  };
}

export default function EditBidModal({
  isOpen,
  onRequestClose,
  bid,
}: EditBidModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(bid.title);
  const [description, setDescription] = useState(bid.description);
  const [address, setAddress] = useState(bid.address);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(editUserBid({ id: bid.id, title, description, address }));
    onRequestClose();
  };
  return (
    <Modal
      className={`ModalContent ${!isOpen ? "hide" : ""}`}
      overlayClassName={`ModalOverlay ${isOpen ? "show" : ""}`}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <form
        className={
          "drop-shadow-md flex flex-col bg-opacity-80 bg-gray-200 p-6 w-96 rounded-xl gap-2 m-8 "
        }
        onSubmit={handleSubmit}
      >
        <div className='flex justify-center'>
          <h2 className='text-xl font-medium'>Редактировать Вашу заявку</h2>
        </div>
        <label className='font-light' htmlFor={"title"}>
          Название:
        </label>
        <input
          className={
            "p-2 rounded-xl outline-lime-600 shadow-sm  border border-gray-200"
          }
          id={"title"}
          autoFocus={true}
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='font-light' htmlFor={"description"}>
          Описание:
        </label>
        <textarea
          className={
            "p-2 rounded-xl outline-lime-600 shadow-sm  border border-gray-200"
          }
          id={"description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='font-light' htmlFor={"address"}>
          Адрес:
        </label>
        <input
          className={
            "p-2 rounded-xl shadow-sm outline-lime-600 border border-gray-200"
          }
          id={"address"}
          type={"text"}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type='submit'
          className={
            "transition duration-300 mt-3 rounded-md" +
            " shadow-sm border-lime-600 text-white" +
            " hover:border-lime-600 bg-lime-600 "
          }
        >
          Сохранить
        </button>
        <button
          type='button'
          className={
            "transition duration-300 mt-3 rounded-md" +
            " shadow-sm border-lime-500 hover:bg-lime-500 hover:text-white" +
            " hover:border-lime-500 bg-white text-lime-500"
          }
          onClick={onRequestClose}
        >
          Отмена
        </button>
      </form>
    </Modal>
  );
}

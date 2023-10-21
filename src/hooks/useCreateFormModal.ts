import { useAppDispatch, useAppSelector } from '@redux/hook';
import {
  setCloseCreatedFormModal,
  setOpenCreatedFormModal,
} from '@redux/schedule/reducer';
import { selectorSchedule } from '@redux/schedule/selector';

const useCreateFormModal = () => {
  const { isOpenCreatedFormModal } = useAppSelector(selectorSchedule);
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(setOpenCreatedFormModal());
  };

  const onClose = () => {
    dispatch(setCloseCreatedFormModal());
  };

  return {
    onOpen,
    onClose,
    isOpenCreatedFormModal,
  };
};

export default useCreateFormModal;

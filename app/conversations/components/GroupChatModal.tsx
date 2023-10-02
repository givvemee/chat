'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import Select from '@/app/components/input/Select';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Modal from '../../components/Modal';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}
const GroupChatModal: React.FC<GroupChatModalProps> = ({
  onClose,
  users,
  isOpen,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              그룹 대화 생성하기
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              2명 이상의 상대와 그룹 대화방을 생성해 보세요.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="name"
                id="name"
                disabled={isLoading}
                errors={errors}
                required
              />
              <Select
                disabled={isLoading}
                label="그룹 대화"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            취소
          </Button>
          <Button disabled={isLoading} type="submit">
            대화 생성
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;

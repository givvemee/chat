'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Dialog, Transition } from '@headlessui/react';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import { Fragment, useMemo } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';

interface PropfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
const ProfileDrawer: React.FC<PropfileDrawerProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} 명의 대화 상대`;
    }
    return '접속 중';
  }, [data]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transfrom transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">닫기</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <Avatar user={otherUser} />
                        </div>
                        <div>{title}</div>
                        <div className="text-sm text-gray-500">
                          {statusText}
                        </div>
                        <div className="flex gap-10 my-8">
                          <div
                            onClick={() => {}}
                            className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                          >
                            <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                              <IoTrash size={20} />
                            </div>
                            <div className="text-sm font-light text-neutral-600">
                              대화 삭제하기
                            </div>
                          </div>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {!data.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                  이메일
                                </dt>
                                <dd className="mt-1 text-sm text-gay-900 sm:col-span-2">
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-gray-800 sm:w-40 sm:flex-shrink-0">
                                    가입 일자
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileDrawer;

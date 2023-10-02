'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
  src?: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, isOpen, src }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="이미지" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;

import { useEffect, useState } from 'react';

import Icons from '../Icons';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const [isShown, setIsShown] = useState(isOpen);

	useEffect(() => {
		setIsShown(isOpen);
	}, [isOpen]);

	const handleClose = () => {
		setIsShown(false);
		onClose();
	};

	return (
		<>
			{isShown ? (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex min-h-screen items-center justify-center px-4">
						<div
							className="bg-/50 fixed inset-0 bg-gray-500 transition-opacity duration-300 ease-in-out dark:bg-gray-900"
							onClick={handleClose}
						/>
						<div className="relative z-50 mx-auto w-full max-w-lg rounded-md bg-white p-6 shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-800">
							{children}
							<button
								type="button"
								className="absolute top-0 right-0 px-4 py-2 text-gray-500 dark:text-gray-400"
								onClick={handleClose}
							>
								<Icons.X className="h-6 w-6 fill-current" />
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Modal;

import { useEffect, useCallback } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
			onClose();
		}
	}, [onClose, rootRef]);

	const handleEscape = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleEscape, handleClickOutside]);
}

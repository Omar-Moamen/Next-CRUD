"use client";

import { type ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode })
{
   const router = useRouter();
   const dialogRef = useRef<ElementRef<'dialog'>>(null);

   // useEffect(() =>
   // {
   //    if (!dialogRef.current?.open)
   //    {
   //       dialogRef.current?.showModal();
   //    }
   // }, []);

   const onCloseHandler = () => router.back();

   return createPortal(
      <div className="modal-backdrop">
         <dialog ref={dialogRef} className="modal" onClose={onCloseHandler}>
            {children}
            <button className="close-button" onClick={onCloseHandler} />
         </dialog>
      </div>,
      document.getElementById('modal-root')!
   )
}

import Image from "next/image";

export default function DeleteModal({open, setOpen}) {
    return (
        open && 
        <div className="delete-modal">
        <div className="delete-modal__inner">
            <div className="delete-modal__inner__title-group">
                <div>Delete community?</div>
                
                          <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/close.svg"}
                            onClick={() => setOpen(false)}
                            className="pointer"
                          />
            </div>

            <div className="delete-modal__inner__subtitle">
            This can’t be undone
            </div>

            <div className="delete-modal__inner__button-group">
                <button>Cancel</button>
                <button
                onClick={() => setOpen(false)}
                >Delete</button>
            </div>
        </div>
        </div>
    )
}
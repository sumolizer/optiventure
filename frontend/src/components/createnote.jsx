import { motion } from "framer-motion";
function CreateNoteModal({ onClose, kind }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className=""
      >
        <div className="create ">
          <div className="flex justify-between items-center mb-4">
            <h1 className="  text-2xl align-middle">Create a {kind}</h1>
            <button
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          <textarea
            placeholder="Write something here"
            rows={5}
            cols={16}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          ></textarea>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onClose} className="btnsign">
              Save {kind}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateNoteModal;

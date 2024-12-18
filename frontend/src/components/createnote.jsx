function CreateNoteModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="create">
        <div className="flex justify-between items-center mb-4">
          <h1 className="  text-2xl align-middle">Create a Note</h1>
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
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNoteModal;

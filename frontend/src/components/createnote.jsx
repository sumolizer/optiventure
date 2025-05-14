import { useState } from "react";
import { motion } from "framer-motion";

// let it need a title a body a kind
function CreateNoteModal({
  onClose,
  onSave,
  title,
  body,
  kind,
  value,
  categories,
}) {
  const [noteText, setNoteText] = useState(value || ""); // Local state to hold the note text
  const [category, setCategory] = useState("Food & Dining"); // Default category

  const handleSave = () => {
    if (!noteText.trim()) {
      alert("Note cannot be empty!");
      return;
    }
    onSave(noteText, category);
    setNoteText("");
    setCategory("Food & Dining");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className=""
      >
        <div className="create">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl align-middle optifont">{title}</h1>
            <button
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {categories && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 optifont">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          <textarea
            placeholder={body}
            rows={6}
            cols={55}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          ></textarea>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={handleSave} className="nv-active">
              Save {kind}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateNoteModal;

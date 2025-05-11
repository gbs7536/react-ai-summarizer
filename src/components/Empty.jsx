import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../store/notesSlice";

const Empty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    const id = uuidv4();
    const newNote = {
      id,
      title: "새로운 노트",
      content: "",
      time: Date.now(),
      summary: "",
    };
    dispatch(addNote(newNote));
    navigate(`/notes/${id}`);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900">
      <div className="text-5xl mb-6">
        <span>🎤</span>
      </div>
      <p className="text-xl mb-4">노트를 만들어보세요</p>
      <button
        onClick={handleClick}
        className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded"
      >
        노트 작성
      </button>
    </div>
  );
};

export default Empty;
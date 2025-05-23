import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "../store/notesSlice";
import { fetchOpenAI } from "../api";
import { format } from "date-fns";

const NoteDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === params.id)
  );
  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    dispatch(
      updateNote({
        ...note,
        title: e.target.value,
      })
    );
  };

  const handleChangeContent = (e) => {
    dispatch(
      updateNote({
        ...note,
        content: e.target.value,
      })
    );
  };

  const handleDelete = () => {
    navigate("/");
    dispatch(deleteNote(params.id));
  };

  const handleSubmit = async () => {
    try {
      const data = await fetchOpenAI(note.content);
      dispatch(
        updateNote({
          ...note,
          summary: data.choices[0].message.content,
        })
      );
    } catch (error) {
      console.error("요약 실패:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <time className="block text-gray-400 text-sm">
            {format(note.time, "yyyy MM dd HH:mm")}
          </time>
          <input
            data-testid="title"
            type="text"
            className="bg-transparent text-2xl font-bold focus-within:outline-blue-500"
            value={note.title}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 py-2 px-4 rounded"
          >
            삭제
          </button>
        </div>
      </div>
      <section className="flex">
        <div className="flex-1 p-4 rounded mr-4 bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">메모</h2>
          <textarea
            data-testid="content"
            value={note.content}
            onChange={handleChangeContent}
            className="bg-gray-700 w-full h-64 p-2 rounded resize-none focus:(ring-2 ring-blue-500)"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded"
          >
            요약
          </button>
        </div>
        <div className="flex-1 p-4 rounded bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">요약 결과</h3>
          <div className="text-gray-300 h-64 bg-gray-700 p-2 rounded">
            {note.summary}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoteDetail;

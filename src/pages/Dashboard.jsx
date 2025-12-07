import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import dayjs from "dayjs";

function Dashboard() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [minutes, setMinutes] = useState("");
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  const [editId, setEditId] = useState(null); // ✅ EDIT MODE

  const userId = auth.currentUser?.uid;

  const fetchActivities = async () => {
    if (!userId) return;
    const ref = collection(db, "users", userId, "days", date, "activities");
    const snap = await getDocs(ref);

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setActivities(data);
  };

  useEffect(() => {
    const sum = activities.reduce((acc, cur) => acc + Number(cur.minutes), 0);
    setTotal(sum);
  }, [activities]);

  useEffect(() => {
    if (userId && date) fetchActivities();
  }, [userId, date]);

  // ✅ ADD or UPDATE ACTIVITY
  const addOrUpdateActivity = async () => {
    if (!title || !minutes) return alert("Fill all fields");

    const newTotal = editId
      ? total - activities.find(a => a.id === editId).minutes + Number(minutes)
      : total + Number(minutes);

    if (newTotal > 1440) {
      return alert("Total daily time cannot exceed 1440 minutes");
    }

    if (editId) {
      // ✅ UPDATE
      await updateDoc(
        doc(db, "users", userId, "days", date, "activities", editId),
        { title, category, minutes: Number(minutes) }
      );
      setEditId(null);
    } else {
      // ✅ ADD
      await addDoc(
        collection(db, "users", userId, "days", date, "activities"),
        { title, category, minutes: Number(minutes) }
      );
    }

    setTitle("");
    setMinutes("");
    fetchActivities();
  };

  // ✅ DELETE
  const deleteActivity = async (id) => {
    await deleteDoc(doc(db, "users", userId, "days", date, "activities", id));
    fetchActivities();
  };

  // ✅ EDIT (LOAD INTO FORM)
  const startEdit = (activity) => {
    setEditId(activity.id);
    setTitle(activity.title);
    setCategory(activity.category);
    setMinutes(activity.minutes);
  };

  // ✅ LOGOUT
  const logoutUser = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
  <div className="container">
    <button onClick={logoutUser} className="logout-btn">Logout</button>

    <h1>Daily Activity Logger</h1>

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

   <h3>Remaining Minutes: {Math.max(1440 - total, 0)}</h3>


    <input
      placeholder="Activity Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option>Work</option>
      <option>Study</option>
      <option>Sleep</option>
      <option>Entertainment</option>
      <option>Exercise</option>
    </select>

    <input
      type="number"
      placeholder="Minutes"
      value={minutes}
      onChange={(e) => setMinutes(e.target.value)}
    />

    <button onClick={addOrUpdateActivity} className="primary-btn">
      {editId ? "Update" : "Add"}
    </button>

    <ul>
      {activities.map((a) => (
        <li key={a.id} className="task">
          {a.title} ({a.category}) - {a.minutes} min
          <div>
            <button onClick={() => startEdit(a)} className="edit-btn">✏️</button>
            <button onClick={() => deleteActivity(a.id)} className="delete-btn">❌</button>
          </div>
        </li>
      ))}
    </ul>

    <h2>Total Minutes: {total}</h2>

    <button
  disabled={total < 1440}
  onClick={() => {
    if (total >= 1440) {
      window.location.href = `/analytics?date=${date}`;
    }
  }}
  className={`analyse-btn ${total < 1440 ? "analyse-disabled" : ""}`}
>
  Analyse
</button>

{total < 1440 && (
  <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
  </p>
)}



    {total !== 1440 && (
      <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
        Complete 1440 minutes to enable analysis
      </p>
    )}
  </div>
);

}

export default Dashboard;

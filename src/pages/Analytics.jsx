import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

function Analytics() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const date = searchParams.get("date");

  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ FIX

  // ✅ ENSURE USER IS READY
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        setUserId(user.uid);
      }
    });

    return () => unsub();
  }, [navigate]);

  // ✅ FETCH DATA ONLY AFTER USER + DATE
  useEffect(() => {
    if (!userId || !date) return;

    const fetchData = async () => {
      setLoading(true);

      const ref = collection(db, "users", userId, "days", date, "activities");
      const snap = await getDocs(ref);

      const data = snap.docs.map(doc => doc.data());
      setActivities(data);

      setLoading(false); // ✅ DATA READY
    };

    fetchData();
  }, [userId, date]);

  // ✅ BUILD SUMMARY AFTER DATA LOADS
  useEffect(() => {
    const result = {};
    activities.forEach(a => {
      result[a.category] = (result[a.category] || 0) + a.minutes;
    });
    setSummary(result);
  }, [activities]);

  const pieData = Object.keys(summary).map(key => ({
    name: key,
    value: summary[key]
  }));

  const total = activities.reduce((acc, cur) => acc + cur.minutes, 0);

  // ✅ LOADING UI (IMPORTANT FIX)
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  // ✅ NO DATA UI (ONLY AFTER LOADING)
  if (activities.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>No Data Available 📭</h1>
        <p>Start logging your day now</p>
        <button onClick={() => navigate("/dashboard")}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Analytics for {date}</h1>

      {/* ✅ THESE NOW ALWAYS SHOW CORRECTLY */}
      <h3>Total Minutes: {total}</h3>
      <h3>Total Hours: {(total / 60).toFixed(2)}</h3>
      <h3>Number of Activities: {activities.length}</h3>

      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        
        {/* PIE CHART */}
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][i % 4]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* BAR CHART */}
        <BarChart width={400} height={300} data={activities}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="minutes" fill="#8884d8" />
        </BarChart>

      </div>
    </div>
  );
}

export default Analytics;

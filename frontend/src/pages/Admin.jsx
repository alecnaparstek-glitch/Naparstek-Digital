import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Monogram } from "@/components/Monogram";
import {
  ArrowUpRight,
  Trash2,
  Mail,
  LogOut,
  RefreshCw,
  Circle,
  CheckCircle2,
  Inbox,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "nd_admin_token";

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` });

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      toast.success(`Welcome back, ${data.name || "Admin"}.`);
      onLogin();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" data-testid="admin-login">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-10">
          <Monogram className="h-8 w-8 text-[#F5F5F5]" strokeWidth={4} />
          <span className="font-heading text-sm font-medium tracking-[0.28em] uppercase">Naparstek Digital</span>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Private</p>
        <h1 className="mt-3 font-heading text-4xl font-medium tracking-tighter">Inquiry Inbox</h1>
        <p className="mt-3 text-sm text-[#9A9A9A]">Sign in to read and manage every project inquiry.</p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="admin-email"
              className="w-full bg-transparent border-b border-white/15 py-3 text-base text-[#F5F5F5] focus:outline-none focus:border-[#F5F5F5] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#9A9A9A] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-testid="admin-password"
              className="w-full bg-transparent border-b border-white/15 py-3 text-base text-[#F5F5F5] focus:outline-none focus:border-[#F5F5F5] transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"} <ArrowUpRight size={16} />
          </button>
        </form>

        <Link to="/" className="mt-10 inline-block text-xs uppercase tracking-[0.14em] text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
          ← Back to site
        </Link>
      </div>
    </div>
  );
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
};

const Inbox_ = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/admin/inquiries`, { headers: authHeaders() });
      setItems(data);
    } catch (err) {
      if (err.response?.status === 401) {
        onLogout();
      } else {
        toast.error("Could not load inquiries.");
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (item) => {
    try {
      const { data } = await axios.patch(
        `${API}/admin/inquiries/${item.id}`,
        { read: !item.read },
        { headers: authHeaders() }
      );
      setItems((prev) => prev.map((x) => (x.id === item.id ? data : x)));
    } catch {
      toast.error("Update failed.");
    }
  };

  const remove = async (item) => {
    try {
      await axios.delete(`${API}/admin/inquiries/${item.id}`, { headers: authHeaders() });
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      toast.success("Inquiry deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const unread = items.filter((x) => !x.read).length;

  return (
    <div className="min-h-screen" data-testid="admin-inbox">
      <header className="sticky top-0 z-10 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Monogram className="h-7 w-7 text-[#F5F5F5]" strokeWidth={4} />
            <span className="hidden sm:block font-heading text-sm font-medium tracking-[0.28em] uppercase">
              Naparstek <span className="text-[#9A9A9A]">Inbox</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              data-testid="admin-refresh"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#F5F5F5] hover:bg-white/5 transition-colors"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={onLogout}
              data-testid="admin-logout"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#F5F5F5] hover:bg-white/5 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A9A9A]">Project Inquiries</p>
            <h1 className="mt-3 font-heading text-4xl md:text-5xl font-medium tracking-tighter">
              {items.length} total <span className="text-[#9A9A9A]">· {unread} unread</span>
            </h1>
          </div>
        </div>

        {loading ? (
          <p className="text-[#9A9A9A]">Loading…</p>
        ) : items.length === 0 ? (
          <div className="border border-white/10 rounded-xl p-16 text-center" data-testid="admin-empty">
            <Inbox className="mx-auto mb-4 text-[#9A9A9A]" size={32} />
            <p className="font-heading text-xl font-medium">No inquiries yet.</p>
            <p className="mt-2 text-sm text-[#9A9A9A]">New project inquiries will show up here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                data-testid={`admin-inquiry-${item.id}`}
                className={`rounded-xl border p-6 md:p-7 transition-colors ${
                  item.read ? "border-white/10 bg-transparent" : "border-white/20 bg-[#111111]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      {!item.read && <span className="h-2 w-2 rounded-full bg-white" />}
                      <h2 className="font-heading text-2xl font-medium tracking-tight">{item.name}</h2>
                    </div>
                    {item.business_name && (
                      <p className="mt-1 text-sm text-[#9A9A9A]">{item.business_name}</p>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#9A9A9A]">{formatDate(item.created_at)}</p>
                </div>

                <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 text-sm">
                  <p className="text-[#9A9A9A]">Email: <span className="text-[#F5F5F5]">{item.email}</span></p>
                  {item.phone && <p className="text-[#9A9A9A]">Phone: <span className="text-[#F5F5F5]">{item.phone}</span></p>}
                  {item.current_website && (
                    <p className="text-[#9A9A9A]">Website: <span className="text-[#F5F5F5]">{item.current_website}</span></p>
                  )}
                  {item.need && <p className="text-[#9A9A9A]">Needs: <span className="text-[#F5F5F5]">{item.need}</span></p>}
                  {item.budget && <p className="text-[#9A9A9A]">Budget: <span className="text-[#F5F5F5]">{item.budget}</span></p>}
                </div>

                {item.message && (
                  <p className="mt-5 border-t border-white/10 pt-5 text-[15px] leading-relaxed text-[#D9D9D9]">
                    {item.message}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${item.email}?subject=Re: your project inquiry`}
                    data-testid={`admin-reply-${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-medium text-[#0A0A0A] transition-colors hover:bg-white/90"
                  >
                    <Mail size={14} /> Reply
                  </a>
                  <button
                    onClick={() => toggleRead(item)}
                    data-testid={`admin-toggle-read-${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-[#F5F5F5] hover:bg-white/5 transition-colors"
                  >
                    {item.read ? <Circle size={14} /> : <CheckCircle2 size={14} />}
                    {item.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => remove(item)}
                    data-testid={`admin-delete-${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-[#9A9A9A] hover:text-[#F5F5F5] hover:border-white/30 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState(!!localStorage.getItem(TOKEN_KEY));

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
  };

  return authed ? <Inbox_ onLogout={logout} /> : <Login onLogin={() => setAuthed(true)} />;
};

export default Admin;

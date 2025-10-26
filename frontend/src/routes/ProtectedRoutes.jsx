import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

export default function ProtectedRoute({ allow = [], Fallback = null, children }) {
  const [state, setState] = useState({ loading: true, ok: false });

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await apiFetch('/users/me');
      if (!res.ok) return active && setState({ loading: false, ok: false });
      const me = await res.json();
      const ok = allow.length === 0 || (me?.role && allow.includes(me.role));
      if (active) setState({ loading: false, ok });
    })();
    return () => { active = false; };
  }, [allow.join(',')]);

  if (state.loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!state.ok) return Fallback ? <Fallback /> : <div style={{ padding: 24 }}>Not authorized</div>;
  return children;
}

type Role = 'user' | 'assistant';
interface Message {
  role: Role;
  content: string;
}

const STORE = 'chat';

export function mount(root: HTMLElement) {
  const toggle = root.querySelector<HTMLButtonElement>('[data-chat-toggle]')!;
  const panel = root.querySelector<HTMLElement>('[data-chat-panel]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-chat-close]')!;
  const log = root.querySelector<HTMLElement>('[data-chat-log]')!;
  const form = root.querySelector<HTMLFormElement>('form')!;
  const input = form.querySelector<HTMLTextAreaElement>('textarea')!;
  const send = form.querySelector<HTMLButtonElement>('button')!;
  const lang = root.dataset.lang;
  const text = {
    error: root.dataset.error ?? '',
    limit: root.dataset.limit ?? '',
    you: root.dataset.you ?? '',
    assistant: root.dataset.assistant ?? '',
  };

  let messages: Message[] = [];
  let open = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE) ?? 'null');
    if (saved && Array.isArray(saved.messages)) {
      messages = saved.messages;
      open = saved.open === true;
    }
  } catch {}

  const save = () => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ messages, open }));
    } catch {}
  };

  const scroll = () => {
    log.scrollTop = log.scrollHeight;
  };

  const bubble = (role: Role, content = '') => {
    const p = document.createElement('p');
    p.className = `msg ${role}`;
    const label = document.createElement('span');
    label.className = 'who';
    label.textContent = role === 'user' ? text.you : text.assistant;
    p.append(label, document.createTextNode(content));
    log.append(p);
    scroll();
    return p;
  };

  const setOpen = (next: boolean) => {
    open = next;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    save();
    if (open) {
      scroll();
      input.focus();
    }
  };

  const setBusy = (busy: boolean) => {
    input.disabled = busy;
    send.disabled = busy;
    root.classList.toggle('is-busy', busy);
  };

  const ask = async (content: string) => {
    messages.push({ role: 'user', content });
    bubble('user', content);
    save();
    setBusy(true);
    const reply = bubble('assistant');
    reply.classList.add('pending');
    const node = reply.lastChild as Text;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, messages }),
      });
      if (!res.ok || !res.body) {
        node.data = res.status === 429 ? text.limit : text.error;
        messages.pop();
        save();
        return;
      }
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        reply.classList.remove('pending');
        node.data += value;
        scroll();
      }
      if (node.data) {
        messages.push({ role: 'assistant', content: node.data });
      } else {
        node.data = text.error;
        messages.pop();
      }
      save();
    } catch {
      node.data = text.error;
      messages.pop();
      save();
    } finally {
      reply.classList.remove('pending');
      setBusy(false);
      if (open) input.focus();
    }
  };

  for (const m of messages) bubble(m.role, m.content);
  setOpen(open);

  toggle.addEventListener('click', () => setOpen(!open));
  close.addEventListener('click', () => {
    setOpen(false);
    toggle.focus();
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value.trim().slice(0, Number(input.maxLength) || 1000);
    if (!content || input.disabled) return;
    input.value = '';
    void ask(content);
  });
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  answerSiteQuestion,
  suggestedAssistantQuestions,
} from "@/lib/siteAssistant";
import styles from "./SiteAssistant.module.css";

interface Message {
  id: number;
  from: "visitor" | "assistant";
  text: string;
}

const initialMessage: Message = {
  id: 0,
  from: "assistant",
  text: "I can answer questions from a fixed set of service details. This helper runs in your browser; messages are not sent to an AI service.",
};

export default function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const closeAssistant = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const ask = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setMessages((current) => {
      const nextMessages: Message[] = [
        ...current,
        { id: nextMessageId.current++, from: "visitor", text: trimmed },
        {
          id: nextMessageId.current++,
          from: "assistant",
          text: answerSiteQuestion(trimmed),
        },
      ];
      return nextMessages.slice(-21);
    });
    setQuestion("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <aside className={styles.widget} aria-label="Automated site FAQ assistant">
      {open && (
        <section
          id="site-assistant-panel"
          className={styles.panel}
          role="dialog"
          aria-labelledby="site-assistant-heading"
          aria-modal="false"
        >
          <header className={styles.panelHeader}>
            <div>
              <h2 id="site-assistant-heading" className={styles.panelTitle}>
                Site assistant
              </h2>
              <p className={styles.panelNote}>Automated answers from this site</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeAssistant}
              aria-label="Close site assistant"
            >
              ×
            </button>
          </header>

          <div className={styles.messages} role="log" aria-live="polite">
            {messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.from === "assistant"
                    ? styles.assistantMessage
                    : styles.visitorMessage
                }
              >
                {message.text}
              </p>
            ))}
          </div>

          <div className={styles.quickQuestions} aria-label="Suggested questions">
            {suggestedAssistantQuestions.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.quickQuestion}
                onClick={() => ask(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <form className={styles.questionForm} onSubmit={handleSubmit}>
            <label className={styles.visuallyHidden} htmlFor="site-assistant-question">
              Ask a question about the service
            </label>
            <input
              ref={inputRef}
              id="site-assistant-question"
              className={styles.questionInput}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about the sprint"
              autoComplete="off"
            />
            <button className={styles.sendButton} type="submit" disabled={!question.trim()}>
              Send
            </button>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-controls={open ? "site-assistant-panel" : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close help" : "Ask a question"}
      </button>
    </aside>
  );
}

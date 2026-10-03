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
  action?: "use-brief";
}

interface ProjectBrief {
  sourceLink: string;
  targetAudience: string;
  contentGoal: string;
}

type BriefStep = keyof ProjectBrief | null;

const initialMessage: Message = {
  id: 0,
  from: "assistant",
  text: "I can explain the sprint or help shape a project brief. What would you like to do?",
};

export default function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [briefStep, setBriefStep] = useState<BriefStep>(null);
  const [brief, setBrief] = useState<ProjectBrief>({
    sourceLink: "",
    targetAudience: "",
    contentGoal: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const closeAssistant = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  const appendAssistantMessage = (text: string, action?: Message["action"]) => {
    const assistantMessage: Message = {
      id: nextMessageId.current++,
      from: "assistant",
      text,
      action,
    };
    setMessages((current) => [...current, assistantMessage].slice(-30));
  };

  const startBrief = () => {
    setBrief({ sourceLink: "", targetAudience: "", contentGoal: "" });
    setBriefStep("sourceLink");
    appendAssistantMessage("Let’s make a quick project brief. First, paste the public link to the podcast, talk, interview, or other source you want to work from.");
    inputRef.current?.focus();
  };

  const ask = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const visitorMessage: Message = {
      id: nextMessageId.current++,
      from: "visitor",
      text: trimmed,
    };
    setMessages((current) => [...current, visitorMessage].slice(-30));
    setQuestion("");

    if (briefStep === "sourceLink") {
      const nextBrief = { ...brief, sourceLink: trimmed };
      setBrief(nextBrief);
      setBriefStep("targetAudience");
      appendAssistantMessage("Who do you want this content to reach? Be as specific as you can, for example: first-time SaaS founders hiring their first sales lead.");
      return;
    }

    if (briefStep === "targetAudience") {
      const nextBrief = { ...brief, targetAudience: trimmed };
      setBrief(nextBrief);
      setBriefStep("contentGoal");
      appendAssistantMessage("What should that audience understand, reconsider, or be able to do after reading it?");
      return;
    }

    if (briefStep === "contentGoal") {
      setBrief({ ...brief, contentGoal: trimmed });
      setBriefStep(null);
      appendAssistantMessage("Your first-pass brief is ready. I can carry these details into the project request form for you.", "use-brief");
      return;
    }

    appendAssistantMessage(answerSiteQuestion(trimmed));
  };

  const useBrief = () => {
    window.dispatchEvent(new CustomEvent<ProjectBrief>("mara:request-brief", { detail: brief }));
    setOpen(false);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <aside className={styles.widget} aria-label="Mara project guide">
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
                Mara guide
              </h2>
              <p className={styles.panelNote}>Instant site guide · Brief builder</p>
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

          <div className={styles.messages} role="log" aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "assistant"
                    ? styles.assistantMessage
                    : styles.visitorMessage
                }
              >
                <p>{message.text}</p>
                {message.action === "use-brief" && (
                  <button type="button" className={styles.briefAction} onClick={useBrief}>
                    Fill request form <span aria-hidden="true">↗</span>
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className={styles.quickQuestions} aria-label="Suggested questions">
              {suggestedAssistantQuestions.map((item) => (
                <button key={item} type="button" className={styles.quickQuestion} onClick={() => ask(item)}>
                  {item}
                </button>
              ))}
              <button type="button" className={styles.startBrief} onClick={startBrief}>
                Build my project brief <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

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
              placeholder={briefStep ? "Type your answer…" : "Ask about the sprint…"}
              maxLength={1200}
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
        {open ? "Close guide" : "Open project guide"}
      </button>
    </aside>
  );
}

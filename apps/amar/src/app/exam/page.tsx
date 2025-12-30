"use client";

import { useState } from "react";
import { Button, Input } from "@intern-3a/shadcn";
import { ExamQuestion, GenerateExamRequest, GenerateExamResponse } from "../../types";


export default function ExamPage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] =
    useState<GenerateExamRequest["difficulty"]>("Easy");

  async function generate(): Promise<void> {
    const payload: GenerateExamRequest = {
      subject,
      topic,
      difficulty,
    };

    const res = await fetch("/api/exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: GenerateExamResponse = await res.json();

    setQuestions(data.questions);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrent(0);
  }

  function selectAnswer(questionId: string, optionIndex: number) {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }

  function submitExam() {
    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  }

  const q = questions[current];
  const selected = q ? answers[q.id] : undefined;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Exam & Analysis</h1>

      {/* Generator */}
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value as GenerateExamRequest["difficulty"]
            )
          }
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <Button onClick={generate}>Generate Exam</Button>

      {/* Exam */}
      {q && (
        <div className="p-6 space-y-4 bg-white border rounded-lg">
          <div className="font-medium">
            Question {current + 1} / {questions.length}
          </div>

          <div>{q.question}</div>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = q.correctAnswerIndex === i;

              let style = "border";
              if (submitted) {
                if (isCorrect) style += " bg-green-100 border-green-400";
                else if (isSelected)
                  style += " bg-red-100 border-red-400";
              } else if (isSelected) {
                style += " bg-blue-100 border-blue-400";
              }

              return (
                <div
                  key={i}
                  onClick={() => selectAnswer(q.id, i)}
                  className={`p-2 rounded cursor-pointer ${style}`}
                >
                  {opt}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
            >
              Prev
            </Button>

            {current === questions.length - 1 ? (
              <Button onClick={submitExam} disabled={submitted}>
                Submit Exam
              </Button>
            ) : (
              <Button onClick={() => setCurrent((c) => c + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Result */}
      {submitted && (
        <div className="p-6 bg-white border rounded-lg">
          <h2 className="text-lg font-semibold">Result</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <p>
            Accuracy:{" "}
            {Math.round((score / questions.length) * 100)}%
          </p>
        </div>
      )}
    </div>
  );
}

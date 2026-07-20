"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const colorOptions = ["Black", "Light Blue", "Dark Blue", "Mustard"];

export default function OrderForm({ initialColor = "" }) {
  const [color, setColor] = useState(initialColor);
  const [waist, setWaist] = useState("");
  const [length, setLength] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetForm = () => {
    setColor("");
    setWaist("");
    setLength("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!color) {
      setMessage({ type: "error", text: "Please select a color." });
      return;
    }

    const waistNum = parseInt(waist, 10);
    const lengthNum = parseInt(length, 10);

    if (isNaN(waistNum) || waistNum < 24 || waistNum > 50) {
      setMessage({
        type: "error",
        text: "Waist must be a number between 24 and 50.",
      });
      return;
    }

    if (isNaN(lengthNum) || lengthNum < 28 || lengthNum > 40) {
      setMessage({
        type: "error",
        text: "Length must be a number between 28 and 40.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, waist: waistNum, length: lengthNum }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Something went wrong." });
      } else {
        setMessage(null);
        setSuccess(true);
        resetForm();
        setTimeout(() => setSuccess(false), 1500);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Color
        </label>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-left text-[15px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 flex items-center justify-between"
        >
          <span className={color ? "text-black" : "text-neutral-400"}>
            {color || "Select a color"}
          </span>
          <svg
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden animate-slide-up">
            {colorOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setColor(c);
                  setDropdownOpen(false);
                }}
                className={`w-full px-5 py-3.5 text-left text-[15px] font-medium transition-colors duration-150 ${
                  color === c
                    ? "bg-black text-white"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="modal-waist"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Waist (inches)
          </label>
          <input
            type="number"
            id="modal-waist"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="e.g. 32"
            min="24"
            max="50"
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black text-[15px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder:text-neutral-300"
          />
        </div>
        <div>
          <label
            htmlFor="modal-length"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Length (inches)
          </label>
          <input
            type="number"
            id="modal-length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g. 32"
            min="28"
            max="40"
            className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black text-[15px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder:text-neutral-300"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || success}
        className={`w-full py-4 min-h-[56px] rounded-full font-medium text-sm transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center ${
          success
            ? "bg-green-500 text-white scale-100"
            : "bg-black text-white hover:bg-neutral-800 disabled:opacity-50"
        }`}
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Placing Order...
          </span>
        ) : success ? (
          <span className="inline-flex items-center justify-center gap-3 text-base">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 26, height: 26 }}
            >
              <path
                className="stroke-white"
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: 24,
                  animation: "tickDraw 0.4s 0.1s ease-out forwards",
                }}
              />
            </svg>
            Order Confirmed!
          </span>
        ) : (
          "Place Order"
        )}
      </button>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium text-center transition-all duration-300 ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : ""
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}

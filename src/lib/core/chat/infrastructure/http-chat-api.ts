import { addMonths, addWeeks, isAfter, isBefore, isToday } from "date-fns";
import { Chat } from "../domain/chat";

export async function getChat(chatId?: string) {
  if (!chatId) return null;
  const response = await fetch(`/api/v1/chat/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.data as Chat;
}

export async function getChatHistory() {
  const response = await fetch("/api/v1/chat", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.data.length) {
    return {
      "1d": [],
      "7d": [],
      "30d": [],
    };
  }

  const base: { "1d": Chat[]; "7d": Chat[]; "30d": Chat[] } = {
    "1d": [],
    "7d": [],
    "30d": [],
  };

  for (const obj of data.data) {
    const currentDate = new Date(obj.createdAt);

    if (isToday(currentDate)) {
      base["1d"].push(obj);
    }

    if (!isToday(currentDate) && isBefore(currentDate, addWeeks(currentDate, 1))) {
      base["7d"].push(obj);
    }

    if (
      isAfter(currentDate, addWeeks(currentDate, 1)) &&
      isBefore(currentDate, addMonths(currentDate, 1))
    ) {
      base["30d"].push(obj);
    }
  }

  return base;
}

import { addNotification } from "@/utils/addNotification";
import { FieldErrors } from "react-hook-form";

export const useOnErrorWithNotifications = () => {
  const onError = (errors: FieldErrors) => {
    const messages = Object.values(errors)
      .map((err) => (typeof err?.message === "string" ? err.message : null))
      .filter(Boolean);

    const mess = (
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    );

    addNotification({
      message: mess,
      type: "error",
    });
  };

  return onError;
};

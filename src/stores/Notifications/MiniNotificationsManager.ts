import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

export class Notification {
  private static _count: number = 0;
  readonly id: number = Notification._count++;
  message: string | React.ReactNode;
  icon: React.ReactNode;
  type: "success" | "error" | "warning";

  constructor(
    message: string | React.ReactNode,
    type: "success" | "error" | "warning",
    icon: React.ReactNode,
  ) {
    this.message = message;
    this.icon = icon;
    this.type = type;
    Notification._count++;
  }
}

class MiniNotificationsManager {
  readonly timeout: number = 5000;
  notifications: Notification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(message: string | React.ReactNode, type: "success" | "error" | "warning", icon: React.ReactNode) {
    runInAction(() => this.notifications.unshift(new Notification(message, type, icon)));
  }

  delete(id: number) {
    runInAction(() => (this.notifications = this.notifications.filter((n) => n.id !== id)));
  }

  clear() {
    runInAction(() => (this.notifications = []));
  }
}

export const miniNotificationsManager = new MiniNotificationsManager();

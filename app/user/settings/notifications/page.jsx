"use client";

import { useState } from "react";

export default function SettingsNotifications() {
  const [on, setOn] = useState(false);
  return (
    <div className="settings-notifications">
      <div className="settings-notifications__inner">
        <div className="settings-notifications__inner__title">
          Push Notifications
        </div>

        <label htmlFor="">Pause all</label>

        <div className="settings-notifications__inner__group">
          Pause all notifications
          <div
            className={`settings-notifications__inner__group__switch ${
              on && "settings-notifications__inner__group__switch-active"
            }`}
            onClick={() => setOn(!on)}
          >
            <div className="settings-notifications__inner__group__switch__ball"></div>
          </div>
        </div>
        <label htmlFor="">Pause all</label>

        <div className="settings-notifications__inner__group">
          Pause all notifications
          <div
            className={`settings-notifications__inner__group__switch ${
              on && "settings-notifications__inner__group__switch-active"
            }`}
            onClick={() => setOn(!on)}
          >
            <div className="settings-notifications__inner__group__switch__ball"></div>
          </div>
        </div>
        <label htmlFor="">Pause all</label>

        <div className="settings-notifications__inner__group">
          Pause all notifications
          <div
            className={`settings-notifications__inner__group__switch ${
              on && "settings-notifications__inner__group__switch-active"
            }`}
            onClick={() => setOn(!on)}
          >
            <div className="settings-notifications__inner__group__switch__ball"></div>
          </div>
        </div>
        <label htmlFor="">Pause all</label>

        <div className="settings-notifications__inner__group">
          Pause all notifications
          <div
            className={`settings-notifications__inner__group__switch ${
              on && "settings-notifications__inner__group__switch-active"
            }`}
            onClick={() => setOn(!on)}
          >
            <div className="settings-notifications__inner__group__switch__ball"></div>
          </div>
        </div>
        <label htmlFor="">Pause all</label>

        <div className="settings-notifications__inner__group">
          Pause all notifications
          <div
            className={`settings-notifications__inner__group__switch ${
              on && "settings-notifications__inner__group__switch-active"
            }`}
            onClick={() => setOn(!on)}
          >
            <div className="settings-notifications__inner__group__switch__ball"></div>
          </div>
        </div>
      </div>
      <div className="settings-contact__button-group">
        <button onClick={() => setStage(1)}>Cancel</button>
        <button onClick={() => setStage(1)}>Save changes</button>
      </div>
    </div>
  );
}

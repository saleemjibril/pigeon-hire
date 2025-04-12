import SettingsNavigation from "@/app/components/settingsNavigation";
import Image from "next/image";

export default function SettingsLayout({ children }) {
  
  return (
    <div className="settings">
      <SettingsNavigation />

      <div className="settings__inner">
        {children}
      </div>
    </div>
  );
}

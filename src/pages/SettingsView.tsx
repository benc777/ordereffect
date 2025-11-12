import { useLibraryStore } from "../hooks/useLibraryStore";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

export function SettingsView() {
  const { darkMode, setDarkMode } = useLibraryStore((state) => ({
    darkMode: state.darkMode,
    setDarkMode: state.setDarkMode
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500">Preferences</h2>
      <Card className="p-6">
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-100">Dark mode</p>
            <p className="text-xs text-slate-500">Switch between light and dark surfaces</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </CardContent>
      </Card>
    </div>
  );
}

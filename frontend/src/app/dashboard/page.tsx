import DashboardButton from "@/components/Dashboard/Button";
import WeatherWidget from "@/components/Dashboard/Wetter";

export default function Dashboard() {
    return (
        <main>
            <header>

            </header>
            <main>
                <WeatherWidget deviceId="dev-pc" />
                <DashboardButton />
            </main>
            <footer>

            </footer>
        </main>
    );
}

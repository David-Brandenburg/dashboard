'use client';
import { useEffect, useState } from 'react';
import type { DashboardConfig, WeatherData } from '@/lib/types';

interface WeatherWidgetProps {
    deviceId: string;
}

export default function WeatherWidget({ deviceId }: WeatherWidgetProps) {
    const [dashboard, setDashboard] = useState<DashboardConfig | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const BACKEND = 'http://localhost:5000';

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND}/api/dashboard/${deviceId}`)
            .then(res => {
                if (!res.ok) throw new Error(`Config nicht gefunden (${res.status})`);
                return res.json() as Promise<DashboardConfig>;
            })
            .then(cfg => {
                setDashboard(cfg);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [deviceId]);

    useEffect(() => {
        if (!dashboard) return;
        setLoading(true);

        const { city, units } = dashboard.weatherConfig;
        fetch(`${BACKEND}/api/weather?city=${encodeURIComponent(city)}&units=${units}`)
            .then(res => {
                if (!res.ok) throw new Error(`Wetter nicht gefunden (${res.status})`);
                return res.json() as Promise<WeatherData>;
            })
            .then(data => {
                setWeather(data);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [dashboard]);

    if (loading) return <div>…Lädt …</div>;
    if (error) return <div className="text-red-500">⚠️ {error}</div>;
    if (!dashboard || !weather) return <div>Keine Daten</div>;

    const { city, units } = dashboard.weatherConfig;
    return (
        <div className="weather-widget p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Wetter in {city}</h2>
            <div className="flex items-center">
                <img src={weather.icon} alt={weather.description} className="w-16 h-16 mr-4" />
                <div>
                    <p className="text-3xl font-bold">
                        {weather.temp}°{units === 'metric' ? 'C' : 'F'}
                    </p>
                    <p className="capitalize">{weather.description}</p>
                </div>
            </div>
        </div>
    );
}

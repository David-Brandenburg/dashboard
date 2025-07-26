import WindowsAuth from '@/components/Admin/WindowsAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <WindowsAuth>{children}</WindowsAuth>;
}

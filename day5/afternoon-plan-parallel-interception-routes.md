# Kế Hoạch Buổi Chiều - Day 5: Parallel Routes & Interception Routes

## 📋 Tổng Quan
Buổi chiều tập trung vào hai tính năng nâng cao của Next.js App Router:
- **Parallel Routes**: Hiển thị nhiều trang/UI độc lập trong cùng một layout
- **Interception Routes**: "Chặn" URL để hiển thị modal/lightbox mà không làm mới trang

---

## 🎯 Phần 1: Parallel Routes (Tuyến Song Song) - 90 phút

### 📚 1.1 Lý Thuyết Cơ Bản (30 phút)

#### Parallel Routes là gì?
- **Định nghĩa**: Cho phép render nhiều trang hoặc vùng UI độc lập trong cùng một layout
- **Cú pháp**: Sử dụng **slots** với folder bắt đầu bằng `@` (ví dụ: `@analytics`, `@team`)
- **Use cases phổ biến**:
  - Dashboard với nhiều panels độc lập
  - Split views (e.g., email client với inbox & preview)
  - Conditional rendering dựa trên user role
  - Multi-modal interfaces

#### Cấu Trúc Thư Mục
```
app/
├── layout.tsx                    # Parent layout nhận các slots
├── page.tsx                      # Default page
├── @analytics/                   # Slot 1
│   ├── page.tsx
│   └── loading.tsx
├── @team/                        # Slot 2
│   ├── page.tsx
│   └── error.tsx
└── @notifications/               # Slot 3
    └── page.tsx
```

#### Cách Hoạt Động
```typescript
// app/layout.tsx (Root Layout với Parallel Routes support)
import ThemeProvider from './theme-provider'
import { Logo } from '@/app/logo'
import Search from '@/app/ui/search'

export default function Layout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode
  analytics?: React.ReactNode
  team?: React.ReactNode
  notifications?: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-full flex flex-col">
        <ThemeProvider>
          {/* Navigation Bar */}
          <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <Logo />
                </div>
                <div className="hidden sm:block w-full max-w-md mx-8">
                  <Search />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
            
            {/* Parallel Routes Grid - Chỉ hiển thị khi có slots */}
            {(analytics || team || notifications) && (
              <div className="dashboard-grid max-w-7xl mx-auto px-4 py-8">
                {analytics && <aside>{analytics}</aside>}
                {team && <main>{team}</main>}
                {notifications && <aside>{notifications}</aside>}
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-slate-900 border-t py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
              © 2024 Your App
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Lưu ý**: 
- Các slots (`analytics`, `team`, `notifications`) là **optional** (`?`) vì chúng chỉ xuất hiện ở một số routes cụ thể
- Layout này tương thích với cấu trúc dự án hiện tại (có navigation, theme provider, footer)
- Khi không có slots nào được truyền vào, layout hoạt động như bình thường với chỉ `{children}`

#### Tính Năng Quan Trọng

**1. Independent Navigation**
- Mỗi slot có thể điều hướng độc lập
- Slot duy trì state riêng khi navigate

**2. Default Fallback với `default.tsx`**
```typescript
// app/@analytics/default.tsx
export default function Default() {
  return <div>Default Analytics View</div>
}
```
- Được render khi slot không match route hiện tại
- Ngăn chặn lỗi 404 khi navigate

**3. Conditional Rendering**
```typescript
// Layout có thể render slot dựa trên điều kiện
export default function Layout({ analytics, team }) {
  const user = useUser()
  return (
    <div>
      {user.isAdmin && analytics}
      {team}
    </div>
  )
}
```

#### Nghiên Cứu Tài Liệu
- [ ] Đọc: [Next.js Parallel Routes Docs](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [ ] Xem video: Tìm tutorial về Parallel Routes trên YouTube
- [ ] Note lại các use cases phù hợp với dự án thực tế

---

### 💻 1.2 Thực Hành - Dashboard với Parallel Routes (60 phút)

#### Bài Tập: Xây Dựng Analytics Dashboard

**Mục tiêu**: Tạo một dashboard với 3 slots song song:
1. `@analytics` - Hiển thị biểu đồ analytics
2. `@team` - Danh sách team members
3. `@activity` - Recent activity feed

**Bước 1: Tạo Cấu Trúc Thư Mục (5 phút)**
```bash
cd d:/Senlyzer/Intern_Senlyzer/day5/my-first-app
mkdir -p app/dashboard/@analytics app/dashboard/@team app/dashboard/@activity
```

**Bước 2: Tạo Layout với Slots (10 phút)**
```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
  activity,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
  activity: React.ReactNode
}) {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      {children}
      
      <div className="dashboard-grid">
        {/* Left column - Analytics */}
        <div className="analytics-section">
          {analytics}
        </div>
        
        {/* Middle column - Team */}
        <div className="team-section">
          {team}
        </div>
        
        {/* Right column - Activity */}
        <div className="activity-section">
          {activity}
        </div>
      </div>
    </div>
  )
}
```

**Bước 3: Tạo Pages cho Mỗi Slot (20 phút)**

```typescript
// app/dashboard/@analytics/page.tsx
export default function AnalyticsSlot() {
  return (
    <div className="card">
      <h2>📊 Analytics</h2>
      <div className="stats-grid">
        <div className="stat">
          <span className="value">12,345</span>
          <span className="label">Total Users</span>
        </div>
        <div className="stat">
          <span className="value">89%</span>
          <span className="label">Conversion Rate</span>
        </div>
        <div className="stat">
          <span className="value">$45,678</span>
          <span className="label">Revenue</span>
        </div>
      </div>
      <a href="/dashboard/analytics/detailed">View Details →</a>
    </div>
  )
}

// app/dashboard/@team/page.tsx
const teamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Frontend Dev', status: 'online' },
  { id: 2, name: 'Bob Smith', role: 'Backend Dev', status: 'away' },
  { id: 3, name: 'Carol White', role: 'Designer', status: 'offline' },
]

export default function TeamSlot() {
  return (
    <div className="card">
      <h2>👥 Team Members</h2>
      <ul className="team-list">
        {teamMembers.map(member => (
          <li key={member.id} className="team-member">
            <span className={`status ${member.status}`}></span>
            <div>
              <strong>{member.name}</strong>
              <p>{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <a href="/dashboard/team/all">View All Team →</a>
    </div>
  )
}

// app/dashboard/@activity/page.tsx
const activities = [
  { id: 1, user: 'Alice', action: 'deployed v2.3.4', time: '5 min ago' },
  { id: 2, user: 'Bob', action: 'merged PR #234', time: '15 min ago' },
  { id: 3, user: 'Carol', action: 'updated design', time: '1 hour ago' },
]

export default function ActivitySlot() {
  return (
    <div className="card">
      <h2>🔔 Recent Activity</h2>
      <ul className="activity-feed">
        {activities.map(activity => (
          <li key={activity.id} className="activity-item">
            <strong>{activity.user}</strong> {activity.action}
            <span className="time">{activity.time}</span>
          </li>
        ))}
      </ul>
      <a href="/dashboard/activity/all">View All Activity →</a>
    </div>
  )
}
```

**Bước 4: Tạo Default Fallbacks (10 phút)**
```typescript
// app/dashboard/@analytics/default.tsx
export default function AnalyticsDefault() {
  return <div className="card">Loading analytics...</div>
}

// app/dashboard/@team/default.tsx
export default function TeamDefault() {
  return <div className="card">Loading team info...</div>
}

// app/dashboard/@activity/default.tsx
export default function ActivityDefault() {
  return <div className="card">Loading activity feed...</div>
}
```

**Bước 5: Test Navigation Independence (15 phút)**

Tạo sub-routes để test:
```typescript
// app/dashboard/@analytics/detailed/page.tsx
export default function DetailedAnalytics() {
  return (
    <div className="card">
      <h2>📈 Detailed Analytics</h2>
      <p>This is a detailed analytics view</p>
      <a href="/dashboard">← Back to Dashboard</a>
    </div>
  )
}

// app/dashboard/@team/all/page.tsx
export default function AllTeamMembers() {
  return (
    <div className="card">
      <h2>All Team Members</h2>
      <p>Complete team directory</p>
      <a href="/dashboard">← Back to Dashboard</a>
    </div>
  )
}
```

**Test Cases**:
- [ ] Navigate to `/dashboard` - tất cả 3 slots hiển thị
- [ ] Click "View Details" trong Analytics - chỉ analytics slot thay đổi
- [ ] Click "View All Team" - chỉ team slot thay đổi
- [ ] Kiểm tra các slot khác có giữ nguyên state không
- [ ] Test default fallbacks khi navigate đến route không match

**Bước 6: CSS Styling (Bonus - nếu còn thời gian)**
```css
/* app/dashboard/dashboard.css */
.dashboard-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stats-grid {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat .value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #0070f3;
}

.team-list, .activity-feed {
  list-style: none;
  padding: 0;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status.online { background: #00d26a; }
.status.away { background: #ffb800; }
.status.offline { background: #ccc; }
```

---

## 🎯 Phần 2: Interception Routes (Tuyến Chặn) - 90 phút

### 📚 2.1 Lý Thuyết Cơ Bản (30 phút)

#### Interception Routes là gì?
- **Định nghĩa**: Cho phép "chặn" một route để hiển thị nội dung trong context hiện tại (modal/overlay) thay vì navigate đến page mới
- **Lợi ích UX**: 
  - Giữ nguyên context khi mở modal
  - Khi đóng modal (ESC/click outside), user quay lại trang cũ
  - Khi refresh/share URL, hiển thị full page thay vì modal
- **Use cases**: Photo galleries, product quick view, login/signup modals, confirmations

#### Cú Pháp Interception

Next.js sử dụng quy ước đặt tên đặc biệt:

| Convention | Mô tả | Ví dụ |
|------------|-------|-------|
| `(.)` | Chặn route cùng cấp | `(..)photo` chặn `/photo` |
| `(..)` | Chặn route lên 1 cấp | `(..)photo` chặn `/photos/photo` |
| `(..)(..)` | Chặn route lên 2 cấp | `(..)(..)photo` |
| `(...)` | Chặn từ app root | `(...)photo` chặn từ root |

#### Cấu Trúc Thư Mục Ví Dụ
```
app/
├── page.tsx                      # Home page
├── @modal/                       # Parallel route cho modal
│   ├── (.)photo/                 # Intercept /photo
│   │   └── [id]/
│   │       └── page.tsx          # Modal view
│   └── default.tsx
├── photo/                        # Actual route
│   └── [id]/
│       └── page.tsx              # Full page view
└── layout.tsx                    # Layout với modal slot
```

#### Cách Hoạt Động

**1. Layout Setup**
```typescript
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
```

**2. Intercepted Route (Modal)**
```typescript
// app/@modal/(.)photo/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={`/photos/${params.id}.jpg`} alt="Photo" />
        {/* Đóng modal = navigate back */}
      </div>
    </div>
  )
}
```

**3. Full Page Route**
```typescript
// app/photo/[id]/page.tsx
export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="full-page">
      <img src={`/photos/${params.id}.jpg`} alt="Photo" />
      {/* Full page với header, footer, etc. */}
    </div>
  )
}
```

**4. Default Fallback**
```typescript
// app/@modal/default.tsx
export default function Default() {
  return null // Không hiển thị gì khi không có modal
}
```

#### Khi Nào Dùng Interception vs Parallel Routes?

- **Interception Routes**: Khi muốn hiển thị same content theo 2 cách (modal vs full page)
- **Parallel Routes**: Khi muốn hiển thị nhiều nội dung độc lập cùng lúc

#### Nghiên Cứu Tài Liệu
- [ ] Đọc: [Next.js Intercepting Routes Docs](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- [ ] Xem ví dụ: [Next.js Examples - Modal](https://github.com/vercel/next.js/tree/canary/examples/route-modal)
- [ ] Hiểu về soft vs hard navigation

---

### 💻 2.2 Thực Hành - Photo Gallery với Modal (60 phút)

#### Bài Tập: Xây Dựng Photo Gallery với Interception

**Mục tiêu**: 
- Grid của photos trên trang chủ
- Click photo → mở modal overlay với photo detail
- Refresh page hoặc direct link → hiển thị full page
- Close modal → quay lại gallery

**Bước 1: Tạo Cấu Trúc Thư Mục (5 phút)**
```bash
cd d:/Senlyzer/Intern_Senlyzer/day5/my-first-app
mkdir -p app/gallery
mkdir -p app/gallery/@modal
mkdir -p "app/gallery/@modal/(.)photo/[id]"
mkdir -p app/gallery/photo/[id]
```

**Bước 2: Tạo Mock Data (5 phút)**
```typescript
// app/gallery/data.ts
export interface Photo {
  id: string
  title: string
  imageUrl: string
  description: string
  author: string
}

export const photos: Photo[] = [
  {
    id: '1',
    title: 'Mountain Sunrise',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Beautiful sunrise over the mountains',
    author: 'John Doe'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    description: 'Powerful ocean waves crashing',
    author: 'Jane Smith'
  },
  {
    id: '3',
    title: 'Forest Path',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    description: 'Peaceful path through the forest',
    author: 'Bob Johnson'
  },
  {
    id: '4',
    title: 'City Lights',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    description: 'Nighttime city skyline',
    author: 'Alice Williams'
  },
  {
    id: '5',
    title: 'Desert Dunes',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    description: 'Golden sand dunes at sunset',
    author: 'Charlie Brown'
  },
  {
    id: '6',
    title: 'Northern Lights',
    imageUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    description: 'Aurora borealis dancing in the sky',
    author: 'Diana Prince'
  }
]

export function getPhotoById(id: string): Photo | undefined {
  return photos.find(photo => photo.id === id)
}
```

**Bước 3: Layout với Modal Slot (10 phút)**
```typescript
// app/gallery/layout.tsx
export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
```

**Bước 4: Gallery Page (10 phút)**
```typescript
// app/gallery/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { photos } from './data'

export default function GalleryPage() {
  return (
    <div className="gallery-container">
      <h1>📸 Photo Gallery</h1>
      <p>Click any photo to view details</p>
      
      <div className="photo-grid">
        {photos.map((photo) => (
          <Link 
            key={photo.id} 
            href={`/gallery/photo/${photo.id}`}
            className="photo-card"
          >
            <div className="photo-image">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                width={400}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="photo-info">
              <h3>{photo.title}</h3>
              <p className="author">by {photo.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

**Bước 5: Modal View (Intercepted Route) (15 phút)**
```typescript
// app/gallery/@modal/(.)photo/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getPhotoById } from '@/app/gallery/data'
import { useEffect } from 'react'

export default function PhotoModal({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter()
  const photo = getPhotoById(params.id)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [router])

  if (!photo) {
    return <div>Photo not found</div>
  }

  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-button"
          onClick={() => router.back()}
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div className="modal-image">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            width={800}
            height={600}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        
        <div className="modal-details">
          <h2>{photo.title}</h2>
          <p className="description">{photo.description}</p>
          <p className="author">📷 Photo by {photo.author}</p>
        </div>
      </div>
    </div>
  )
}
```

**Bước 6: Full Page View (10 phút)**
```typescript
// app/gallery/photo/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getPhotoById } from '@/app/gallery/data'
import { notFound } from 'next/navigation'

export default function PhotoPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const photo = getPhotoById(params.id)

  if (!photo) {
    notFound()
  }

  return (
    <div className="photo-page">
      <header className="photo-header">
        <Link href="/gallery" className="back-link">
          ← Back to Gallery
        </Link>
        <h1>Photo Details</h1>
      </header>

      <div className="photo-content">
        <div className="photo-main">
          <Image
            src={photo.imageUrl}
            alt={photo.title}
            width={1200}
            height={800}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <aside className="photo-sidebar">
          <h2>{photo.title}</h2>
          <p className="description">{photo.description}</p>
          
          <div className="photo-meta">
            <p><strong>Author:</strong> {photo.author}</p>
            <p><strong>Photo ID:</strong> {params.id}</p>
          </div>

          <div className="photo-actions">
            <button className="btn-primary">Download</button>
            <button className="btn-secondary">Share</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
```

**Bước 7: Default Fallback (5 phút)**
```typescript
// app/gallery/@modal/default.tsx
export default function Default() {
  return null
}
```

**Bước 8: CSS Styling (10 phút)**
```css
/* app/gallery/gallery.css */
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.photo-card {
  display: block;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.photo-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.photo-info {
  padding: 1rem;
}

.photo-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.author {
  color: #666;
  font-size: 0.875rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 900px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.modal-image {
  width: 100%;
  background: #000;
}

.modal-details {
  padding: 1.5rem;
}

.modal-details h2 {
  margin: 0 0 0.5rem 0;
}

.description {
  color: #666;
  margin: 0.5rem 0;
}

/* Full Page Styles */
.photo-page {
  min-height: 100vh;
}

.photo-header {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-link {
  color: #0070f3;
  text-decoration: none;
  font-weight: 500;
}

.photo-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.photo-main {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-sidebar {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.photo-meta {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.photo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary {
  background: #0070f3;
  color: white;
}

.btn-secondary {
  background: #eee;
  color: #333;
}

.btn-primary:hover,
.btn-secondary:hover {
  opacity: 0.8;
}
```

**Test Cases**:
- [ ] Navigate to `/gallery` - hiển thị grid của photos
- [ ] Click vào một photo - mở modal overlay
- [ ] Press ESC trong modal - modal đóng, quay lại gallery
- [ ] Click outside modal - modal đóng
- [ ] Copy URL khi modal mở và paste vào tab mới - hiển thị full page
- [ ] Refresh khi modal mở - chuyển sang full page view
- [ ] Test trên mobile - responsive design

---

## 🎯 Phần 3: Kết Hợp Parallel & Interception Routes (Nâng Cao - Bonus)

### 💡 Ý Tưởng Project Nâng Cao (30 phút nếu còn thời gian)

#### Bài Tập: E-commerce Product Page với Modal Cart

**Concept**: 
- Product listing page
- Click "Add to Cart" → modal giỏ hàng (Interception)
- Modal có 3 sections song song (Parallel):
  - Cart items
  - Recommended products
  - Shipping calculator

**Cấu trúc**:
```
app/shop/
├── layout.tsx
├── page.tsx                      # Product listing
├── @cartModal/
│   ├── (.)cart/
│   │   ├── layout.tsx            # Layout với 3 parallel slots
│   │   ├── @items/page.tsx
│   │   ├── @recommended/page.tsx
│   │   └── @shipping/page.tsx
│   └── default.tsx
└── cart/
    └── page.tsx                  # Full cart page
```

---

## 📝 Checklist Tổng Hợp

### Parallel Routes
- [ ] Hiểu khái niệm slots và cú pháp `@folder`
- [ ] Tạo được layout nhận multiple slots
- [ ] Implement default fallbacks
- [ ] Test independent navigation
- [ ] Hiểu use cases thực tế

### Interception Routes
- [ ] Hiểu khái niệm "chặn" routes
- [ ] Nắm vững các convention: `(.)`, `(..)`, `(...)`
- [ ] Tạo được modal intercepting route
- [ ] Implement full page fallback
- [ ] Handle modal close (ESC, click outside, router.back)
- [ ] Test soft vs hard navigation

### Practice
- [ ] Dashboard với 3 parallel slots hoàn chỉnh
- [ ] Photo gallery với modal interception
- [ ] CSS styling đẹp và responsive
- [ ] Test tất cả edge cases
- [ ] (Bonus) Kết hợp cả hai patterns

---

## 📚 Tài Liệu Tham Khảo

### Official Docs
1. [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
2. [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
3. [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Examples
1. [Next.js Route Modal Example](https://github.com/vercel/next.js/tree/canary/examples/route-modal)
2. [Parallel Routes Example](https://github.com/vercel/next.js/tree/canary/examples/parallel-routes)

### Video Tutorials
- Tìm trên YouTube: "Next.js 14 Parallel Routes"
- Tìm trên YouTube: "Next.js Intercepting Routes Modal"

---

## 🎓 Bài Tập Về Nhà (Tự Thực Hành)

1. **Blog System với Comments Modal**
   - List of blog posts
   - Click "Comments" → modal với comments (Interception)
   - Full page view khi share link

2. **Multi-Dashboard Analytics**
   - 4 parallel slots: Sales, Traffic, Users, Revenue
   - Mỗi slot có sub-navigation riêng
   - Test state persistence

3. **Image Editor Interface**
   - Canvas (main area)
   - Parallel slots: Tools, Layers, Properties
   - Modal cho previews khi export

---

## ⏰ Timeline Đề Xuất

| Thời gian | Nội dung |
|-----------|----------|
| 14:00 - 14:30 | Đọc lý thuyết Parallel Routes |
| 14:30 - 15:30 | Thực hành Dashboard |
| 15:30 - 15:45 | Break ☕ |
| 15:45 - 16:15 | Đọc lý thuyết Interception Routes |
| 16:15 - 17:15 | Thực hành Photo Gallery |
| 17:15 - 17:30 | Review & cleanup code |
| 17:30+ | (Optional) Bonus exercise |

---

## ✅ Mục Tiêu Hoàn Thành

Sau buổi chiều này, bạn sẽ:
- ✅ Hiểu sâu về Parallel Routes và cases áp dụng
- ✅ Master Interception Routes cho modal patterns
- ✅ Có 2 working projects demo hai patterns
- ✅ Biết kết hợp cả hai để tạo UX cao cấp
- ✅ Tự tin áp dụng vào projects thực tế

**Good luck và chúc bạn học tập hiệu quả! 🚀**

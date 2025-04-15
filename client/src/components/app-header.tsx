import React from 'react'

export function AppHeader() {
  return (
    <header className="fixed top-0 right-0 z-50 h-14 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* Add your header content here */}
        <h1 className="text-lg font-semibold">Financial News Tracker</h1>
      </div>
    </header>
  )
}
'use client'

export function Carousel() {
  return (
    <div className="border p-4">
      <p>Thử '<></>' Carousel</p>
      <div className="flex gap-2">
        <div className="w-20 h-20 bg-gray-200">Slide 1</div>
        <div className="w-20 h-20 bg-gray-200">Slide 2</div>
        <div className="w-20 h-20 bg-gray-200">Slide 3</div>
      </div>
    </div>
  )
}
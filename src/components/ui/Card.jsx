/**
 * Card Component
 * A container with shadow and padding for content
 */
export function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

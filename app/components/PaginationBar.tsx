import Link from "next/link";
import { useParams } from "next/navigation";

interface PaginationBarProps {
  currentId: number | string;
  totalPages?: number;
  basePath: string;
  idToSlugMap?: { [key: number]: string };
}

export default function PaginationBar({ currentId, totalPages = 12, basePath, idToSlugMap }: PaginationBarProps) {
  const numericId = typeof currentId === 'string' ? parseInt(currentId) || 1 : currentId;
  
  // Helper function to get the correct path (slug or numeric)
  const getPath = (pageNum: number) => {
    if (idToSlugMap && idToSlugMap[pageNum]) {
      return `${basePath}/${idToSlugMap[pageNum]}`;
    }
    return `${basePath}/${pageNum}`;
  };

  // Generate visible page numbers based on screen size
  const getVisiblePages = () => {
    const maxVisiblePages = 5; // Show max 5 pages on mobile
    const maxVisiblePagesDesktop = 8; // Show max 8 pages on desktop
    
    // For mobile (will be handled by CSS)
    let visiblePages = [];
    let startPage = Math.max(1, numericId - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full flex justify-center items-center py-6 bg-gray-900">
      <nav className="flex items-center gap-1 sm:gap-2">
        {/* Previous Button */}
        <Link
          href={getPath(numericId > 1 ? numericId - 1 : 1)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-purple-600 transition-colors disabled:opacity-50"
          aria-label="Previous Page"
        >
          <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        {/* First page if not visible */}
        {visiblePages[0] > 1 && (
          <>
            <Link
              href={getPath(1)}
              className="hidden sm:block px-3 py-1 rounded-full text-sm font-semibold transition-colors bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white"
            >
              1
            </Link>
            {visiblePages[0] > 2 && (
              <span className="hidden sm:block px-2 py-1 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((pageNum) => (
          <Link
            key={pageNum}
            href={getPath(pageNum)}
            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              pageNum === numericId 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white'
            }`}
          >
            {pageNum}
          </Link>
        ))}

        {/* Last page if not visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="hidden sm:block px-2 py-1 text-gray-500">...</span>
            )}
            <Link
              href={getPath(totalPages)}
              className="hidden sm:block px-3 py-1 rounded-full text-sm font-semibold transition-colors bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white"
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next Button */}
        <Link
          href={getPath(numericId < totalPages ? numericId + 1 : totalPages)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-purple-600 transition-colors disabled:opacity-50"
          aria-label="Next Page"
        >
          <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}

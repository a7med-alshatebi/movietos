import Link from "next/link";
import { useParams } from "next/navigation";

interface PaginationBarProps {
  currentId: number | string;
  totalPages?: number;
  basePath: string;
}

export default function PaginationBar({ currentId, totalPages = 6, basePath }: PaginationBarProps) {
  const id = Number(currentId);

  return (
    <div className="w-full flex justify-center items-center py-6 bg-gray-900">
      <nav className="flex items-center gap-2">
        <Link
          href={`${basePath}/${id > 1 ? id - 1 : 1}`}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-purple-600 transition-colors"
          aria-label="Previous Page"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </Link>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <Link
              key={pageNum}
              href={`${basePath}/${pageNum}`}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${pageNum === id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white'}`}
            >
              {pageNum}
            </Link>
          );
        })}
        <Link
          href={`${basePath}/${id < totalPages ? id + 1 : totalPages}`}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-purple-600 transition-colors"
          aria-label="Next Page"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        </Link>
      </nav>
    </div>
  );
}

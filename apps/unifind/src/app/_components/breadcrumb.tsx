import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Нүүр хуудас
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Их сургуулиуд</span>
        </div>
      </div>
    </div>
  );
}
